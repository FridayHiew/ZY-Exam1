import { KnowledgeCollection, LanguageCode } from '../types';

interface LocalizedCollectionInfo {
  name: string;
  description: string;
  categories: string[];
}

const GROUP_NAME_MAP: Record<string, Record<LanguageCode, string>> = {
  '华文': { zh: '华文', ms: 'Bahasa Cina', en: 'Chinese' },
  'Bahasa Cina': { zh: '华文', ms: 'Bahasa Cina', en: 'Chinese' },
  'Chinese': { zh: '华文', ms: 'Bahasa Cina', en: 'Chinese' },

  '数学': { zh: '数学', ms: 'Matematik', en: 'Mathematics' },
  'Matematik': { zh: '数学', ms: 'Matematik', en: 'Mathematics' },
  'Mathematics': { zh: '数学', ms: 'Matematik', en: 'Mathematics' },

  '英文': { zh: '英文', ms: 'Bahasa Inggeris', en: 'English' },
  'Bahasa Inggeris': { zh: '英文', ms: 'Bahasa Inggeris', en: 'English' },
  'English': { zh: '英文', ms: 'Bahasa Inggeris', en: 'English' },

  '马来文': { zh: '马来文', ms: 'Bahasa Melayu', en: 'Bahasa Melayu' },
  'Bahasa Melayu': { zh: '马来文', ms: 'Bahasa Melayu', en: 'Bahasa Melayu' },
  'Malay': { zh: '马来文', ms: 'Bahasa Melayu', en: 'Bahasa Melayu' },

  '科学': { zh: '科学', ms: 'Sains', en: 'Science' },
  'Sains': { zh: '科学', ms: 'Sains', en: 'Science' },
  'Science': { zh: '科学', ms: 'Sains', en: 'Science' },

  '历史': { zh: '历史', ms: 'Sejarah', en: 'History' },
  'Sejarah': { zh: '历史', ms: 'Sejarah', en: 'History' },
  'History': { zh: '历史', ms: 'Sejarah', en: 'History' },

  '道德': { zh: '道德', ms: 'Pendidikan Moral', en: 'Moral Education' },
  'Pendidikan Moral': { zh: '道德', ms: 'Pendidikan Moral', en: 'Moral Education' },
  'Moral Education': { zh: '道德', ms: 'Pendidikan Moral', en: 'Moral Education' },

  'General': { zh: '通用', ms: 'Umum', en: 'General' },
  'Umum': { zh: '通用', ms: 'Umum', en: 'General' },
  '通用': { zh: '通用', ms: 'Umum', en: 'General' },
};

