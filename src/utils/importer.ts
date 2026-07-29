import JSZip from 'jszip';
import { Question, ValidationReport } from '../types';

/**
 * Helper to parse CSV lines handling quoted values with commas
 */
function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = '';
  let insideQuote = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        currentVal += '"';
        i++; // skip escaped quote
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentVal.trim());
      if (currentRow.some((field) => field.length > 0)) {
        lines.push(currentRow);
      }
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }

  if (currentVal || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.some((field) => field.length > 0)) {
      lines.push(currentRow);
    }
  }

  return lines;
}

/**
 * Validate and format raw question objects according to strict schema rules
 */
export function validateAndFormatQuestions(
  rawQuestions: any[],
  imagesMap?: Map<string, string>, // relative image path -> data URL
  extraDocErrors: { row: number; field: string; message: string }[] = []
): ValidationReport {
  const errors: { row: number; field: string; message: string }[] = [...extraDocErrors];
  const warnings: string[] = [];
  const extractedQuestions: Question[] = [];
  const seenIds = new Set<string>();

  const ALLOWED_QUESTION_KEYS = new Set([
    'id',
    'category',
    'questionText',
    'statements',
    'optionA',
    'optionB',
    'optionC',
    'optionD',
    'correctAnswer',
    'explanation',
    'sourceReference',
    'imageFile'
  ]);

  const REQUIRED_QUESTION_KEYS = [
    'id',
    'category',
    'questionText',
    'statements',
    'optionA',
    'optionB',
    'optionC',
    'optionD',
    'correctAnswer',
    'explanation',
    'sourceReference',
    'imageFile'
  ];

  rawQuestions.forEach((raw, idx) => {
    const rowNum = idx + 1;

    if (typeof raw !== 'object' || raw === null) {
      errors.push({ row: rowNum, field: 'row', message: '数据行格式无效 (Invalid object format)' });
      return;
    }

    // Check for extra/unexpected parameters in question object
    Object.keys(raw).forEach((key) => {
      if (!ALLOWED_QUESTION_KEYS.has(key)) {
        errors.push({
          row: rowNum,
          field: key,
          message: `含有未知的多余参数 "${key}" (Contains unexpected extra parameter "${key}")`,
        });
      }
    });

    // Check for missing required parameters
    REQUIRED_QUESTION_KEYS.forEach((key) => {
      if (raw[key] === undefined) {
        errors.push({
          row: rowNum,
          field: key,
          message: `缺少必要参数 "${key}" (Missing parameter "${key}")`,
        });
      }
    });

    if (errors.length > extraDocErrors.length) {
      return;
    }

    // Normalize field names
    const id = (raw.id || '').toString().trim();
    const category = (raw.category || '').toString().trim();
    const questionText = (raw.questionText || '').toString().trim();
    const sourceReference = (raw.sourceReference || '').toString().trim();
    const explanation = (raw.explanation || '').toString().trim();
    let image = (raw.imageFile || '').toString().trim();

    // Parse options
    const options: [string, string, string, string] = [
      (raw.optionA || '').toString(),
      (raw.optionB || '').toString(),
      (raw.optionC || '').toString(),
      (raw.optionD || '').toString(),
    ];

    // Parse correct answer
    let correctIndex = -1;
    const rawCorrect = (raw.correctAnswer || '').toString().trim().toUpperCase();

    if (rawCorrect === 'A' || rawCorrect === '0') correctIndex = 0;
    else if (rawCorrect === 'B' || rawCorrect === '1') correctIndex = 1;
    else if (rawCorrect === 'C' || rawCorrect === '2') correctIndex = 2;
    else if (rawCorrect === 'D' || rawCorrect === '3') correctIndex = 3;

    // Parse statements
    let statements: Record<string, string> | undefined = undefined;
    if (raw.statements !== undefined) {
      if (typeof raw.statements === 'object' && raw.statements !== null) {
        statements = raw.statements;
      } else if (typeof raw.statements === 'string') {
        const trimmed = raw.statements.trim();
        if (trimmed) {
          try {
            statements = JSON.parse(trimmed);
          } catch (e) {
            statements = {};
          }
        } else {
          statements = {};
        }
      }
    }

    // Check VR-1: Required fields non-empty / length checks
    if (questionText.length > 2000) {
      errors.push({ row: rowNum, field: 'questionText', message: '题目内容超出2000字符限制 (Question text exceeds 2000 chars)' });
    }

    // Check VR-2: Exactly 4 options and 1 correct answer
    if (options.some((opt) => opt.trim().length === 0)) {
      errors.push({ row: rowNum, field: 'options', message: '题目包含空的选项 (Options must not be empty)' });
    } else if (options.some((opt) => opt.length > 500)) {
      errors.push({ row: rowNum, field: 'options', message: '选项内容超出500字符限制 (Option exceeds 500 chars)' });
    }

    if (correctIndex < 0 || correctIndex > 3) {
      errors.push({ row: rowNum, field: 'correctAnswer', message: '正确答案格式错误，需为 A, B, C, D (Invalid correctAnswer)' });
    }

    // Check VR-3: Duplicate ID check
    if (id && seenIds.has(id)) {
      warnings.push(`Row ${rowNum}: Duplicate question ID "${id}" detected. Auto-assigning unique ID.`);
    }
    const finalId = id ? (seenIds.has(id) ? `${id}_${Date.now()}_${idx}` : id) : `q_${Date.now()}_${idx}`;
    if (finalId) seenIds.add(finalId);

    // VR-4: Process image attachment from imagesMap or direct URL/dataURL
    if (image) {
      if (imagesMap && imagesMap.has(image)) {
        image = imagesMap.get(image)!;
      } else if (imagesMap && imagesMap.has(`images/${image}`)) {
        image = imagesMap.get(`images/${image}`)!;
      } else if (!image.startsWith('data:') && !image.startsWith('http')) {
        warnings.push(`Row ${rowNum}: Referenced image file "${image}" was not found in package. Question imported without image.`);
        image = '';
      }
    }

    if (correctIndex >= 0 && questionText && errors.length === extraDocErrors.length) {
      extractedQuestions.push({
        id: finalId,
        category,
        questionText,
        options,
        correctIndex,
        explanation,
        image: image || undefined,
        statements,
        sourceReference,
      });
    }
  });

  const validRows = errors.length === 0 ? extractedQuestions.length : 0;
  const invalidRows = rawQuestions.length - validRows;

  return {
    isValid: errors.length === 0 && invalidRows === 0 && validRows > 0,
    totalRows: rawQuestions.length,
    validRows,
    invalidRows,
    errors,
    warnings,
    extractedQuestions: errors.length === 0 ? extractedQuestions : [],
    collectionName: 'Imported Question Collection',
  };
}

