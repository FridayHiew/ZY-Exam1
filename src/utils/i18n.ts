// i18n.ts - 完整版，適合小學生的友好翻譯
import { LanguageCode } from '../types';

export const TRANSLATIONS = {
  en: {
    // App Name & Slogan
    appName: '⭐ YiGa Learning',
    sloganCn: '化繁為易，閣藏萬象',
    sloganEn: 'Learn smart, have fun!',
    
    // Navigation
    dashboard: '🏠 Home',
    library: '📚 My Books',
    import: '📥 Add Book',
    analytics: '📊 My Progress',
    settings: '⚙️ Settings',
    adminGenerator: '🔑 License Tool',
    backupRestore: '💾 Backup & Restore',
    profile: '👤 My Profile',
    
    // License
    activeLicense: '✅ License Active',
    licenseExpired: '⏰ License Expired',
    gracePeriod: '🕐 7-Day Grace Period',
    activateLicense: '🔓 Activate License',
    deviceId: '📱 Device ID',
    licenseType: '📋 License Type',
    expiresOn: '📅 Expires On',
    daysLeft: 'days left',
    
    // Dashboard Stats
    totalCollections: '📚 Books',
    totalQuestions: '❓ Questions',
    questionsAnswered: '✅ Answered',
    overallAccuracy: '🎯 Accuracy',
    streak: '🔥 Streak',
    days: 'days',
    
    // Quick Actions
    quickStartPractice: '🚀 Start Learning!',
    startExam: '📝 Take Quiz',
    weakTopicsRecommendation: '💪 Practice Weak Spots',
    practiceWeakTopics: '🎯 Practice',
    noWeakTopics: '🌟 Amazing! You\'re doing great in all subjects!',
    
    // Welcome
    welcomeBack: '👋 Welcome back',
    activeLearner: '🌟 Super Learner',
    streakDays: 'day streak',
    readyDailyTraining: 'Ready to learn something new today? 🎉',
    
    // Activity
    recentActivity: '📝 Your Recent Quizzes',
    noActivity: '🎮 No quizzes yet. Start your first adventure!',
    
    // Library
    createNewCollection: '➕ New Book',
    importPackage: '📥 Add Book',
    
    // Quiz Modes
    practiceMode: '🎯 Practice',
    examMode: '📝 Quiz',
    mistakeReviewMode: '🔄 Review Mistakes',
    weakTopicTraining: '💪 Weak Spots',
    
    // Quiz Controls
    submitExam: '🎯 Submit',
    nextQuestion: '➡️ Next',
    previousQuestion: '⬅️ Back',
    questionExplanation: '💡 Explanation',
    
    // Results
    passed: '🌟 PASSED!',
    failed: '💪 Keep Going!',
    passMark: '🎯 Pass Mark',
    score: '⭐ Score',
    timeSpent: '⏱️ Time',
    reviewAnswers: '📖 Review Answers',
    retryQuiz: '🔄 Try Again',
    
    // Security
    enterPin: '🔐 Enter 4-Digit PIN',
    unlockApp: '🔓 Unlock',
    incorrectPin: '❌ Wrong PIN! Try again.',
    
    // Theme
    lightMode: '☀️ Light',
    darkMode: '🌙 Dark',
    systemMode: '💻 Auto',
    language: '🌐 Language',
    theme: '🎨 Theme',
    fontSize: '📏 Text Size',
    appLock: '🔒 App Lock',
    
    // Backup
    exportBackup: '💾 Save Backup',
    restoreBackup: '📂 Restore Backup',
    clearData: '🗑️ Reset All',
    
    // Admin License Generator
    adminTool: '🔑 Admin Tool',
    licenseGenerator: '🔐 License Generator',
    generateSignedKeys: 'Create signed license keys for learners',
    targetDeviceId: '📱 Device ID *',
    myDevice: '📱 Mine',
    licenseTypeLabel: '📋 License Type',
    userLicense: '👤 User',
    adminLicense: '🛡️ Admin',
    vipLicense: '⭐ VIP',
    validityDuration: '📅 Duration',
    months: 'months',
    holderName: '📝 Name / Organization',
    signGenerate: '🔑 Generate License',
    copyKey: '📋 Copy Key',
    keyCopied: '✅ Copied!',
    generatedOutput: '📋 License Key',
    noKeyGenerated: 'Fill in the form and click generate! ✨',
    auditRecords: '📜 License History',
    noRecords: '📭 No licenses generated yet.',
    licenseId: 'ID',
    targetDevice: 'Device',
    type: 'Type',
    expires: 'Expires',
    action: 'Action',
    copy: '📋 Copy',
    
    // License Activation
    licenseActivation: '🔑 Activate License',
    licenseDesc: 'Enter your license key to unlock all features!',
    uniqueDeviceID: '📱 Your Device ID',
    provideDeviceID: 'Give this to your teacher or admin to get a license key.',
    enterLicenseKey: '🔑 Enter License Key',
    pasteLicenseKey: 'Paste your license key here...',
    verifyActivate: '✅ Activate Now',
    deleteLicense: '🗑️ Remove License',
    licenseActive: '✅ Active',
    holder: '👤 Holder',
    status: '📊 Status',
    fullyActive: '✅ Fully Active',
    enterKeyError: 'Please enter a license key!',
    invalidKeyError: '❌ Invalid license key. Please check and try again.',
    expiredKeyError: '⏰ License has expired.',
    activateSuccess: '🎉 License activated successfully!',
    deactivateConfirm: 'Are you sure you want to remove your license?',
    confirmResetTitle: '⚠️ Reset All Data?',
    confirmResetDesc: 'This will delete all your books, quizzes, and progress. Are you sure? This cannot be undone!',
    yesReset: '✅ Yes, Reset',
    cancel: '❌ Cancel',
    resetSuccess: '✨ Reset complete! Time to start fresh!',
    licenseRequired: '🔑 License Required',
    licenseRequiredDesc: 'This feature needs a license. Ask your teacher for help!',
    activateNow: '🔓 Activate Now',
  },
  
  ms: {
    // App Name & Slogan
    appName: '⭐ YiGa Pembelajaran',
    sloganCn: '化繁為易，閣藏萬象',
    sloganEn: 'Belajar dengan bijak, berseronok!',
    
    // Navigation
    dashboard: '🏠 Utama',
    library: '📚 Buku Saya',
    import: '📥 Tambah Buku',
    analytics: '📊 Kemajuan Saya',
    settings: '⚙️ Tetapan',
    adminGenerator: '🔑 Alat Lesen',
    backupRestore: '💾 Sandaran & Pulih',
    profile: '👤 Profil Saya',
    
    // License
    activeLicense: '✅ Lesen Aktif',
    licenseExpired: '⏰ Lesen Tamat',
    gracePeriod: '🕐 Tempoh Ihsan 7 Hari',
    activateLicense: '🔓 Aktifkan Lesen',
    deviceId: '📱 ID Peranti',
    licenseType: '📋 Jenis Lesen',
    expiresOn: '📅 Tarikh Tamat',
    daysLeft: 'hari berbaki',
    
    // Dashboard Stats
    totalCollections: '📚 Buku',
    totalQuestions: '❓ Soalan',
    questionsAnswered: '✅ Dijawab',
    overallAccuracy: '🎯 Ketepatan',
    streak: '🔥 Rekod',
    days: 'hari',
    
    // Quick Actions
    quickStartPractice: '🚀 Mula Belajar!',
    startExam: '📝 Buat Kuiz',
    weakTopicsRecommendation: '💪 Latih Topik Lemah',
    practiceWeakTopics: '🎯 Latih',
    noWeakTopics: '🌟 Hebat! Anda mahir dalam semua topik!',
    
    // Welcome
    welcomeBack: '👋 Selamat kembali',
    activeLearner: '🌟 Pelajar Cemerlang',
    streakDays: 'hari berturut-turut',
    readyDailyTraining: 'Sedia untuk belajar perkara baru hari ini? 🎉',
    
    // Activity
    recentActivity: '📝 Kuiz Terkini',
    noActivity: '🎮 Tiada kuiz lagi. Mulakan pengembaraan pertama anda!',
    
    // Library
    createNewCollection: '➕ Buku Baru',
    importPackage: '📥 Tambah Buku',
    
    // Quiz Modes
    practiceMode: '🎯 Latihan',
    examMode: '📝 Kuiz',
    mistakeReviewMode: '🔄 Semak Kesilapan',
    weakTopicTraining: '💪 Topik Lemah',
    
    // Quiz Controls
    submitExam: '🎯 Hantar',
    nextQuestion: '➡️ Seterusnya',
    previousQuestion: '⬅️ Kembali',
    questionExplanation: '💡 Penerangan',
    
    // Results
    passed: '🌟 LULUS!',
    failed: '💪 Teruskan Usaha!',
    passMark: '🎯 Markah Lulus',
    score: '⭐ Markah',
    timeSpent: '⏱️ Masa',
    reviewAnswers: '📖 Semak Jawapan',
    retryQuiz: '🔄 Cuba Lagi',
    
    // Security
    enterPin: '🔐 Masukkan PIN 4-Digit',
    unlockApp: '🔓 Buka Kunci',
    incorrectPin: '❌ PIN salah! Cuba lagi.',
    
    // Theme
    lightMode: '☀️ Cerah',
    darkMode: '🌙 Gelap',
    systemMode: '💻 Auto',
    language: '🌐 Bahasa',
    theme: '🎨 Tema',
    fontSize: '📏 Saiz Teks',
    appLock: '🔒 Kunci Apl',
    
    // Backup
    exportBackup: '💾 Simpan Sandaran',
    restoreBackup: '📂 Pulih Sandaran',
    clearData: '🗑️ Set Semula',
    
    // Admin License Generator
    adminTool: '🔑 Alat Admin',
    licenseGenerator: '🔐 Penjana Lesen',
    generateSignedKeys: 'Cipta kunci lesen untuk pelajar',
    targetDeviceId: '📱 ID Peranti *',
    myDevice: '📱 Peranti Saya',
    licenseTypeLabel: '📋 Jenis Lesen',
    userLicense: '👤 Pengguna',
    adminLicense: '🛡️ Admin',
    vipLicense: '⭐ VIP',
    validityDuration: '📅 Tempoh',
    months: 'bulan',
    holderName: '📝 Nama / Organisasi',
    signGenerate: '🔑 Jana Lesen',
    copyKey: '📋 Salin Kunci',
    keyCopied: '✅ Disalin!',
    generatedOutput: '📋 Kunci Lesen',
    noKeyGenerated: 'Isi borang dan klik jana! ✨',
    auditRecords: '📜 Sejarah Lesen',
    noRecords: '📭 Tiada lesen dijana lagi.',
    licenseId: 'ID',
    targetDevice: 'Peranti',
    type: 'Jenis',
    expires: 'Tamat',
    action: 'Tindakan',
    copy: '📋 Salin',
    
    // License Activation
    licenseActivation: '🔑 Aktifkan Lesen',
    licenseDesc: 'Masukkan kunci lesen untuk buka semua ciri!',
    uniqueDeviceID: '📱 ID Peranti Anda',
    provideDeviceID: 'Berikan ini kepada guru atau admin untuk dapatkan kunci lesen.',
    enterLicenseKey: '🔑 Masukkan Kunci Lesen',
    pasteLicenseKey: 'Tampal kunci lesen di sini...',
    verifyActivate: '✅ Aktifkan Sekarang',
    deleteLicense: '🗑️ Buang Lesen',
    licenseActive: '✅ Aktif',
    holder: '👤 Pemegang',
    status: '📊 Status',
    fullyActive: '✅ Aktif Sepenuhnya',
    enterKeyError: 'Sila masukkan kunci lesen!',
    invalidKeyError: '❌ Kunci lesen tidak sah. Sila semak dan cuba lagi.',
    expiredKeyError: '⏰ Lesen telah tamat tempoh.',
    activateSuccess: '🎉 Lesen berjaya diaktifkan!',
    deactivateConfirm: 'Adakah anda pasti mahu buang lesen ini?',
    confirmResetTitle: '⚠️ Set Semula Semua Data?',
    confirmResetDesc: 'Ini akan memadam semua buku, kuiz, dan kemajuan. Anda pasti? Tindakan ini tidak boleh dibatalkan!',
    yesReset: '✅ Ya, Set Semula',
    cancel: '❌ Batal',
    resetSuccess: '✨ Set semula selesai! Masa untuk mulakan semula!',
    licenseRequired: '🔑 Lesen Diperlukan',
    licenseRequiredDesc: 'Ciri ini memerlukan lesen. Minta bantuan guru anda!',
    activateNow: '🔓 Aktifkan Sekarang',
  },
  
  zh: {
    // App Name & Slogan
    appName: '⭐ 易阁学习',
    sloganCn: '化繁為易，閣藏萬象',
    sloganEn: '快乐学习，智慧成长！',
    
    // Navigation - 导航
    dashboard: '🏠 首页',
    library: '📚 我的书本',
    import: '📥 添加书本',
    analytics: '📊 学习进度',
    settings: '⚙️ 设置',
    adminGenerator: '🔑 许可证工具',
    backupRestore: '💾 备份与恢复',
    profile: '👤 我的资料',
    
    // License - 许可证
    activeLicense: '✅ 许可证已激活',
    licenseExpired: '⏰ 许可证已过期',
    gracePeriod: '🕐 7天宽限期',
    activateLicense: '🔓 激活许可证',
    deviceId: '📱 设备编号',
    licenseType: '📋 许可证类型',
    expiresOn: '📅 到期日期',
    daysLeft: '天剩余',
    
    // Dashboard Stats - 首页统计
    totalCollections: '📚 书本数',
    totalQuestions: '❓ 题目数',
    questionsAnswered: '✅ 已答题',
    overallAccuracy: '🎯 正确率',
    streak: '🔥 连续学习',
    days: '天',
    
    // Quick Actions - 快速操作
    quickStartPractice: '🚀 开始学习！',
    startExam: '📝 做测验',
    weakTopicsRecommendation: '💪 练习薄弱点',
    practiceWeakTopics: '🎯 去练习',
    noWeakTopics: '🌟 太棒了！所有科目都掌握得很好！',
    
    // Welcome - 欢迎语
    welcomeBack: '👋 欢迎回来',
    activeLearner: '🌟 小学霸',
    streakDays: '天连续学习',
    readyDailyTraining: '今天准备好学习新知识了吗？🎉',
    
    // Activity - 活动记录
    recentActivity: '📝 最近的测验',
    noActivity: '🎮 还没有测验记录。开始你的第一次冒险吧！',
    
    // Library - 书本库
    createNewCollection: '➕ 新建书本',
    importPackage: '📥 添加书本',
    
    // Quiz Modes - 测验模式
    practiceMode: '🎯 练习模式',
    examMode: '📝 测验模式',
    mistakeReviewMode: '🔄 错题复习',
    weakTopicTraining: '💪 薄弱点训练',
    
    // Quiz Controls - 测验控制
    submitExam: '🎯 提交',
    nextQuestion: '➡️ 下一题',
    previousQuestion: '⬅️ 上一题',
    questionExplanation: '💡 解析',
    
    // Results - 结果
    passed: '🌟 通过！',
    failed: '💪 继续加油！',
    passMark: '🎯 及格线',
    score: '⭐ 得分',
    timeSpent: '⏱️ 用时',
    reviewAnswers: '📖 查看答案',
    retryQuiz: '🔄 再试一次',
    
    // Security - 安全
    enterPin: '🔐 输入4位PIN码',
    unlockApp: '🔓 解锁',
    incorrectPin: '❌ PIN码错误，请重试。',
    
    // Theme - 主题
    lightMode: '☀️ 浅色',
    darkMode: '🌙 深色',
    systemMode: '💻 自动',
    language: '🌐 语言',
    theme: '🎨 主题',
    fontSize: '📏 字体大小',
    appLock: '🔒 应用锁',
    
    // Backup - 备份
    exportBackup: '💾 保存备份',
    restoreBackup: '📂 恢复备份',
    clearData: '🗑️ 重置所有',
    
    // Admin License Generator - 管理员许可证生成器
    adminTool: '🔑 管理员工具',
    licenseGenerator: '🔐 许可证生成器',
    generateSignedKeys: '为学习者生成签名许可证密钥',
    targetDeviceId: '📱 设备编号 *',
    myDevice: '📱 我的设备',
    licenseTypeLabel: '📋 许可证类型',
    userLicense: '👤 用户',
    adminLicense: '🛡️ 管理员',
    vipLicense: '⭐ VIP',
    validityDuration: '📅 有效期',
    months: '个月',
    holderName: '📝 姓名/组织',
    signGenerate: '🔑 生成许可证',
    copyKey: '📋 复制密钥',
    keyCopied: '✅ 已复制！',
    generatedOutput: '📋 许可证密钥',
    noKeyGenerated: '填写表单并点击生成！✨',
    auditRecords: '📜 许可证历史',
    noRecords: '📭 还没有生成许可证。',
    licenseId: '编号',
    targetDevice: '设备',
    type: '类型',
    expires: '到期',
    action: '操作',
    copy: '📋 复制',
    
    // License Activation - 许可证激活
    licenseActivation: '🔑 激活许可证',
    licenseDesc: '输入许可证密钥解锁所有功能！',
    uniqueDeviceID: '📱 您的设备编号',
    provideDeviceID: '将此编号提供给老师或管理员获取许可证密钥。',
    enterLicenseKey: '🔑 输入许可证密钥',
    pasteLicenseKey: '在此粘贴许可证密钥...',
    verifyActivate: '✅ 立即激活',
    deleteLicense: '🗑️ 移除许可证',
    licenseActive: '✅ 已激活',
    holder: '👤 持有人',
    status: '📊 状态',
    fullyActive: '✅ 完全激活',
    enterKeyError: '请输入许可证密钥！',
    invalidKeyError: '❌ 许可证密钥无效，请检查后重试。',
    expiredKeyError: '⏰ 许可证已过期。',
    activateSuccess: '🎉 许可证激活成功！',
    deactivateConfirm: '确定要移除许可证吗？',
    confirmResetTitle: '⚠️ 重置所有数据？',
    confirmResetDesc: '这将删除所有书本、测验和进度记录。确定吗？此操作不可撤销！',
    yesReset: '✅ 确定重置',
    cancel: '❌ 取消',
    resetSuccess: '✨ 重置完成！重新开始吧！',
    licenseRequired: '🔑 需要许可证',
    licenseRequiredDesc: '此功能需要许可证，请向老师求助！',
    activateNow: '🔓 立即激活',
  },
};

export function getTranslation(lang: LanguageCode, key: keyof typeof TRANSLATIONS.en): string {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return dict[key] || TRANSLATIONS.en[key] || key;
}