const SAMPLE_COLLECTION_TRANSLATIONS: Record<string, Record<LanguageCode, LocalizedCollectionInfo>> = {
  'col-chi-01': {
    zh: {
      name: '华文基础乐园',
      description: '一年级到三年级华文基础：汉字笔画、拼音、常用词语和简单造句。',
      categories: ['汉字笔画', '汉语拼音', '词语搭配', '造句基础'],
    },
    ms: {
      name: 'Taman Asas Bahasa Cina',
      description: 'Asas Bahasa Cina Tahun 1-3: Strok watak, Pinyin, kosa kata dan bina ayat mudah.',
      categories: ['Strok Watak', 'Pinyin Cina', 'Padanan Kata', 'Bina Ayat'],
    },
    en: {
      name: 'Chinese Language Foundation',
      description: 'Years 1-3 Chinese Foundation: Stroke order, Pinyin, vocabulary, and basic sentences.',
      categories: ['Stroke Order', 'Pinyin', 'Vocabulary', 'Sentence Building'],
    },
  },
  'col-chi-02': {
    zh: {
      name: '华文阅读与写作',
      description: '三年级到五年级华文进阶：阅读理解、成语故事、修辞手法和基础写作。',
      categories: ['阅读理解', '成语故事', '修辞手法', '写作技巧'],
    },
    ms: {
      name: 'Bacaan & Penulisan Bahasa Cina',
      description: 'Bahasa Cina Lanjutan Tahun 3-5: Pemahaman, cerita simpulan bahasa, dan penulisan.',
      categories: ['Pemahaman Bacaan', 'Cerita Simpulan Bahasa', 'Gaya Bahasa', 'Kemahiran Menulis'],
    },
    en: {
      name: 'Chinese Reading & Writing',
      description: 'Years 3-5 Chinese Advanced: Reading comprehension, idioms, and writing skills.',
      categories: ['Comprehension', 'Idioms', 'Figures of Speech', 'Writing Skills'],
    },
  },
  'col-math-01': {
    zh: {
      name: '数学小达人',
      description: '一年级到三年级数学基础：加减乘除、认识钱币、读时钟和简单的应用题。',
      categories: ['加减法', '乘除法', '认识钱币', '认识时间', '应用题'],
    },
    ms: {
      name: 'Pakar Matematik Cilik',
      description: 'Asas Matematik Tahun 1-3: Tambah, tolak, darab, bahagi, wang, masa dan soalan penyelesaian masalah.',
      categories: ['Tambah & Tolak', 'Darab & Bahagi', 'Mengenal Wang', 'Mengenal Masa', 'Soalan Penyelesaian'],
    },
    en: {
      name: 'Math Master',
      description: 'Years 1-3 Math Foundation: Addition, subtraction, multiplication, division, money, and time.',
      categories: ['Addition & Subtraction', 'Multiplication & Division', 'Money', 'Time', 'Word Problems'],
    },
  },
  'col-math-02': {
    zh: {
      name: '数学探险家',
      description: '三年级到五年级数学进阶：分数、小数、周长面积、图表和更复杂的应用题。',
      categories: ['分数与小数', '周长与面积', '统计与图表', '逻辑应用题'],
    },
    ms: {
      name: 'Penjelajah Matematik',
      description: 'Matematik Lanjutan Tahun 3-5: Pecahan, perpuluhan, perimeter, luas, dan graf.',
      categories: ['Pecahan & Perpuluhan', 'Perimeter & Luas', 'Statistik & Graf', 'Penyelesaian Masalah Logik'],
    },
    en: {
      name: 'Math Explorer',
      description: 'Years 3-5 Math Advanced: Fractions, decimals, perimeter, area, and problem solving.',
      categories: ['Fractions & Decimals', 'Perimeter & Area', 'Statistics & Charts', 'Logic Problems'],
    },
  },
  'col-eng-01': {
    zh: {
      name: '英语趣味乐园',
      description: '适合一至三年级的趣味英语：字母表、颜色、动物、基础词汇与简单句子。',
      categories: ['字母表', '颜色', '动物', '简单句子'],
    },
    ms: {
      name: 'Bahasa Inggeris Seronok',
      description: 'Bahasa Inggeris mudah Tahun 1-3: Abjad, warna, haiwan, kosa kata dan ayat mudah.',
      categories: ['Abjad', 'Warna', 'Haiwan', 'Ayat Mudah'],
    },
    en: {
      name: 'English Fun Zone',
      description: 'Fun and easy English for Years 1-3: Alphabet, colors, animals, basic vocabulary, and simple sentences.',
      categories: ['Alphabet', 'Colors', 'Animals', 'Simple Sentences'],
    },
  },
  'col-eng-02': {
    zh: {
      name: '英语探险家',
      description: '适合四至六年级的进阶英语：语法、阅读理解、词汇与写作技巧。',
      categories: ['语法', '阅读理解', '词汇', '写作技巧'],
    },
    ms: {
      name: 'Penjelajah Bahasa Inggeris',
      description: 'Bahasa Inggeris Lanjutan Tahun 4-6: Tatabahasa, pemahaman, kosa kata, dan penulisan.',
      categories: ['Tatabahasa', 'Pemahaman Bacaan', 'Kosa Kata', 'Kemahiran Menulis'],
    },
    en: {
      name: 'English Explorer',
      description: 'Intermediate English for Years 4-6: Grammar, reading comprehension, vocabulary, and writing skills.',
      categories: ['Grammar', 'Reading', 'Vocabulary', 'Writing'],
    },
  },
  'col-melayu-01': {
    zh: {
      name: '马来文基础乐园',
      description: '一年级至三年级马来文：字母、基本词汇、拼写和简单句子。',
      categories: ['字母与拼写', '基本词汇', '动物', '简单句子'],
    },
    ms: {
      name: 'Bahasa Melayu Seronok',
      description: 'Tahun 1-3: Huruf, perkataan asas, ejaan, dan ayat mudah. Mari belajar Bahasa Melayu dengan gembira!',
      categories: ['Huruf & Ejaan', 'Perkataan Asas', 'Haiwan', 'Ayat Mudah'],
    },
    en: {
      name: 'Fun Malay Language',
      description: 'Years 1-3 Malay Language: Letters, basic words, spelling, and simple sentences.',
      categories: ['Letters & Spelling', 'Basic Words', 'Animals', 'Simple Sentences'],
    },
  },
  'col-melayu-02': {
    zh: {
      name: '马来文进阶与语法',
      description: '四年级至六年级马来文：语法、阅读理解、谚语和作文。',
      categories: ['语法', '阅读理解', '谚语', '作文'],
    },
    ms: {
      name: 'Bahasa Melayu Maju',
      description: 'Tahun 4-6: Tatabahasa, pemahaman bacaan, peribahasa, dan karangan. Kuasai Bahasa Melayu dengan yakin!',
      categories: ['Tatabahasa', 'Pemahaman', 'Peribahasa', 'Karangan'],
    },
    en: {
      name: 'Advanced Malay Language',
      description: 'Years 4-6 Malay Language: Grammar, reading comprehension, idioms, and essay writing.',
      categories: ['Grammar', 'Reading Comprehension', 'Idioms', 'Essays'],
    },
  },
};

