// SettingsView.tsx - Kid-Friendly Version
import React, { useState, useEffect } from 'react';
import { AppSettings, AppStorageState, LanguageCode } from '../types';
import { getTranslation } from '../utils/i18n';
import { getStorageUsageInfo } from '../utils/indexedDB';
import { Settings, Globe, Moon, Sun, Type, Lock, ShieldCheck, Trash2, Key, HardDrive, Database, FileCode, Smile, Sparkles } from 'lucide-react';

interface SettingsViewProps {
  appState: AppStorageState;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onOpenLicenseModal: () => void;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  appState,
  onUpdateSettings,
  onOpenLicenseModal,
  onResetData,
}) => {
  const { settings, license } = appState;
  const lang = settings.language;

  const [pinInput, setPinInput] = useState(settings.pinCode || '1234');
  const [storageInfo, setStorageInfo] = useState<{ usageMB: string; quotaMB: string; isIndexedDBSupported: boolean }>({
    usageMB: '0.00',
    quotaMB: 'Calculated by browser',
    isIndexedDBSupported: true,
  });
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetCompleted, setResetCompleted] = useState(false);

  useEffect(() => {
    getStorageUsageInfo().then(setStorageInfo);
  }, [appState]);

  const handleToggleSecurity = () => {
    if (!settings.securityEnabled) {
      const newPin = prompt('Set a 4-digit secret code:', '1234');
      if (newPin && newPin.length === 4) {
        onUpdateSettings({ securityEnabled: true, pinCode: newPin });
      }
    } else {
      onUpdateSettings({ securityEnabled: false });
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <span className="text-4xl">⚙️</span>
        <div>
          <h2 className="text-2xl font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
            Settings
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customize your learning experience!
          </p>
        </div>
      </div>

      {/* License - Kid Friendly */}
      <div className="p-5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-200 dark:border-purple-800 rounded-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔑</span>
          <div>
            <h3 className="font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
              License Status
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {license?.payload.licenseType || 'Standard'} • {license?.daysRemaining || 0} days left
            </p>
          </div>
        </div>
        <button
          onClick={onOpenLicenseModal}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform"
        >
          Manage
        </button>
      </div>

      {/* Language & Theme */}
      <div className="p-5 bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA] flex items-center gap-2">
          <span>🌍</span> Language & Theme
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-sm text-gray-600 dark:text-gray-400 block mb-2">
              🌐 Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => onUpdateSettings({ language: e.target.value as LanguageCode })}
              className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-[#2D2A26] dark:text-[#EAE7DF] font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="en">🇺🇸 English</option>
              <option value="zh">🇨🇳 中文</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-sm text-gray-600 dark:text-gray-400 block mb-2">
              🎨 Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateSettings({ theme: 'light' })}
                className={`py-2 rounded-xl border-2 font-bold text-sm transition-all ${
                  settings.theme === 'light'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                ☀️ Light
              </button>
              <button
                onClick={() => onUpdateSettings({ theme: 'dark' })}
                className={`py-2 rounded-xl border-2 font-bold text-sm transition-all ${
                  settings.theme === 'dark'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                🌙 Dark
              </button>
              <button
                onClick={() => onUpdateSettings({ theme: 'system' })}
                className={`py-2 rounded-xl border-2 font-bold text-sm transition-all ${
                  settings.theme === 'system'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                💻 Auto
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="font-bold text-sm text-gray-600 dark:text-gray-400 block mb-2">
            📏 Text Size
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => onUpdateSettings({ fontSize: size })}
                className={`py-2 rounded-xl border-2 font-bold text-sm transition-all ${
                  settings.fontSize === size
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {size === 'small' ? '🔍 Small' : size === 'medium' ? '📝 Medium' : '📖 Large'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Security - Kid Friendly */}
      <div className="p-5 bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
        <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA] flex items-center gap-2 mb-4">
          <span>🔒</span> App Lock
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-[#2D2A26] dark:text-[#EAE7DF]">
              PIN Code Lock
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {settings.securityEnabled 
                ? `🔐 Locked (PIN: ${settings.pinCode || '1234'})` 
                : '🔓 Unlocked'}
            </div>
          </div>
          <button
            onClick={handleToggleSecurity}
            className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              settings.securityEnabled
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gradient-to-r from-green-400 to-green-500 text-white hover:scale-105'
            }`}
          >
            {settings.securityEnabled ? '🔓 Unlock' : '🔒 Lock'}
          </button>
        </div>
      </div>

      {/* Storage */}
      <div className="p-5 bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
        <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA] flex items-center gap-2 mb-4">
          <span>💾</span> Storage
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="text-sm text-gray-500 dark:text-gray-400">Used</div>
            <div className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
              {storageInfo.usageMB} MB
            </div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="text-sm text-gray-500 dark:text-gray-400">Books</div>
            <div className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
              {appState.collections.length}
            </div>
          </div>
        </div>
      </div>

      {/* Reset - Kid Friendly */}
      <div className="p-5 bg-white dark:bg-[#242824] border-2 border-red-200 dark:border-red-800 rounded-2xl shadow-sm">
        <h3 className="text-lg font-bold text-red-600 dark:text-red-400 flex items-center gap-2 mb-4">
          <span>⚠️</span> Danger Zone
        </h3>

        {!showResetConfirm ? (
          <button
            onClick={() => {
              setResetCompleted(false);
              setShowResetConfirm(true);
            }}
            className="px-5 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl text-sm transition-colors"
          >
            🗑️ Reset All Data
          </button>
        ) : (
          <div className="space-y-3">
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-300">
              ⚠️ Are you sure? This will delete all your books and progress!
            </div>
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  await onResetData();
                  setShowResetConfirm(false);
                  setResetCompleted(true);
                  setTimeout(() => setResetCompleted(false), 5000);
                }}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl text-sm transition-colors"
              >
                ✅ Yes, Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-2xl text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        )}

        {resetCompleted && (
          <div className="mt-3 p-3 bg-green-100 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700 rounded-xl text-green-700 dark:text-green-300 font-bold animate-pulse">
            ✅ Reset complete! Time to start fresh! 🌱
          </div>
        )}
      </div>
    </div>
  );
};