/**
 * Parse JSON File content
 */
export async function parseJSONImport(fileText: string): Promise<ValidationReport> {
  let parsed: any;
  try {
    parsed = JSON.parse(fileText);
  } catch (e) {
    return {
      isValid: false,
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      errors: [{ row: 0, field: 'file', message: 'JSON 语法格式错误 (Invalid JSON syntax)' }],
      warnings: [],
      extractedQuestions: [],
      collectionName: '',
    };
  }

  const ALLOWED_TOP_LEVEL_KEYS = new Set([
    'collectionName',
    'version',
    'description',
    'group',
    'difficulty',
    'tags',
    'questions'
  ]);

  const REQUIRED_TOP_LEVEL_KEYS = [
    'collectionName',
    'version',
    'description',
    'group',
    'difficulty',
    'tags',
    'questions'
  ];

  const docErrors: { row: number; field: string; message: string }[] = [];

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return {
      isValid: false,
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      errors: [{ row: 0, field: 'file', message: 'JSON 必须为包含顶层元数据参数的对象格式 (JSON must be an object containing top-level metadata)' }],
      warnings: [],
      extractedQuestions: [],
      collectionName: '',
    };
  }

  // Check for unexpected extra parameters
  Object.keys(parsed).forEach((key) => {
    if (!ALLOWED_TOP_LEVEL_KEYS.has(key)) {
      docErrors.push({
        row: 0,
        field: key,
        message: `文档顶层包含未知的多余参数 "${key}" (Top-level JSON contains unexpected parameter "${key}")`,
      });
    }
  });

  // Check for missing required parameters
  REQUIRED_TOP_LEVEL_KEYS.forEach((key) => {
    if (parsed[key] === undefined) {
      docErrors.push({
        row: 0,
        field: key,
        message: `文档顶层缺少必要参数 "${key}" (Top-level JSON missing required parameter "${key}")`,
      });
    }
  });

  const collectionName = parsed.collectionName || 'Imported Collection';
  const collectionDescription = parsed.description || '';
  const collectionDifficulty = parsed.difficulty || 'Tahun 2';
  const collectionGroup = parsed.group || 'General';
  const collectionVersion = typeof parsed.version === 'number' ? parsed.version : 1;
  const collectionTags = Array.isArray(parsed.tags) ? parsed.tags.map((t: any) => t.toString().trim()) : [];
  let rawQuestions: any[] = [];

  if (Array.isArray(parsed.questions)) {
    rawQuestions = parsed.questions;
  } else if (parsed.questions !== undefined) {
    docErrors.push({
      row: 0,
      field: 'questions',
      message: '"questions" 必须是一个数组 (questions must be an array)',
    });
  }

  const report = validateAndFormatQuestions(rawQuestions, undefined, docErrors);
  report.collectionName = collectionName;
  report.collectionDescription = collectionDescription;
  report.collectionDifficulty = collectionDifficulty;
  report.collectionGroup = collectionGroup;
  report.collectionVersion = collectionVersion;
  report.collectionTags = collectionTags;
  return report;
}

