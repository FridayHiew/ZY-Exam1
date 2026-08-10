# Offline Knowledge Training Platform (Yiga Learning App) — Reference Blueprint

This document provides a comprehensive, production-ready system blueprint, architectural mapping, and codebase specification for the **Yiga Learning App (Offline Knowledge Training Platform)**. Use this specification to replicate, extend, or generate a highly cohesive, identical application using Gemini, Claude, or any advanced AI coding assistant.

---

## 1. Executive Concept & Capabilities

The **Yiga Learning App** is a highly optimized, single-page full-suite application built for offline-first, client-side educational learning, quizzing, and question collection management. It bridges standard primary school curriculums (e.g., KSSR Malaysian primary school syllabus) with professional-level exam preparation through rich, adaptive game loops, comprehensive visual analytics, secure licenses, and multi-format dataset migration.

### Core Strengths:
*   **100% Offline-First Architecture**: Functions entirely in the browser using localized client-side APIs (IndexedDB, LocalStorage, Web Audio API, URL-blob synthesis) without requiring a central database server.
*   **Dual-Layer Data Store**: Combines `IndexedDB` for high-capacity question collections and binary assets with `LocalStorage` for configuration keys, profiles, and analytics.
*   **Strict Multi-Format Importer / Exporter**: Parses, validates, and exports standardized `.json`, metadata comment-prefixed `.csv`, and full binary `.zip` files (containing structured manifest documents and asset folders).
*   **Pristine UI/UX Design**: Uses a responsive, mathematical spacing-guided Tailwind layout with custom animations (Framer Motion) and complete support for system-adaptive light and dark themes. No "AI-Slop" elements.
*   **Built-In Cryptographic Licensing**: Requires offline license key activations bound to a distinct client `deviceId` that can be provisioned by a secret developer administrator portal built straight into the UI.

---

## 2. Technical Stack & File Structure

The platform is designed around **React 18**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons** with **Framer Motion** for state transitions. 

```
/src
├── App.tsx                   # Central view Router, sidebar navigation & global configuration context
├── index.css                 # Master Tailwind imports and global style overrides
├── main.tsx                  # Client-side DOM initialization entry point
├── types.ts                  # Shared data structures and strictly typed model interfaces
├── assets/                   # SVG, brand icons, and local visual assets
├── components/               # Reusable atomic visual controls
│   ├── BaguaBookLogo.tsx     # Custom brand vector logo 
│   ├── ErrorBoundary.tsx     # React component catcher for crash recovery
│   ├── Header.tsx            # View header with theme switcher and active streak counter
│   ├── LicenseGate.tsx       # Core route-blocking container enforcing key checks
│   ├── LicenseRequiredPlaceholder.tsx # fallback graphics for unlicensed users
│   ├── Navigation.tsx        # High-fidelity left sidebar and bottom mobile drawer tabs
│   ├── PinLockModal.tsx      # Strict PIN protection login override modal
│   └── PWAInstallPrompt.tsx  # Dynamic toast alerting users to add the app to the home screen
├── data/                     # Optional preloaded seed collections and static assets
├── utils/                    # Core business logic algorithms and device state handlers
│   ├── analytics.ts          # Accumulators, recency-decay formulas, and trend calculators
│   ├── crypto.ts             # Device ID generation, PIN hashing, and License signing/validation
│   ├── exporter.ts           # Exporters compiling collections to JSON, comment-prefixed CSV, and JSZip files
│   ├── i18n.ts               # Complete localized dictionary mappings (en, zh, ms)
│   ├── importer.ts           # Highly-resilient files parser with row-by-row validation logs
│   ├── indexedDB.ts          # Promise-wrapped IndexedDB manager storing heavy objects
│   ├── sound.ts              # Custom Web Audio synthesizer producing crisp success/fail chirps
│   └── storage.ts            # Fast LocalStorage hooks syncing settings and metrics
└── views/                    # Multi-component view dashboards
    ├── AdminLicenseGeneratorView.tsx # Master panel to generate cryptographic device activations
    ├── AnalyticsView.tsx     # Rich D3/Recharts dashboards, streak metrics & weakness heatmaps
    ├── BackupRestoreView.tsx # DB backup exporter/restorer with structural sanity validation
    ├── DashboardView.tsx     # User landing page with summary stats, active study calendars & streaks
    ├── ImportView.tsx        # Drag-and-drop file uploader with a dynamic copyable AI prompt engine
    ├── LibraryView.tsx       # Collections search and filter portal with export/reset controls
    ├── QuizView.tsx          # Adaptive quiz controller, pronunciation synthesizers & explanations
    └── SettingsView.tsx      # Language configs, Pin locks, dark/light toggle and storage resets
```

