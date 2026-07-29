import JSZip from 'jszip';
import { KnowledgeCollection } from '../types';

/**
 * Trigger file download in browser
 */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Format collection according to standard JSON schema
 */
function formatCollectionForExport(collection: KnowledgeCollection) {
  return {
    collectionName: collection.name,
    version: collection.version || 1,
    description: collection.description || 'Kumpulan soalan pembelajaran.',
    group: collection.group || 'General',
    difficulty: collection.difficulty || 'Standard 1',
    tags: collection.tags || [],
    questions: collection.questions.map((q) => {
      const idx = q.correctIndex >= 0 && q.correctIndex <= 3 ? q.correctIndex : 0;
      const optionLetters = ['A', 'B', 'C', 'D'];
      return {
        id: q.id,
        category: q.category || '',
        difficulty: q.difficulty || collection.difficulty || 'Standard 1',
        knowledgeLevel: q.knowledgeLevel || 'Analyze',
        questionType: q.questionType || 'Analysis',
        tags: q.tags || [],
        questionText: q.questionText,
        statements: q.statements || {},
        optionA: q.options[0] || '',
        optionB: q.options[1] || '',
        optionC: q.options[2] || '',
        optionD: q.options[3] || '',
        correctAnswer: optionLetters[idx],
        explanation: q.explanation || '',
        sourceReference: q.sourceReference || '',
        imageFile: q.image || '',
      };
    }),
  };
}

/**
 * Export collection as JSON
 */
export function exportCollectionAsJSON(collection: KnowledgeCollection) {
  const exportData = formatCollectionForExport(collection);
  const dataStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const filename = `${collection.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_package.json`;
  downloadBlob(blob, filename);
}

/**
 * Export collection as ZIP package
 */
export async function exportCollectionAsZIP(collection: KnowledgeCollection) {
  const zip = new JSZip();

  const exportData = formatCollectionForExport(collection);
  // Create questions.json
  zip.file('questions.json', JSON.stringify(exportData, null, 2));

  // Add images if any
  const imgFolder = zip.folder('images');
  if (imgFolder) {
    for (let i = 0; i < collection.questions.length; i++) {
      const q = collection.questions[i];
      if (q.image && q.image.startsWith('data:image/')) {
        const parts = q.image.split(',');
        const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
        const ext = mime.split('/')[1] || 'png';
        const base64Data = parts[1];
        imgFolder.file(`q_${q.id}.${ext}`, base64Data, { base64: true });
      }
    }
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const filename = `${collection.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_package.zip`;
  downloadBlob(content, filename);
}

/**
 * Download sample JSON template matching system schema
 */
export function downloadSampleJSONTemplate() {
  const template = {
    collectionName: 'Kosa Kata Bahasa Melayu (KSSR)',
    version: 1,
    description: 'Latihan ejaan dan kosa kata Bahasa Melayu Sekolah Rendah (SK & SJKC) selaras dengan KSSR.',
    group: 'Malay',
    difficulty: 'Tahun 2',
    tags: [
      'kosa-kata'
    ],
    questions: [
      {
        id: 'ms-q001',
        category: 'Sekolah & Rumah',
        questionText: 'perpustakaan',
        statements: {},
        optionA: 'prepustakaan',
        optionB: 'perpustakan',
        optionC: 'perpustakaan',
        optionD: 'perpustakkaan',
        correctAnswer: 'C',
        explanation: '图书馆（Library / Perpustakaan）。Maksud: Tempat membaca dan meminjam buku. 例句：Murid-murid membaca buku di perpustakaan.（同学们在图书馆看书。）',
        sourceReference: 'Buku Teks BM Tahun 3, Unit 4',
        imageFile: ''
      }
    ]
  };

  const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
  downloadBlob(blob, 'sample_questions_template.json');
}

/**
 * Download sample CSV template matching system schema
 */
export function downloadSampleCSVTemplate() {
  const headers = [
    'ID',
    'Category',
    'Question Text',
    'Option A',
    'Option B',
    'Option C',
    'Option D',
    'Correct Answer',
    'Explanation',
    'Difficulty',
    'Knowledge Level',
    'Question Type',
    'Tags',
    'Source Reference',
    'Image File'
  ];

  const sampleRow = [
    'ms-csv-001',
    'Sains Hayat',
    'Antara haiwan berikut, yang manakah membiak dengan cara melahirkan anak?',
    'Ayam',
    'Kucing',
    'Ular',
    'Katak',
    'B',
    'Kucing ialah mamalia yang membiak dengan cara melahirkan anak, manakala ayam, ular dan katak bertelur.',
    'Tahun 3',
    'Analyze',
    'Analysis',
    'sains,haiwan',
    'Buku Teks Sains Tahun 3',
    ''
  ];

  // Helper to format CSV row properly
  const formatCSVRow = (row: string[]) => {
    return row.map(val => {
      const escaped = val.replace(/"/g, '""');
      if (escaped.includes(',') || escaped.includes('\n') || escaped.includes('\r') || escaped.includes('"')) {
        return `"${escaped}"`;
      }
      return escaped;
    }).join(',');
  };

  const csvContent = [formatCSVRow(headers), formatCSVRow(sampleRow)].join('\n');
  // Use BOM for Excel UTF-8 encoding support
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, 'sample_questions_template.csv');
}

/**
 * Download sample ZIP template containing questions.json
 */
export async function downloadSampleZIPTemplate() {
  const zip = new JSZip();

  const template = {
    collectionName: 'Kosa Kata Bahasa Melayu (KSSR)',
    version: 1,
    description: 'Latihan ejaan dan kosa kata Bahasa Melayu Sekolah Rendah (SK & SJKC) selaras dengan KSSR.',
    group: 'Malay',
    difficulty: 'Tahun 2',
    tags: [
      'kosa-kata'
    ],
    questions: [
      {
        id: 'ms-q001',
        category: 'Sekolah & Rumah',
        questionText: 'perpustakaan',
        statements: {},
        optionA: 'prepustakaan',
        optionB: 'perpustakan',
        optionC: 'perpustakaan',
        optionD: 'perpustakkaan',
        correctAnswer: 'C',
        explanation: '图书馆（Library / Perpustakaan）。Maksud: Tempat membaca dan meminjam buku. 例句：Murid-murid membaca buku di perpustakaan.（同学们在图书馆看书。）',
        sourceReference: 'Buku Teks BM Tahun 3, Unit 4',
        imageFile: 'q_ms-q001.png'
      }
    ]
  };

  zip.file('questions.json', JSON.stringify(template, null, 2));
  zip.folder('images');

  const content = await zip.generateAsync({ type: 'blob' });
  downloadBlob(content, 'sample_questions_template.zip');
}