/**
 * Parse ZIP package containing questions.json + images/
 */
export async function parseZIPImport(fileBuffer: ArrayBuffer): Promise<ValidationReport> {
  let zip: JSZip;
  try {
    zip = await JSZip.loadAsync(fileBuffer);
  } catch (e) {
    return {
      isValid: false,
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      errors: [{ row: 0, field: 'zip', message: 'ZIP 包损坏或无法读取 (Corrupted or unreadable ZIP package)' }],
      warnings: [],
      extractedQuestions: [],
      collectionName: '',
    };
  }

  // Prevent Zip-Slip security attacks
  for (const filename of Object.keys(zip.files)) {
    if (filename.includes('..') || filename.startsWith('/')) {
      return {
        isValid: false,
        totalRows: 0,
        validRows: 0,
        invalidRows: 0,
        errors: [{ row: 0, field: 'zip', message: 'ZIP 包包含非法文件路径 (ZIP package zip-slip attempt)' }],
        warnings: [],
        extractedQuestions: [],
        collectionName: '',
      };
    }
  }

  // 1. Extract image files into Data URLs
  const imagesMap = new Map<string, string>();
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp'];

  for (const [relativePath, zipEntry] of Object.entries(zip.files)) {
    if (zipEntry.dir) continue;
    const lowerPath = relativePath.toLowerCase();
    if (imageExtensions.some((ext) => lowerPath.endsWith(ext))) {
      const blob = await zipEntry.async('blob');
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      imagesMap.set(relativePath, dataUrl);
      imagesMap.set(relativePath.replace(/^images\//, ''), dataUrl);
    }
  }

  // 2. Search for questions.json or manifest.json
  let questionsFileEntry = zip.file('questions.json') || zip.file('manifest.json');

  if (!questionsFileEntry) {
    const jsonFiles = Object.keys(zip.files).filter((f) => f.endsWith('.json'));
    if (jsonFiles.length > 0) {
      questionsFileEntry = zip.file(jsonFiles[0]);
    }
  }

  if (!questionsFileEntry) {
    return {
      isValid: false,
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      errors: [{ row: 0, field: 'zip', message: 'ZIP 包缺少 questions.json 文件 (ZIP package missing questions.json)' }],
      warnings: [],
      extractedQuestions: [],
      collectionName: '',
    };
  }

  const fileText = await questionsFileEntry.async('text');

  let parsed: any;
  try {
    parsed = JSON.parse(fileText);
  } catch (e) {
    return {
      isValid: false,
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      errors: [{ row: 0, field: 'questions.json', message: 'ZIP 包内的 questions.json 语法格式错误' }],
      warnings: [],
      extractedQuestions: [],
      collectionName: '',
    };
  }

  const ALLOWED_TOP_LEVEL_KEYS = new Set([
    'collectionName',
    'version',
    'description',
    'group',
    'difficulty',
    'tags',
    'questions'
  ]);

  const REQUIRED_TOP_LEVEL_KEYS = [
    'collectionName',
    'version',
    'description',
    'group',
    'difficulty',
    'tags',
    'questions'
  ];

  const docErrors: { row: number; field: string; message: string }[] = [];

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return {
      isValid: false,
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      errors: [{ row: 0, field: 'questions.json', message: 'ZIP questions.json 必须为包含顶层元数据参数的对象格式' }],
      warnings: [],
      extractedQuestions: [],
      collectionName: '',
    };
  }

  Object.keys(parsed).forEach((key) => {
    if (!ALLOWED_TOP_LEVEL_KEYS.has(key)) {
      docErrors.push({
        row: 0,
        field: key,
        message: `ZIP questions.json 顶层包含未知的多余参数 "${key}" (Top-level contains unexpected parameter "${key}")`,
      });
    }
  });

  REQUIRED_TOP_LEVEL_KEYS.forEach((key) => {
    if (parsed[key] === undefined) {
      docErrors.push({
        row: 0,
        field: key,
        message: `ZIP questions.json 顶层缺少必要参数 "${key}" (Top-level missing required parameter "${key}")`,
      });
    }
  });

  const collectionName = parsed.collectionName || 'ZIP Imported Collection';
  const collectionDescription = parsed.description || '';
  const collectionDifficulty = parsed.difficulty || 'Tahun 2';
  const collectionGroup = parsed.group || 'General';
  const collectionVersion = typeof parsed.version === 'number' ? parsed.version : 1;
  const collectionTags = Array.isArray(parsed.tags) ? parsed.tags.map((t: any) => t.toString().trim()) : [];
  let rawQuestions: any[] = [];

  if (Array.isArray(parsed.questions)) {
    rawQuestions = parsed.questions;
  } else if (parsed.questions !== undefined) {
    docErrors.push({
      row: 0,
      field: 'questions',
      message: 'ZIP questions.json 内的 "questions" 必须是一个数组 (questions must be an array)',
    });
  }

  const report = validateAndFormatQuestions(rawQuestions, imagesMap, docErrors);
  report.collectionName = collectionName;
  report.collectionDescription = collectionDescription;
  report.collectionDifficulty = collectionDifficulty;
  report.collectionGroup = collectionGroup;
  report.collectionVersion = collectionVersion;
  report.collectionTags = collectionTags;
  return report;
}

/**
 * Parse CSV file containing questions row by row
 */
export async function parseCSVImport(fileText: string, filename: string): Promise<ValidationReport> {
  const lines = fileText.split(/\r?\n/);
  const metadata: Record<string, string> = {};
  const cleanLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) {
      const match = trimmed.match(/^#\s*([^:]+)\s*:\s*(.*)$/);
      if (match) {
        metadata[match[1].trim()] = match[2].trim();
      }
    } else {
      cleanLines.push(line);
    }
  }

  // Filter out leading/trailing empty lines
  let startIndex = 0;
  while (startIndex < cleanLines.length && cleanLines[startIndex].trim() === '') {
    startIndex++;
  }
  const filteredLines = cleanLines.slice(startIndex);

  const cleanText = filteredLines.join('\n');
  const rows = parseCSV(cleanText);

  if (rows.length < 2) {
    return {
      isValid: false,
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      errors: [{ row: 0, field: 'csv', message: 'CSV 文件为空或缺少数据行 (CSV file empty or missing data rows)' }],
      warnings: [],
      extractedQuestions: [],
      collectionName: filename.replace(/\.[^/.]+$/, ''),
    };
  }

  const headerErrors: { row: number; field: string; message: string }[] = [];

  const REQUIRED_CSV_METADATA_KEYS = [
    'collectionName',
    'version',
    'description',
    'group',
    'difficulty',
    'tags'
  ];

  // Check for missing metadata comments
  REQUIRED_CSV_METADATA_KEYS.forEach((key) => {
    if (metadata[key] === undefined) {
      headerErrors.push({
        row: 1,
        field: `# ${key}`,
        message: `CSV 缺少必要元数据注释: "# ${key}: <值>" (CSV missing required metadata comment: "# ${key}")`,
      });
    }
  });

  // Check for unexpected extra metadata comments
  Object.keys(metadata).forEach((key) => {
    if (!REQUIRED_CSV_METADATA_KEYS.includes(key)) {
      headerErrors.push({
        row: 1,
        field: `# ${key}`,
        message: `CSV 包含未知的多余元数据参数: "# ${key}" (CSV contains unexpected metadata parameter: "# ${key}")`,
      });
    }
  });

  const EXPECTED_CSV_HEADERS = [
    'ID',
    'Category',
    'QuestionText',
    'Statements',
    'OptionA',
    'OptionB',
    'OptionC',
    'OptionD',
    'CorrectAnswer',
    'Explanation',
    'SourceReference',
    'ImageFile'
  ];

  const headers = rows[0].map((h) => h.trim());

  // Check for unexpected extra column headers
  headers.forEach((rawHeader) => {
    if (!EXPECTED_CSV_HEADERS.includes(rawHeader)) {
      headerErrors.push({
        row: lines.findIndex(l => l.includes(rows[0].join(','))) + 1 || 1,
        field: rawHeader,
        message: `CSV 表头包含未知的多余列: "${rawHeader}" (CSV header contains unexpected column "${rawHeader}")`,
      });
    }
  });

  // Check for missing required column headers
  EXPECTED_CSV_HEADERS.forEach((req) => {
    if (!headers.includes(req)) {
      headerErrors.push({
        row: lines.findIndex(l => l.includes(rows[0].join(','))) + 1 || 1,
        field: req,
        message: `CSV 表头缺少必要列: "${req}" (CSV header missing required column "${req}")`,
      });
    }
  });

  // Check column counts on data rows
  const rawQuestions: any[] = [];
  const expectedCols = headers.length;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length !== expectedCols) {
      headerErrors.push({
        row: lines.findIndex(l => l.includes(row.join(','))) + 1 || i + 1,
        field: 'columns',
        message: `第 ${i + 1} 行参数列数量不匹配：预期 ${expectedCols} 个，实际 ${row.length} 个 (Column parameter count mismatch)`,
      });
    }

    // Create an object using headers as keys
    const questionObj: any = {};
    headers.forEach((header, index) => {
      if (index < row.length) {
        questionObj[header] = row[index];
      }
    });

    // Normalize keys to what validateAndFormatQuestions expects
    const normalizedObj: any = {
      id: questionObj.ID,
      category: questionObj.Category,
      questionText: questionObj.QuestionText,
      statements: questionObj.Statements,
      optionA: questionObj.OptionA,
      optionB: questionObj.OptionB,
      optionC: questionObj.OptionC,
      optionD: questionObj.OptionD,
      correctAnswer: questionObj.CorrectAnswer,
      explanation: questionObj.Explanation,
      sourceReference: questionObj.SourceReference,
      imageFile: questionObj.ImageFile
    };

    rawQuestions.push(normalizedObj);
  }

  const collectionName = metadata.collectionName || filename.replace(/\.[^/.]+$/, '').trim();
  const collectionDescription = metadata.description || '';
  const collectionDifficulty = metadata.difficulty || 'Tahun 2';
  const collectionGroup = metadata.group || 'General';
  const collectionVersion = metadata.version ? parseInt(metadata.version, 10) : 1;
  const collectionTags = metadata.tags ? metadata.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

  const report = validateAndFormatQuestions(rawQuestions, undefined, headerErrors);
  report.collectionName = collectionName;
  report.collectionDescription = collectionDescription;
  report.collectionDifficulty = collectionDifficulty;
  report.collectionGroup = collectionGroup;
  report.collectionVersion = collectionVersion;
  report.collectionTags = collectionTags;
  return report;
}