---

## 3. Strict Database Schema & Data Models (`types.ts`)

```typescript
export type LicenseType = 'USER' | 'ADMIN' | 'VIP';

export interface LicensePayload {
  licenseId: string;
  deviceId: string;
  licenseType: LicenseType;
  issuedAt: string; // ISO date string
  expiresAt: string; // ISO date string
  version: number;
  holderName?: string;
}

export interface LicenseData {
  key: string;
  payload: LicensePayload;
  activatedAt: string;
  isValid: boolean;
  isExpired: boolean;
  isInGracePeriod: boolean;
  daysRemaining: number;
}

export interface Question {
  id: string;
  category: string;
  questionText: string;
  options: [string, string, string, string]; // Exactly 4 options: index 0=A, 1=B, 2=C, 3=D
  correctIndex: number; // Correct answer index: 0, 1, 2, or 3
  explanation?: string;
  image?: string; // Base64 Data URL or relative asset path
  difficulty?: string;
  knowledgeLevel?: string;
  questionType?: string;
  tags?: string[];
  statements?: Record<string, string>; // Nested map for additional matchings or structures
  sourceReference?: string;
}

export interface KnowledgeCollection {
  id: string;
  name: string;
  description?: string;
  group?: string;
  version: number;
  difficulty?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  questionCount: number;
  categories: string[];
  questions: Question[];
}

export type QuizMode = 'PRACTICE' | 'EXAM' | 'MISTAKE_REVIEW' | 'WEAK_TOPICS';

export interface QuizConfig {
  collectionId?: string;
  collectionName?: string;
  mode: QuizMode;
  questionCount: number;
  timeLimitMinutes?: number; // 0 or undefined for infinite/practice mode
  passMarkPercentage?: number; // default: 70%
  categoryFilter?: string;
}

export interface UserAnswerRecord {
  questionId: string;
  questionText: string;
  category: string;
  selectedOptionIndex: number;
  correctOptionIndex: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
  shuffledOptions?: string[];
  originalCorrectText?: string;
}

export interface QuizResult {
  id: string;
  collectionId?: string;
  collectionName: string;
  mode: QuizMode;
  date: string; // ISO string
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  answerRecords: UserAnswerRecord[];
}

export interface AppSettings {
  language: 'en' | 'zh' | 'ms';
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  securityEnabled: boolean;
  pinCode?: string; // 4-digit PIN hash
  dailyStudyReminder: boolean;
  reminderTime: string; // "hh:mm"
  examTimerDefaultMinutes: number;
  defaultPassMark: number;
}
```

---

## 4. Multi-Format Importer / Exporter Blueprint

A core requirement is the import/export system which supports **JSON**, **CSV** (with comments), and **ZIP** structures. This guarantees total flexibility during bulk content loading.

### 4.1 JSON Format Specification
A single valid JSON object representing the top-level collection metadata and questions:
```json
{
  "collectionName": "Kosa Kata Bahasa Melayu (KSSR)",
  "version": 1,
  "description": "Latihan ejaan dan kosa kata Bahasa Melayu Sekolah Rendah (SK & SJKC) selaras dengan KSSR.",
  "group": "Malay",
  "difficulty": "Tahun 2",
  "tags": ["kosa-kata"],
  "questions": [
    {
      "id": "ms-q001",
      "category": "Sekolah & Rumah",
      "questionText": "perpustakaan",
      "statements": {},
      "optionA": "prepustakaan",
      "optionB": "perpustakan",
      "optionC": "perpustakaan",
      "optionD": "perpustakkaan",
      "correctAnswer": "C",
      "explanation": "图书馆（Library / Perpustakaan）。Maksud: Tempat membaca dan meminjam buku. 例句：Murid-murid membaca buku di perpustakaan.（同学们在图书馆看书。）",
      "sourceReference": "Buku Teks BM Tahun 3, Unit 4",
      "imageFile": ""
    }
  ]
}
```