const DIFFICULTY_NAME_MAP: Record<string, Record<LanguageCode, string>> = {
  'Standard 1': { zh: '一年级', ms: 'Tahun 1', en: 'Standard 1' },
  'Tahun 1': { zh: '一年级', ms: 'Tahun 1', en: 'Standard 1' },
  '一年级': { zh: '一年级', ms: 'Tahun 1', en: 'Standard 1' },

  'Standard 2': { zh: '二年级', ms: 'Tahun 2', en: 'Standard 2' },
  'Tahun 2': { zh: '二年级', ms: 'Tahun 2', en: 'Standard 2' },
  '二年级': { zh: '二年级', ms: 'Tahun 2', en: 'Standard 2' },

  'Standard 3': { zh: '三年级', ms: 'Tahun 3', en: 'Standard 3' },
  'Tahun 3': { zh: '三年级', ms: 'Tahun 3', en: 'Standard 3' },
  '三年级': { zh: '三年级', ms: 'Tahun 3', en: 'Standard 3' },

  'Standard 4': { zh: '四年级', ms: 'Tahun 4', en: 'Standard 4' },
  'Tahun 4': { zh: '四年级', ms: 'Tahun 4', en: 'Standard 4' },
  '四年级': { zh: '四年级', ms: 'Tahun 4', en: 'Standard 4' },

  'Standard 5': { zh: '五年级', ms: 'Tahun 5', en: 'Standard 5' },
  'Tahun 5': { zh: '五年级', ms: 'Tahun 5', en: 'Standard 5' },
  '五年级': { zh: '五年级', ms: 'Tahun 5', en: 'Standard 5' },

  'Standard 6': { zh: '六年级', ms: 'Tahun 6', en: 'Standard 6' },
  'Tahun 6': { zh: '六年级', ms: 'Tahun 6', en: 'Standard 6' },
  '六年级': { zh: '六年级', ms: 'Tahun 6', en: 'Standard 6' },

  'Beginner': { zh: '一年级', ms: 'Tahun 1', en: 'Standard 1' },
  'Intermediate': { zh: '三年级', ms: 'Tahun 3', en: 'Standard 3' },
  'Master': { zh: '六年级', ms: 'Tahun 6', en: 'Standard 6' },
  'Expert': { zh: '六年级', ms: 'Tahun 6', en: 'Standard 6' },
};

/**
 * Get localized group name
 */
export function getLocalizedGroupName(groupName: string | undefined, lang: LanguageCode): string {
  if (!groupName) return groupName || 'General';
  const trimmed = groupName.trim();
  const mapping = GROUP_NAME_MAP[trimmed];
  if (mapping && mapping[lang]) {
    return mapping[lang];
  }
  return trimmed;
}

/**
 * Get localized difficulty name (Primary School Standard 1-6)
 */
export function getLocalizedDifficultyName(difficulty: string | undefined, lang: LanguageCode): string {
  if (!difficulty) return lang === 'zh' ? '一年级' : lang === 'ms' ? 'Tahun 1' : 'Standard 1';
  const trimmed = difficulty.trim();
  const mapping = DIFFICULTY_NAME_MAP[trimmed];
  if (mapping && mapping[lang]) {
    return mapping[lang];
  }
  return trimmed;
}

/**
 * Get localized collection with translated name, description, group, difficulty, and categories
 */
export function getLocalizedCollection(col: KnowledgeCollection, lang: LanguageCode): KnowledgeCollection {
  const localizedGroup = getLocalizedGroupName(col.group, lang);
  const localizedDifficulty = getLocalizedDifficultyName(col.difficulty, lang);
  const colTrans = SAMPLE_COLLECTION_TRANSLATIONS[col.id];

  if (colTrans && colTrans[lang]) {
    const info = colTrans[lang];
    return {
      ...col,
      name: info.name,
      description: info.description,
      group: localizedGroup,
      difficulty: localizedDifficulty,
      categories: info.categories,
    };
  }

  return {
    ...col,
    group: localizedGroup,
    difficulty: localizedDifficulty,
  };
}

/**
 * Get array of localized collections
 */
export function getLocalizedCollections(collections: KnowledgeCollection[], lang: LanguageCode): KnowledgeCollection[] {
  return collections.map((col) => getLocalizedCollection(col, lang));
}
