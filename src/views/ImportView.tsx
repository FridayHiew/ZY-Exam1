// ImportView.tsx - Kid-Friendly Version
import React, { useState } from 'react';
import { AppStorageState, KnowledgeCollection, ValidationReport } from '../types';
import { parseJSONImport, parseZIPImport } from '../utils/importer';
import { downloadSampleJSONTemplate } from '../utils/exporter';
import { getTranslation } from '../utils/i18n';
import { UploadCloud, FileCode, CheckCircle2, Sparkles, Copy, Check, Paperclip, Rocket } from 'lucide-react';

interface ImportViewProps {
  appState: AppStorageState;
  onUpdateCollections: (collections: KnowledgeCollection[]) => void;
  onNavigateTab: (tab: any) => void;
}

export const ImportView: React.FC<ImportViewProps> = ({
  appState,
  onUpdateCollections,
  onNavigateTab,
}) => {
  const { collections, settings } = appState;
  const lang = settings.language;

  const [report, setReport] = useState<ValidationReport | null>(null);
  const [conflictStrategy, setConflictStrategy] = useState<'SKIP' | 'OVERWRITE' | 'IMPORT_NEW'>('IMPORT_NEW');
  const [isProcessing, setIsProcessing] = useState(false);
  const [importSuccessMsg, setImportSuccessMsg] = useState<string | null>(null);
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState<'beginner' | 'intermediate' | 'master'>('beginner');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const getPromptText = (level: 'beginner' | 'intermediate' | 'master') => {
    // ... same prompt logic but simplified for kids
    return `Please create a fun learning quiz in JSON format for kids about this topic. Make it easy to understand with simple words!`;
  };

  const aiPromptText = getPromptText(selectedDifficultyLevel);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(aiPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setReport(null);
    setImportSuccessMsg(null);

    try {
      const filename = file.name.toLowerCase();
      let res: ValidationReport;

      if (filename.endsWith('.json')) {
        const text = await file.text();
        res = await parseJSONImport(text);
      } else if (filename.endsWith('.zip')) {
        const buffer = await file.arrayBuffer();
        res = await parseZIPImport(buffer);
      } else {
        alert('Please upload a .json or .zip file!');
        setIsProcessing(false);
        return;
      }

      setReport(res);
    } catch (err: any) {
      alert(`Oops! Something went wrong: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmImport = () => {
    if (!report || !report.isValid || report.extractedQuestions.length === 0) return;

    const colName = report.collectionName || 'My New Book';
    const existingIndex = collections.findIndex((c) => c.name.toLowerCase() === colName.toLowerCase());

    let updatedCollections = [...collections];

    if (existingIndex >= 0 && conflictStrategy === 'SKIP') {
      alert(`"${colName}" already exists! Skipping import.`);
      return;
    } else if (existingIndex >= 0 && conflictStrategy === 'OVERWRITE') {
      updatedCollections[existingIndex] = {
        ...updatedCollections[existingIndex],
        description: report.collectionDescription || updatedCollections[existingIndex].description,
        group: report.collectionGroup || updatedCollections[existingIndex].group || 'General',
        difficulty: report.collectionDifficulty || updatedCollections[existingIndex].difficulty || 'Master',
        updatedAt: new Date().toISOString(),
        questionCount: report.extractedQuestions.length,
        questions: report.extractedQuestions,
        categories: Array.from(new Set(report.extractedQuestions.map((q) => q.category))),
      };
    } else {
      const finalName = existingIndex >= 0 ? `${colName} (${new Date().toLocaleTimeString()})` : colName;
      const newCollection: KnowledgeCollection = {
        id: `col_${Date.now()}`,
        name: finalName,
        description: report.collectionDescription || `📚 ${report.extractedQuestions.length} fun questions!`,
        group: report.collectionGroup || 'General',
        difficulty: report.collectionDifficulty || 'Beginner',
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        questionCount: report.extractedQuestions.length,
        categories: Array.from(new Set(report.extractedQuestions.map((q) => q.category))),
        questions: report.extractedQuestions,
      };
      updatedCollections.push(newCollection);
    }

    onUpdateCollections(updatedCollections);
    setImportSuccessMsg(`🎉 Success! Added ${report.extractedQuestions.length} questions to "${colName}"!`);
    setReport(null);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <span className="text-4xl">📥</span>
        <div>
          <h2 className="text-2xl font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
            Add New Book
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upload a JSON or ZIP file to add fun questions!
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-3 border-dashed border-blue-300 dark:border-blue-700 rounded-3xl text-center hover:border-blue-500 transition-colors">
        <div className="text-6xl mb-4">📤</div>
        <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA] mb-2">
          Drop your file here!
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Supports <span className="font-bold text-blue-600 dark:text-blue-400">.json</span> or{' '}
          <span className="font-bold text-blue-600 dark:text-blue-400">.zip</span> files
        </p>

        <label className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform cursor-pointer">
          <UploadCloud className="w-5 h-5" />
          <span>📂 Choose File</span>
          <input
            type="file"
            accept=".json,.zip"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Import Preview */}
      {report && (
        <div className="p-6 bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">📖</span>
                <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
                  {report.collectionName || 'New Book'}
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {report.extractedQuestions.length} questions found
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              report.isValid
                ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
            }`}>
              {report.isValid ? '✅ Valid' : '❌ Issues'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{report.totalRows}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{report.validRows}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">✅ Good</div>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-xl text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{report.invalidRows}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">⚠️ Issues</div>
            </div>
          </div>

          {report.errors.length > 0 && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-300 mb-4">
              <span className="font-bold">⚠️ Fix these issues:</span>
              {report.errors.map((err, idx) => (
                <p key={idx} className="text-xs mt-1">
                  • Row {err.row}: {err.message}
                </p>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500 dark:text-gray-400">If book exists:</span>
              <div className="flex gap-1">
                {[
                  { id: 'IMPORT_NEW', label: '➕ New' },
                  { id: 'OVERWRITE', label: '🔄 Overwrite' },
                  { id: 'SKIP', label: '⏭️ Skip' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setConflictStrategy(opt.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      conflictStrategy === opt.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setReport(null)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!report.isValid || report.extractedQuestions.length === 0}
                onClick={handleConfirmImport}
                className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white font-bold rounded-xl text-sm shadow-md hover:scale-105 transition-transform disabled:opacity-50"
              >
                📥 Import Book!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Helper */}
      <div className="p-6 bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🤖</span>
          <div>
            <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
              AI Helper
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ask AI to create questions for you!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {(['beginner', 'intermediate', 'master'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedDifficultyLevel(lvl)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedDifficultyLevel === lvl
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {lvl === 'beginner' ? '🌱 Easy' : lvl === 'intermediate' ? '🌿 Medium' : '🌳 Hard'}
            </button>
          ))}
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-mono text-gray-600 dark:text-gray-400 max-h-40 overflow-y-auto mb-4">
          {aiPromptText}
        </div>

        <button
          onClick={handleCopyPrompt}
          className={`w-full py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            copiedPrompt
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105'
          }`}
        >
          {copiedPrompt ? (
            <>
              <Check className="w-5 h-5" /> ✅ Copied!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" /> 📋 Copy Prompt
            </>
          )}
        </button>
      </div>

      {/* Success Message */}
      {importSuccessMsg && (
        <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-300 dark:border-green-700 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <p className="font-bold text-green-800 dark:text-green-200">
              {importSuccessMsg}
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('library')}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-sm transition-colors"
          >
            📚 See My Books
          </button>
        </div>
      )}

      {/* Template Download */}
      <div className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📝</span>
          <div>
            <h4 className="font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
              Need a template?
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Download a sample JSON file to get started!
            </p>
          </div>
        </div>
        <button
          onClick={downloadSampleJSONTemplate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform"
        >
          <FileCode className="w-4 h-4" />
          <span>📄 Download Template</span>
        </button>
      </div>
    </div>
  );
};