### 4.2 CSV Format Specification
CSV files use metadata variables declared in standard, commented `# key: value` lines preceding the main header row. This allows the single-file CSV to encapsulate both top-level metadata and tabular rows correctly.

**Expected Template Structure (`zh_exam.csv`):**
```csv
# collectionName: Kosa Kata Bahasa Melayu (KSSR)
# version: 1
# description: Latihan ejaan dan kosa kata Bahasa Melayu Sekolah Rendah (SK & SJKC) selaras dengan KSSR.
# group: Malay
# difficulty: Tahun 2
# tags: kosa-kata

ID,Category,QuestionText,Statements,OptionA,OptionB,OptionC,OptionD,CorrectAnswer,Explanation,SourceReference,ImageFile
ms-q001,Sekolah & Rumah,perpustakaan,"{}",prepustakaan,perpustakan,perpustakaan,perpustakkaan,C,"图书馆（Library / Perpustakaan）。Maksud: Tempat membaca dan meminjam buku. 例句：Murid-murid membaca buku di perpustakaan.（同学们在图书馆看书。）","Buku Teks BM Tahun 3, Unit 4",""
```

### 4.3 ZIP Package Specification
ZIP files package heavy asset databases directly. 
*   **Structure**: 
    *   `/questions.json` (or `/manifest.json`): A JSON file matches the schema in section 4.1.
    *   `/images/`: A subdirectory containing images referenced under the `"imageFile"` key in the questions list.
*   **Parsing Flow (`importer.ts`)**: 
    1.  Read the zip archive using a JSZip extractor.
    2.  Locate `/questions.json` or first `.json` file in root.
    3.  Loop through images, converting them into in-memory Blob URLs or Base64 Data URLs.
    4.  Inject the local base64/blob string directly into the corresponding question's `"image"` property before writing to IndexedDB.

### 4.4 Exporter Output Specifications
The exporter (`exporter.ts`) handles compiler tasks and downloads:
1.  **JSON Export**: Stringifies `KnowledgeCollection` with indent 2. Outputs `zh_exam.json`.
2.  **CSV Export**: Prefixes active metadata blocks as comments (`#`) on rows 1-6. Iterates questions, escapes and wraps cells inside double quotes, and joins cells with commas. Outputs `zh_exam.csv` using a UTF-8 BOM (`\uFEFF`) for broad Excel compatibility.
3.  **ZIP Export**: Compiles JSON into `questions.json`, packs binary images from IndexedDB back into an `/images` directory inside JSZip, and outputs `zh_exam.zip`.

---

## 5. Built-In Role-Based AI Prompt Engine

To enable users to dynamically create content from study materials, the application features an in-app **AI Prompt Generator** under `ImportView.tsx`. It provides copyable prompt templates designed to enforce strict schema outputs from Large Language Models (LLMs).

### Level Configs:
*   **Beginner Prompt**: Focuses on foundational vocabulary, simple concepts, direct spelling/definitions, and basic structures.
*   **Intermediate Prompt**: Focuses on procedural application, real-world scenario analysis, sentence construction, and problem-solving.
*   **Master Prompt**: Focuses on expert professional assessment, deep troubleshooting, complex case studies, and critical evaluations.

### The System Core Prompt Structure (Example):
```
Please generate a foundational, beginner-level learning collection in valid JSON format based on the attached document(s) / text provided. Focus on basic principles, definitions, and essential concepts.

Strictly output ONLY a single raw JSON object (no markdown formatting, no code block markers, no intro text) following this exact schema:

{ "collectionName": "...", "version": 1, ... }
```

---

## 6. Mathematical Analytics & Study Algorithms

### 6.1 Rolling Streaks
*   Calculates study consistency based on consecutive daily timestamps logged in LocalStorage (`lastStudyDate` and `currentStreak`).
*   Resets to 0 only when a user misses a full UTC calendar day from their latest logged session.

