// sampleCollections.ts - Kid-Friendly Malaysian Primary School Version
import { KnowledgeCollection } from '../types';

export const SAMPLE_COLLECTIONS: KnowledgeCollection[] = [
  // ============================================================
  // GROUP 1: 华文 Bahasa Cina (Chinese Language)
  // ============================================================
  {
    id: 'col-chi-01',
    name: '🌟 华文基础乐园 (Bahasa Cina Asas)',
    description: '🌱 一年级到三年级华文基础：汉字笔画、拼音、常用词语和简单造句。适合刚开始学习华文的小朋友！',
    group: '📚 华文 Bahasa Cina',
    difficulty: 'Beginner',
    version: 1,
    createdAt: '2026-07-01T00:00:00.000Z',
    updatedAt: '2026-07-22T00:00:00.000Z',
    questionCount: 8,
    categories: ['🔤 汉字笔画', '🔊 汉语拼音', '📝 词语搭配', '✏️ 造句基础'],
    questions: [
      {
        id: 'chi-q1',
        category: '🔤 汉字笔画',
        questionText: '"大" 字一共有几画？',
        options: ['2画', '3画', '4画', '5画'],
        correctIndex: 1,
        explanation: '🌟 "大" 字有 3 画：横、撇、捺。你答对了吗？继续加油！',
        sourceReference: '📖 华文课本 一年级上册 第5页'
      },
      {
        id: 'chi-q2',
        category: '🔤 汉字笔画',
        questionText: '"小" 字的正确笔顺是什么？',
        options: ['竖钩、撇、点', '撇、点、竖钩', '点、撇、竖钩', '横、竖、撇'],
        correctIndex: 0,
        explanation: '✨ "小" 字的笔顺是：竖钩 ✊、撇 ✋、点 👆。写对了吗？真棒！',
        sourceReference: '📖 华文课本 一年级上册 第8页'
      },
      {
        id: 'chi-q3',
        category: '🔊 汉语拼音',
        questionText: '"妈妈" 的正确拼音是什么？',
        options: ['mā mā', 'má má', 'mǎ mǎ', 'mà mà'],
        correctIndex: 0,
        explanation: '🎵 "妈妈" 的拼音是 mā mā，第一声哦！你读对了吗？',
        sourceReference: '📖 华文课本 一年级上册 第15页'
      },
      {
        id: 'chi-q4',
        category: '🔊 汉语拼音',
        questionText: '下面哪个字的拼音是 "shū"？',
        options: ['书', '树', '数', '水'],
        correctIndex: 0,
        explanation: '📚 "书" 的拼音是 shū。书本是我们的好朋友，要好好爱护哦！',
        sourceReference: '📖 华文课本 一年级上册 第28页'
      },
      {
        id: 'chi-q5',
        category: '📝 词语搭配',
        questionText: '"___ 花" 哪个量词是正确的？',
        options: ['一朵', '一棵', '一条', '一只'],
        correctIndex: 0,
        explanation: '🌺 我们说 "一朵花"。花朵像小伞一样美丽！',
        sourceReference: '📖 华文课本 二年级上册 第12页'
      },
      {
        id: 'chi-q6',
        category: '📝 词语搭配',
        questionText: '"___ 书" 哪个量词是正确的？',
        options: ['一本', '一张', '一只', '一条'],
        correctIndex: 0,
        explanation: '📖 我们说 "一本书"。书本里有很多有趣的知识等着你去发现！',
        sourceReference: '📖 华文课本 二年级上册 第18页'
      },
      {
        id: 'chi-q7',
        category: '✏️ 造句基础',
        questionText: '下面的词语中，哪个是正确的句子？',
        options: [
          '我吃饭。', 
          '饭吃我。', 
          '我饭吃。', 
          '饭我吃。'
        ],
        correctIndex: 0,
        explanation: '✅ "我吃饭。" 是正确的句子。句子要有 "谁 + 做什么" 哦！',
        sourceReference: '📖 华文课本 二年级下册 第5页'
      },
      {
        id: 'chi-q8',
        category: '✏️ 造句基础',
        questionText: '用 "开心" 造句，哪个是正确的？',
        options: [
          '我今天很开心。', 
          '我今天开心很。', 
          '开心我今天很。', 
          '我很今天开心。'
        ],
        correctIndex: 0,
        explanation: '😊 "我今天很开心。" 是正确的！开心就是心里像吃了糖果一样甜！',
        sourceReference: '📖 华文课本 三年级上册 第8页'
      }
    ]
  },
  {
    id: 'col-chi-02',
    name: '🌟 华文阅读与写作 (Membaca & Menulis Cina)',
    description: '📖 三年级到五年级华文进阶：阅读理解、成语故事、修辞手法和基础写作。提升你的华文水平！',
    group: '📚 华文 Bahasa Cina',
    difficulty: 'Intermediate',
    version: 1,
    createdAt: '2026-07-05T00:00:00.000Z',
    updatedAt: '2026-07-22T00:00:00.000Z',
    questionCount: 8,
    categories: ['📖 阅读理解', '📜 成语故事', '🎨 修辞手法', '✍️ 写作技巧'],
    questions: [
      {
        id: 'chi-q9',
        category: '📖 阅读理解',
        questionText: '"太阳从东方升起。" 这句话告诉我们什么？',
        options: [
          '太阳在西方落下', 
          '太阳早上从东方出来', 
          '太阳晚上出来', 
          '太阳不会出来'
        ],
        correctIndex: 1,
        explanation: '🌅 太阳每天早上从东方升起，叫我们起床去上学呢！',
        sourceReference: '📖 华文课本 三年级上册 第25页'
      },
      {
        id: 'chi-q10',
        category: '📜 成语故事',
        questionText: '"守株待兔" 这个故事告诉我们要怎么做？',
        options: [
          '坐在树下等兔子来撞', 
          '不努力也能成功', 
          '要勤劳，不能懒惰等待', 
          '兔子很笨'
        ],
        correctIndex: 2,
        explanation: '🐰 "守株待兔" 告诉我们要勤劳工作，不能像那个农夫一样等着好事自己来！',
        sourceReference: '📖 华文课本 四年级上册 第15页'
      },
      {
        id: 'chi-q11',
        category: '📜 成语故事',
        questionText: '"画蛇添足" 是什么意思？',
        options: [
          '给蛇画脚，多此一举', 
          '画蛇画得很好', 
          '蛇有很多脚', 
          '画画比赛赢了'
        ],
        correctIndex: 0,
        explanation: '🐍 "画蛇添足" 就是做了多余的事情，反而不对了。就像画蛇还给蛇画脚一样！',
        sourceReference: '📖 华文课本 四年级下册 第10页'
      },
      {
        id: 'chi-q12',
        category: '🎨 修辞手法',
        questionText: '"月亮像弯弯的小船。" 用了什么修辞手法？',
        options: ['比喻', '拟人', '排比', '夸张'],
        correctIndex: 0,
        explanation: '🌙 这句话用了 "比喻" 手法，把月亮比作小船，真美呀！',
        sourceReference: '📖 华文课本 五年级上册 第8页'
      },
      {
        id: 'chi-q13',
        category: '✍️ 写作技巧',
        questionText: '写作文时，开头应该怎么写？',
        options: [
          '直接写结尾', 
          '写一个吸引人的开头', 
          '什么也不写', 
          '随便写'
        ],
        correctIndex: 1,
        explanation: '✏️ 作文开头要吸引人，比如 "今天是个特别的日子..." 这样读者就想往下看啦！',
        sourceReference: '📖 华文课本 五年级下册 第3页'
      },
      {
        id: 'chi-q14',
        category: '📖 阅读理解',
        questionText: '"小猫钓鱼" 的故事告诉我们什么道理？',
        options: [
          '猫喜欢吃鱼', 
          '做事要专心，不能三心二意', 
          '钓鱼很容易', 
          '猫很懒惰'
        ],
        correctIndex: 1,
        explanation: '🐱 小猫钓鱼时追蝴蝶又抓蜻蜓，结果什么也没钓到。这个故事告诉我们做事要专心！',
        sourceReference: '📖 华文课本 三年级下册 第20页'
      },
      {
        id: 'chi-q15',
        category: '🎨 修辞手法',
        questionText: '"小草从泥土里探出头来。" 用了什么修辞手法？',
        options: ['比喻', '拟人', '排比', '夸张'],
        correctIndex: 1,
        explanation: '🌱 这句话用了 "拟人" 手法，把小草当作人，会 "探出头来"，好可爱！',
        sourceReference: '📖 华文课本 四年级上册 第30页'
      },
      {
        id: 'chi-q16',
        category: '✍️ 写作技巧',
        questionText: '好的作文结尾应该怎样？',
        options: [
          '不写结尾', 
          '写一个总结和感受', 
          '随便写', 
          '重复开头'
        ],
        correctIndex: 1,
        explanation: '📝 好的作文结尾要总结全文，写出自己的感受。比如 "今天真开心，我学到了很多！"',
        sourceReference: '📖 华文课本 五年级下册 第18页'
      }
    ]
  },

  // ============================================================
  // GROUP 2: 数学 Matematik (Mathematics)
  // ============================================================
  {
    id: 'col-math-01',
    name: '🧮 数学小达人 (Matematik Asas)',
    description: '🧸 一年级到三年级数学基础：加减乘除、认识钱币、读时钟和简单的应用题。让数学变得有趣！',
    group: '🧮 数学 Matematik',
    difficulty: 'Beginner',
    version: 1,
    createdAt: '2026-07-02T00:00:00.000Z',
    updatedAt: '2026-07-22T00:00:00.000Z',
    questionCount: 8,
    categories: ['➕ 加减法', '✖️ 乘除法', '💰 认识钱币', '⏰ 认识时间', '📝 应用题'],
    questions: [
      {
        id: 'math-q1',
        category: '➕ 加减法',
        questionText: '5 + 3 = ？',
        options: ['6', '7', '8', '9'],
        correctIndex: 2,
        explanation: '🌟 5 + 3 = 8。你算对了吗？太棒了！继续加油！',
        sourceReference: '📖 数学课本 一年级上册 第12页'
      },
      {
        id: 'math-q2',
        category: '➕ 加减法',
        questionText: '10 - 4 = ？',
        options: ['5', '6', '7', '8'],
        correctIndex: 1,
        explanation: '✨ 10 - 4 = 6。减法就是从总数里拿走一些！',
        sourceReference: '📖 数学课本 一年级下册 第8页'
      },
      {
        id: 'math-q3',
        category: '✖️ 乘除法',
        questionText: '3 × 4 = ？',
        options: ['10', '11', '12', '13'],
        correctIndex: 2,
        explanation: '🎯 3 × 4 = 12。3个4加起来就是12！乘法就是快速加法！',
        sourceReference: '📖 数学课本 二年级上册 第25页'
      },
      {
        id: 'math-q4',
        category: '✖️ 乘除法',
        questionText: '12 ÷ 3 = ？',
        options: ['3', '4', '5', '6'],
        correctIndex: 1,
        explanation: '🍎 12 ÷ 3 = 4。把12个苹果分给3个小朋友，每人得到4个！',
        sourceReference: '📖 数学课本 二年级下册 第15页'
      },
      {
        id: 'math-q5',
        category: '💰 认识钱币',
        questionText: '马来西亚的硬币中，哪个是黄色的（金色）？',
        options: ['10 sen', '20 sen', '50 sen', 'RM 1'],
        correctIndex: 2,
        explanation: '🪙 马来西亚 50 sen 的硬币是金色的（黄色的）！你见过吗？',
        sourceReference: '📖 数学课本 二年级上册 第40页'
      },
      {
        id: 'math-q6',
        category: '⏰ 认识时间',
        questionText: '如果长针指到 12，短针指到 3，现在是几点？',
        options: ['1点', '2点', '3点', '4点'],
        correctIndex: 2,
        explanation: '🕐 长针指12是"整点"，短针指3就是3点整！该吃点心啦！',
        sourceReference: '📖 数学课本 二年级下册 第35页'
      },
      {
        id: 'math-q7',
        category: '📝 应用题',
        questionText: '小明有 8 颗糖，吃了 3 颗，还剩下多少颗？',
        options: ['3颗', '4颗', '5颗', '6颗'],
        correctIndex: 2,
        explanation: '🍬 8 - 3 = 5 颗。小明还有5颗糖果，分给你一颗好不好？',
        sourceReference: '📖 数学课本 一年级下册 第18页'
      },
      {
        id: 'math-q8',
        category: '📝 应用题',
        questionText: '一个蛋糕切成 6 块，吃了 2 块，还剩下多少块？',
        options: ['2块', '3块', '4块', '5块'],
        correctIndex: 2,
        explanation: '🍰 6 - 2 = 4 块。还剩下4块蛋糕，可以明天当早餐！',
        sourceReference: '📖 数学课本 二年级上册 第30页'
      }
    ]
  },
  {
    id: 'col-math-02',
    name: '🧮 数学探险家 (Matematik Lanjutan)',
    description: '🚀 三年级到五年级数学进阶：分数、小数、周长面积、图表和更复杂的应用题。成为数学小探险家！',
    group: '🧮 数学 Matematik',
    difficulty: 'Intermediate',
    version: 1,
    createdAt: '2026-07-06T00:00:00.000Z',
    updatedAt: '2026-07-22T00:00:00.000Z',
    questionCount: 8,
    categories: ['🧩 分数与小数', '📐 周长与面积', '📊 统计与图表', '🧠 逻辑应用题'],
    questions: [
      {
        id: 'math-q9',
        category: '🧩 分数与小数',
        questionText: '1/2 等于多少小数？',
        options: ['0.1', '0.2', '0.5', '0.8'],
        correctIndex: 2,
        explanation: '🍕 1/2 就是一半，等于 0.5。半个披萨就是 0.5 个披萨！',
        sourceReference: '📖 数学课本 三年级上册 第28页'
      },
      {
        id: 'math-q10',
        category: '🧩 分数与小数',
        questionText: '3/4 等于多少小数？',
        options: ['0.25', '0.50', '0.75', '0.80'],
        correctIndex: 2,
        explanation: '🎯 3/4 = 0.75。把1分成4份，取3份就是四分之三！',
        sourceReference: '📖 数学课本 三年级下册 第12页'
      },
      {
        id: 'math-q11',
        category: '📐 周长与面积',
        questionText: '一个正方形，每边 4 cm，周长是多少？',
        options: ['8 cm', '12 cm', '16 cm', '20 cm'],
        correctIndex: 2,
        explanation: '📏 正方形周长 = 4 × 边长 = 4 × 4 = 16 cm。四条边加起来就是周长！',
        sourceReference: '📖 数学课本 四年级上册 第22页'
      },
      {
        id: 'math-q12',
        category: '📐 周长与面积',
        questionText: '长方形的长 5 cm，宽 3 cm，面积是多少？',
        options: ['8 cm²', '10 cm²', '15 cm²', '16 cm²'],
        correctIndex: 2,
        explanation: '🧮 长方形面积 = 长 × 宽 = 5 × 3 = 15 cm²。面积就是里面能铺多少小方块！',
        sourceReference: '📖 数学课本 四年级下册 第18页'
      },
      {
        id: 'math-q13',
        category: '📊 统计与图表',
        questionText: '柱状图可以告诉我们什么？',
        options: [
          '东西的大小', 
          '数量的多少', 
          '颜色的美丑', 
          '声音的高低'
        ],
        correctIndex: 1,
        explanation: '📊 柱状图用柱子高度来表示数量，柱子越高，数量越多！',
        sourceReference: '📖 数学课本 五年级上册 第10页'
      },
      {
        id: 'math-q14',
        category: '🧠 逻辑应用题',
        questionText: '一盒鸡蛋有 12 个，阿姨买了 3 盒，一共有多少个鸡蛋？',
        options: ['24个', '30个', '36个', '42个'],
        correctIndex: 2,
        explanation: '🥚 12 × 3 = 36 个鸡蛋。可以做很多美味的煎蛋！',
        sourceReference: '📖 数学课本 三年级下册 第25页'
      },
      {
        id: 'math-q15',
        category: '🧠 逻辑应用题',
        questionText: '爸爸买了 2 公斤苹果，每公斤 RM 4，一共花了多少钱？',
        options: ['RM 4', 'RM 6', 'RM 8', 'RM 10'],
        correctIndex: 2,
        explanation: '🍎 RM 4 × 2 = RM 8。苹果又甜又脆，真好吃！',
        sourceReference: '📖 数学课本 四年级上册 第35页'
      },
      {
        id: 'math-q16',
        category: '📊 统计与图表',
        questionText: '班级里有 12 个男生和 10 个女生，哪个性别人数更多？',
        options: ['男生', '女生', '一样多', '不确定'],
        correctIndex: 0,
        explanation: '👦 12 > 10，所以男生比女生多2人。你数对了吗？',
        sourceReference: '📖 数学课本 三年级上册 第40页'
      }
    ]
  },

  // ============================================================
  // GROUP 3: 英文 Bahasa Inggeris (English)
  // ============================================================
  {
    id: 'col-eng-01',
    name: '🌟 English Fun Zone (Bahasa Inggeris Asas)',
    description: '🌈 Fun and easy English for Years 1-3: Alphabet, colors, animals, basic vocabulary, and simple sentences. Let\'s learn English together!',
    group: '🇬🇧 英文 Bahasa Inggeris',
    difficulty: 'Beginner',
    version: 1,
    createdAt: '2026-07-03T00:00:00.000Z',
    updatedAt: '2026-07-22T00:00:00.000Z',
    questionCount: 8,
    categories: ['🔤 Alphabet & Spelling', '🎨 Colors & Shapes', '🐾 Animals', '📝 Simple Sentences'],
    questions: [
      {
        id: 'eng-q1',
        category: '🔤 Alphabet & Spelling',
        questionText: '"Apple" 的第一个字母是什么？',
        options: ['A', 'B', 'C', 'D'],
        correctIndex: 0,
        explanation: '🍎 "Apple" 的第一个字母是 A！Apple 是苹果的意思，好吃又健康！',
        sourceReference: '📖 英文课本 一年级上册 第3页'
      },
      {
        id: 'eng-q2',
        category: '🔤 Alphabet & Spelling',
        questionText: '"Cat" 这个词怎么拼？',
        options: ['Kat', 'Cat', 'Katt', 'Catt'],
        correctIndex: 1,
        explanation: '🐱 "Cat" 是猫的意思，拼法是 C-A-T！猫咪真可爱！',
        sourceReference: '📖 英文课本 一年级下册 第8页'
      },
      {
        id: 'eng-q3',
        category: '🎨 Colors & Shapes',
        questionText: 'Malaysia 国旗的主要颜色是什么？',
        options: ['Red and White', 'Blue and Yellow', 'Green and Red', 'Black and White'],
        correctIndex: 0,
        explanation: '🇲🇾 Malaysia 国旗是红白相间的，还有蓝色的部分！像条纹一样美丽！',
        sourceReference: '📖 英文课本 二年级上册 第15页'
      },
      {
        id: 'eng-q4',
        category: '🐾 Animals',
        questionText: '下面哪个是 "狗" 的英文？',
        options: ['Cat', 'Dog', 'Bird', 'Fish'],
        correctIndex: 1,
        explanation: '🐕 "Dog" 是狗的意思！狗是人类最好的朋友！',
        sourceReference: '📖 英文课本 一年级上册 第20页'
      },
      {
        id: 'eng-q5',
        category: '🐾 Animals',
        questionText: '"Elephant" 是什么动物？',
        options: ['老虎', '大象', '熊猫', '狮子'],
        correctIndex: 1,
        explanation: '🐘 "Elephant" 是大象！大象是陆地上最大的动物！',
        sourceReference: '📖 英文课本 二年级下册 第10页'
      },
      {
        id: 'eng-q6',
        category: '📝 Simple Sentences',
        questionText: '"I am a student." 是什么意思？',
        options: ['我是老师', '我是学生', '我是医生', '我是爸爸'],
        correctIndex: 1,
        explanation: '🎒 "I am a student." 意思是 "我是一个学生"。你就是一个学生！',
        sourceReference: '📖 英文课本 一年级下册 第25页'
      },
      {
        id: 'eng-q7',
        category: '📝 Simple Sentences',
        questionText: '下面哪个是 "谢谢" 的英文？',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        correctIndex: 2,
        explanation: '🙏 "Thank you" 是 "谢谢" 的意思。要做一个有礼貌的好孩子哦！',
        sourceReference: '📖 英文课本 二年级上册 第5页'
      },
      {
        id: 'eng-q8',
        category: '🎨 Colors & Shapes',
        questionText: '香蕉是什么颜色？',
        options: ['Red', 'Yellow', 'Green', 'Blue'],
        correctIndex: 1,
        explanation: '🍌 香蕉是黄色的 (Yellow)！黄色像太阳一样温暖！',
        sourceReference: '📖 英文课本 一年级上册 第12页'
      }
    ]
  },
  {
    id: 'col-eng-02',
    name: '🌟 English Explorer (Bahasa Inggeris Lanjutan)',
    description: '🚀 Intermediate English for Years 4-6: Grammar, reading comprehension, vocabulary, and writing skills. Become an English explorer!',
    group: '🇬🇧 英文 Bahasa Inggeris',
    difficulty: 'Intermediate',
    version: 1,
    createdAt: '2026-07-07T00:00:00.000Z',
    updatedAt: '2026-07-22T00:00:00.000Z',
    questionCount: 8,
    categories: ['📚 Grammar', '📖 Reading', '📝 Vocabulary', '✍️ Writing'],
    questions: [
      {
        id: 'eng-q9',
        category: '📚 Grammar',
        questionText: '下面哪个是正确的主谓宾句子？',
        options: [
          'I like apples.', 
          'I apples like.', 
          'Like I apples.', 
          'Apples I like.'
        ],
        correctIndex: 0,
        explanation: '✅ "I like apples." 是正确的。句子结构是 主语 + 动词 + 宾语！',
        sourceReference: '📖 英文课本 三年级上册 第15页'
      },
      {
        id: 'eng-q10',
        category: '📚 Grammar',
        questionText: '"She ___ to school every day." 应该填什么？',
        options: ['go', 'goes', 'going', 'went'],
        correctIndex: 1,
        explanation: '📚 "She goes to school every day." 因为 She 是第三人称单数，动词要加 -s！',
        sourceReference: '📖 英文课本 三年级下册 第8页'
      },
      {
        id: 'eng-q11',
        category: '📖 Reading',
        questionText: '"The sun rises in the east." 是什么意思？',
        options: [
          '太阳从西方升起', 
          '太阳从东方升起', 
          '太阳在南方', 
          '太阳不升起'
        ],
        correctIndex: 1,
        explanation: '🌅 太阳每天早上从东方 (the east) 升起！叫我们起床学习啦！',
        sourceReference: '📖 英文课本 四年级上册 第20页'
      },
      {
        id: 'eng-q12',
        category: '📝 Vocabulary',
        questionText: '"Delicious" 是什么意思？',
        options: ['难吃的', '美味的', '便宜的', '贵的'],
        correctIndex: 1,
        explanation: '😋 "Delicious" 是 "美味的" 意思。妈妈做的饭最 delicious 了！',
        sourceReference: '📖 英文课本 四年级下册 第12页'
      },
      {
        id: 'eng-q13',
        category: '📝 Vocabulary',
        questionText: '"Beautiful" 的反义词是什么？',
        options: ['Pretty', 'Ugly', 'Nice', 'Lovely'],
        correctIndex: 1,
        explanation: '🌸 "Beautiful" 是美丽，反义词是 "Ugly" 丑陋。要发现世界的美！',
        sourceReference: '📖 英文课本 五年级上册 第25页'
      },
      {
        id: 'eng-q14',
        category: '✍️ Writing',
        questionText: '写英文信的开头应该用什么？',
        options: [
          'Dear ___', 
          'Hi ___', 
          'Hello ___', 
          '以上都可以'
        ],
        correctIndex: 3,
        explanation: '✉️ 写信开头可以用 Dear, Hi 或 Hello，都是礼貌的表达！',
        sourceReference: '📖 英文课本 五年级下册 第5页'
      },
      {
        id: 'eng-q15',
        category: '📖 Reading',
        questionText: '"Practice makes perfect." 是什么意思？',
        options: [
          '练习使人完美', 
          '完美不需要练习', 
          '练习很无聊', 
          '完美很容易'
        ],
        correctIndex: 0,
        explanation: '🌟 "Practice makes perfect" 意思是 "熟能生巧"。多练习就会越来越棒！',
        sourceReference: '📖 英文课本 六年级上册 第10页'
      },
      {
        id: 'eng-q16',
        category: '✍️ Writing',
        questionText: '写日记时，开头可以用什么？',
        options: [
          'Dear Diary', 
          'Today I...', 
          'Yesterday...', 
          '以上都可以'
        ],
        correctIndex: 3,
        explanation: '📔 写日记可以用 "Dear Diary" 或 "Today I..." 等方式开头，记录每天的生活！',
        sourceReference: '📖 英文课本 六年级下册 第8页'
      }
    ]
  },

  // ============================================================
  // GROUP 4: 马来文 Bahasa Melayu
  // ============================================================
  {
    id: 'col-melayu-01',
    name: '🌟 Bahasa Melayu Seronok (Asas)',
    description: '🌈 Tahun 1-3: Huruf, perkataan asas, ejaan, dan ayat mudah. Mari belajar Bahasa Melayu dengan gembira!',
    group: '🇲🇾 马来文 Bahasa Melayu',
    difficulty: 'Beginner',
    version: 1,
    createdAt: '2026-07-04T00:00:00.000Z',
    updatedAt: '2026-07-22T00:00:00.000Z',
    questionCount: 8,
    categories: ['🔤 Huruf & Ejaan', '📝 Perkataan Asas', '🐾 Haiwan', '📖 Ayat Mudah'],
    questions: [
      {
        id: 'mel-q1',
        category: '🔤 Huruf & Ejaan',
        questionText: '"Buku" 的第一个字母是什么？',
        options: ['A', 'B', 'C', 'D'],
        correctIndex: 1,
        explanation: '📚 "Buku" 是书本的意思，第一个字母是 B！Buku 是我们的好朋友！',
        sourceReference: '📖 马来文课本 一年级上册 第5页'
      },
      {
        id: 'mel-q2',
        category: '🔤 Huruf & Ejaan',
        questionText: '"Ibu" 是什么意思？',
        options: ['爸爸', '妈妈', '哥哥', '妹妹'],
        correctIndex: 1,
        explanation: '👩 "Ibu" 是妈妈的意思！妈妈最疼爱我们了！',
        sourceReference: '📖 马来文课本 一年级下册 第8页'
      },
      {
        id: 'mel-q3',
        category: '📝 Perkataan Asas',
        questionText: '下面哪个是 "学校" 的马来文？',
        options: ['Sekolah', 'Rumah', 'Kedai', 'Taman'],
        correctIndex: 0,
        explanation: '🏫 "Sekolah" 是学校！每天我们都在 sekolah 学习新知识！',
        sourceReference: '📖 马来文课本 二年级上册 第12页'
      },
      {
        id: 'mel-q4',
        category: '🐾 Haiwan',
        questionText: '"Kucing" 是什么动物？',
        options: ['狗', '猫', '兔子', '老虎'],
        correctIndex: 1,
        explanation: '🐱 "Kucing" 是猫！猫咪爱干净，喜欢睡觉！',
        sourceReference: '📖 马来文课本 一年级上册 第18页'
      },
      {
        id: 'mel-q5',
        category: '🐾 Haiwan',
        questionText: '"Gajah" 是什么动物？',
        options: ['大象', '老虎', '狮子', '长颈鹿'],
        correctIndex: 0,
        explanation: '🐘 "Gajah" 是大象！大象是森林里最大的动物！',
        sourceReference: '📖 马来文课本 二年级下册 第10页'
      },
      {
        id: 'mel-q6',
        category: '📖 Ayat Mudah',
        questionText: '"Saya suka makan nasi." 是什么意思？',
        options: [
          '我喜欢吃饭', 
          '我喜欢吃面', 
          '我喜欢吃面包', 
          '我不喜欢吃饭'
        ],
        correctIndex: 0,
        explanation: '🍚 "Saya suka makan nasi" 意思是 "我喜欢吃饭"。吃饭才有力气学习！',
        sourceReference: '📖 马来文课本 一年级下册 第22页'
      },
      {
        id: 'mel-q7',
        category: '📝 Perkataan Asas',
        questionText: '下面哪个是 "谢谢" 的马来文？',
        options: ['Terima kasih', 'Selamat pagi', 'Sama-sama', 'Maaf'],
        correctIndex: 0,
        explanation: '🙏 "Terima kasih" 是谢谢的意思！要有礼貌，常说谢谢！',
        sourceReference: '📖 马来文课本 二年级上册 第5页'
      },
      {
        id: 'mel-q8',
        category: '📖 Ayat Mudah',
        questionText: '"Saya pergi ke sekolah." 是什么意思？',
        options: ['我去学校', '我去公园', '我去商店', '我在家'],
        correctIndex: 0,
        explanation: '🚶 "Saya pergi ke sekolah" 意思是 "我去学校"。每天都要去 sekolah 学习哦！',
        sourceReference: '📖 马来文课本 二年级下册 第15页'
      }
    ]
  },
  {
    id: 'col-melayu-02',
    name: '🌟 Bahasa Melayu Maju (Lanjutan)',
    description: '🚀 Tahun 4-6: Tatabahasa, pemahaman bacaan, peribahasa, dan karangan. Kuasai Bahasa Melayu dengan yakin!',
    group: '🇲🇾 马来文 Bahasa Melayu',
    difficulty: 'Intermediate',
    version: 1,
    createdAt: '2026-07-08T00:00:00.000Z',
    updatedAt: '2026-07-22T00:00:00.000Z',
    questionCount: 8,
    categories: ['📚 Tatabahasa', '📖 Pemahaman', '📝 Peribahasa', '✍️ Karangan'],
    questions: [
      {
        id: 'mel-q9',
        category: '📚 Tatabahasa',
        questionText: 'Ayat yang manakah betul dari segi tatabahasa?',
        options: [
          'Saya makan nasi.', 
          'Saya nasi makan.', 
          'Makan saya nasi.', 
          'Nasi saya makan.'
        ],
        correctIndex: 0,
        explanation: '✅ "Saya makan nasi." 是正确语法的句子。马来文句式是 主语 + 动词 + 宾语！',
        sourceReference: '📖 马来文课本 三年级上册 第15页'
      },
      {
        id: 'mel-q10',
        category: '📚 Tatabahasa',
        questionText: '"Dia ___ ke sekolah setiap hari." 应该填什么？',
        options: ['pergi', 'perginya', 'pergilah', 'pergi-pergi'],
        correctIndex: 0,
        explanation: '📚 "Dia pergi ke sekolah setiap hari." "Dia" 搭配动词 "pergi" 就可以！',
        sourceReference: '📖 马来文课本 三年级下册 第8页'
      },
      {
        id: 'mel-q11',
        category: '📖 Pemahaman',
        questionText: '"Bumi itu bulat." 是什么意思？',
        options: [
          '地球是方的', 
          '地球是圆的', 
          '地球是三角形', 
          '地球是平的'
        ],
        correctIndex: 1,
        explanation: '🌍 "Bumi itu bulat" 意思是 "地球是圆的"。从太空看地球是蓝色的圆球！',
        sourceReference: '📖 马来文课本 四年级上册 第20页'
      },
      {
        id: 'mel-q12',
        category: '📝 Peribahasa',
        questionText: '"Bagai aur dengan tebing" 是什么意思？',
        options: [
          '互相帮助', 
          '互相争吵', 
          '互相不理', 
          '互相竞争'
        ],
        correctIndex: 0,
        explanation: '🌿 "Bagai aur dengan tebing" 意思是像竹子和河岸一样互相支持。好朋友要互相帮助！',
        sourceReference: '📖 马来文课本 四年级下册 第12页'
      },
      {
        id: 'mel-q13',
        category: '📝 Peribahasa',
        questionText: '"Sediakan payung sebelum hujan" 告诉我们什么道理？',
        options: [
          '准备应对未来', 
          '不要准备', 
          '等下雨才准备', 
          '雨伞没用'
        ],
        correctIndex: 0,
        explanation: '☔ 这句谚语告诉我们 "凡事要提前准备"。就像下雨前要准备好雨伞！',
        sourceReference: '📖 马来文课本 五年级上册 第25页'
      },
      {
        id: 'mel-q14',
        category: '✍️ Karangan',
        questionText: '写作文的开头可以用什么？',
        options: [
          'Pada suatu hari...', 
          'Tadi...', 
          'Semalam...', 
          '以上都可以'
        ],
        correctIndex: 3,
        explanation: '✏️ 马来文作文开头可以用 "Pada suatu hari..." (有一天), "Tadi..." (刚才) 或 "Semalam..." (昨天)。',
        sourceReference: '📖 马来文课本 五年级下册 第5页'
      },
      {
        id: 'mel-q15',
        category: '📖 Pemahaman',
        questionText: '"Rajin belajar, pandai bertanya" 是什么意思？',
        options: [
          '懒惰学习', 
          '勤劳学习，喜欢提问', 
          '不喜欢问问题', 
          '学习没用'
        ],
        correctIndex: 1,
        explanation: '🧠 "Rajin belajar, pandai bertanya" 意思是 "勤劳学习，善于提问"。好学生要多问为什么！',
        sourceReference: '📖 马来文课本 六年级上册 第10页'
      },
      {
        id: 'mel-q16',
        category: '✍️ Karangan',
        questionText: '写日记的结尾可以用什么？',
        options: [
          'Sekian, terima kasih.', 
          'Yang benar,', 
          'Itulah ceritaku hari ini.', 
          '以上都可以'
        ],
        correctIndex: 3,
        explanation: '📔 写日记结尾可以用 "Sekian, terima kasih" (完毕，谢谢) 或 "Itulah ceritaku hari ini" (这就是我今天的经历)。',
        sourceReference: '📖 马来文课本 六年级下册 第8页'
      }
    ]
  }
];