// BackupRestoreView.tsx - Kid-Friendly Version
import React, { useState } from 'react';
import JSZip from 'jszip';
import { AppStorageState, KnowledgeCollection, QuizResult } from '../types';
import { saveAppState } from '../utils/storage';
import { getTranslation } from '../utils/i18n';
import { HardDriveDownload, Download, UploadCloud, ShieldCheck, AlertTriangle, CheckCircle2, FileJson, Sparkles } from 'lucide-react';

interface BackupRestoreViewProps {
  appState: AppStorageState;
  onRestoreState: (newState: AppStorageState) => void;
}

export const BackupRestoreView: React.FC<BackupRestoreViewProps> = ({
  appState,
  onRestoreState,
}) => {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const lang = appState.settings.language;

  const handleExportBackup = async () => {
    try {
      const backupData = {
        version: 1,
        exportedAt: new Date().toISOString(),
        deviceId: appState.deviceId,
        profile: appState.profile,
        settings: appState.settings,
        collections: appState.collections,
        quizResults: appState.quizResults,
        currentStreak: appState.currentStreak,
      };

      const zip = new JSZip();
      zip.file('backup_data.json', JSON.stringify(backupData, null, 2));

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `my_learning_backup_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSuccessMsg('🎉 Your learning backup was saved successfully!');
    } catch (e: any) {
      setErrorMsg(`Oops! Couldn't create backup: ${e.message}`);
    }
  };

  const handleRestoreBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      let backupData: any = null;

      if (file.name.endsWith('.zip')) {
        const zip = await JSZip.loadAsync(await file.arrayBuffer());
        const jsonEntry = zip.file('backup_data.json');
        if (!jsonEntry) throw new Error('Invalid backup file!');
        const text = await jsonEntry.async('text');
        backupData = JSON.parse(text);
      } else if (file.name.endsWith('.json')) {
        const text = await file.text();
        backupData = JSON.parse(text);
      } else {
        throw new Error('Please upload a .zip or .json file!');
      }

      if (!backupData || !backupData.collections || !Array.isArray(backupData.collections)) {
        throw new Error('This file doesn\'t look like a valid backup.');
      }

      const restoredState: AppStorageState = {
        ...appState,
        profile: backupData.profile || appState.profile,
        settings: backupData.settings || appState.settings,
        collections: backupData.collections,
        quizResults: backupData.quizResults || [],
        currentStreak: backupData.currentStreak || 0,
      };

      saveAppState(restoredState);
      onRestoreState(restoredState);

      setSuccessMsg(
        `🎉 Restored successfully! ${backupData.collections.length} books and ${backupData.quizResults?.length || 0} quiz records loaded!`
      );
      window.scrollTo(0, 0);
    } catch (e: any) {
      setErrorMsg(`❌ Restore failed: ${e.message}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <span className="text-4xl">💾</span>
        <div>
          <h2 className="text-2xl font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
            Backup & Restore
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Keep your learning progress safe!
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-300 dark:border-green-700 rounded-2xl flex items-center gap-3 text-green-800 dark:text-green-200 font-bold">
          <span className="text-2xl">✅</span>
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 border-2 border-red-300 dark:border-red-700 rounded-2xl flex items-center gap-3 text-red-800 dark:text-red-200 font-bold">
          <span className="text-2xl">❌</span>
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export */}
        <div className="p-6 bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm text-center">
          <div className="text-6xl mb-4">📤</div>
          <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA] mb-2">
            Save Backup
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Download a copy of all your books and progress!
          </p>
          <button
            onClick={handleExportBackup}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>💾 Download Backup</span>
          </button>
        </div>

        {/* Restore */}
        <div className="p-6 bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm text-center">
          <div className="text-6xl mb-4">📥</div>
          <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA] mb-2">
            Restore Backup
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Load a previously saved backup file!
          </p>
          <label className="w-full py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer">
            <UploadCloud className="w-4 h-4" />
            <span>📂 Choose Backup File</span>
            <input
              type="file"
              accept=".zip,.json"
              onChange={handleRestoreBackup}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div className="text-sm text-blue-700 dark:text-blue-300">
          <span className="font-bold">Tip:</span> Save a backup regularly to protect your hard work!
          Your backup includes all your books, questions, quiz history, and settings.
        </div>
      </div>
    </div>
  );
};