### 6.2 Knowledge Decay & Weak Topic Weighted Accuracy
Rather than a basic `correct / total` division, the engine computes an **exponentially decaying moving average** to represent immediate retention. Recent test trials carry higher weight than old, historical trials:
$$\text{Weighted Accuracy} = \frac{\sum_{i=1}^{n} \text{Score}_i \cdot e^{-\lambda \cdot (t_{now} - t_i)}}{\sum_{i=1}^{n} e^{-\lambda \cdot (t_{now} - t_i)}}$$
*   **Weak Area Trigger**: If a specific Category or Group has a weighted accuracy score $< 60\%$ with at least 5 trial attempts, it is flagged as a **Weak Topic** and feeds into the adaptive "Weak Topics Review" quiz builder.

---

## 7. Interactive Audio & Audio Synth Engine (`sound.ts`)

To avoid bulky external audio dependencies, the app generates rich audio feedback directly in the user's browser using the native **Web Audio API**:

```typescript
class SoundManager {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Play a crisp, rising double-tone indicating a correct answer
  playSuccess() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    
    // Quick double tone (chirp)
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Play a descending, dull low buzz indicating a wrong answer
  playFailure() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sawtooth';
    const now = this.ctx.currentTime;
    
    osc.frequency.setValueAtTime(220.00, now); // A3
    osc.frequency.linearRampToValueAtTime(110.00, now + 0.3); // A2
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.start(now);
    osc.stop(now + 0.35);
  }
}
```

---

## 8. Offline Device Licensing Engine

To govern distribution without cloud logins, the application incorporates a fully client-side cryptographic licensing structure based on a unique client signature.

### Signature Validation Process:
1.  **Device ID Creation**: Generates a persistent unique hash on first boot using combined local user profile details, viewport aspect ratios, and CPU attributes, stored securely in local storage.
2.  **Activation Code Schema**:
    *   An activation key is generated by a developer using the `AdminLicenseGeneratorView`.
    *   The admin enters a customer's Device ID, names a licensee, specifies expiration dates (e.g. 1 year out), and generates a key.
    *   The key is an obfuscated, sign-secured Base64 payload containing:
        `sha256(deviceId + secret_key + licenseType + expiresAt)`
3.  **License Verification Gate**:
    *   During runtime, the app reads the activated key.
    *   It re-computes the localized device SHA hash and compares it against the base64 signature key.
    *   If it matches and the clock is within bounds (enforced by a moving "watermark timer" to prevent clock-rewinding hacks), the app unlocks full views.
    *   If invalid or expired, a clean, high-fidelity landing graphic restricts access until a valid serial key is entered.

---

## 9. Visual Integrity & Style Mandates

The user interface of the platform is designed with mathematical precision to prevent typical "AI-Slop" elements. Ensure any future generations align with these aesthetic constraints:

*   **Warm & Modern Palette**: The system operates on a clean neutral background using soft warm grey tints (`#FDFDFB` / `#F8F6F0`) paired with sophisticated deep forest green accents (`#5A6D5B` / `#485749`) and natural slate. Avoid default blue-purple gradients, bright primary colored borders, and saturated glassmorphic highlights.
*   **Contrast Bounds**: Content panels sit on cards with subtle borders (`#E8E2D2` in light mode, `#353B35` in dark mode). Keep card borders flat and corner radius capped at a structural `12px` to `16px`. Ensure a minimum contrast ratio of 4.5:1.
*   **Dense Typographic Grid**: Use varying display hierarchy scales (at least 1.25 ratio). Pair high-contrast, structured display typefaces for key headers with readable clean, balanced body fonts. Text inside controls is styled with `white-space: nowrap` and scaled proportionately to prevent mid-word truncation or wrapping.
*   **Proportional Layouts**: Inner container gaps must follow strict grid fractions. The space between parent borders must be equal to or greater than the distance between inner children items. Nested containers are decoupled with subtle lines and balanced negative space rather than heavy drop-shadows.

---

## 10. Summary of Re-Implementation Goals

When asking an LLM or developer to replicate this application, supply this document alongside a instruction set:
1.  **Establish Types first**: Copy the exact TypeScript interfaces outlined in Section 3.
2.  **Spin up Storage Layers**: Write clean IndexedDB modules for questions and base64 assets alongside synchronous LocalStorage wrappers for settings.
3.  **Configure Importers**: Re-implement `importer.ts` with strict validation rules, throwing explicit, descriptive error rows for JSON, Zip binaries, and commented CSV layouts.
4.  **Polish the UI**: Adopt the modern, minimalist Forest/Slate layout utilizing Framer Motion transitions and fluid, responsive sidebar grids.
