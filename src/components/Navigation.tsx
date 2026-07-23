// Navigation.tsx - 使用 Emoji 圖標版本 (更活潑)
import React from 'react';
import { AppSettings } from '../types';
import { getTranslation } from '../utils/i18n';
import { Lock } from 'lucide-react';

export type TabType = 'dashboard' | 'library' | 'import' | 'analytics' | 'backup' | 'admin' | 'settings' | 'license';

interface NavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isAdmin: boolean;
  settings: AppSettings;
  hasValidLicense: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  isAdmin,
  settings,
  hasValidLicense,
}) => {
  const lang = settings.language;

  // 使用 Emoji 作為圖標 - 更適合學生
  const navItems = [
    { 
      id: 'dashboard' as TabType, 
      label: getTranslation(lang, 'dashboard'), 
      icon: '🏠',
      emojiSize: 'text-lg',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
    { 
      id: 'library' as TabType, 
      label: getTranslation(lang, 'library'), 
      icon: '📚',
      emojiSize: 'text-lg',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
    },
    { 
      id: 'import' as TabType, 
      label: getTranslation(lang, 'import'), 
      icon: '📥',
      emojiSize: 'text-lg',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
      isLocked: !hasValidLicense 
    },
    { 
      id: 'analytics' as TabType, 
      label: getTranslation(lang, 'analytics'), 
      icon: '🏆',
      emojiSize: 'text-lg',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
    },
    { 
      id: 'backup' as TabType, 
      label: getTranslation(lang, 'backupRestore'), 
      icon: '💾',
      emojiSize: 'text-lg',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
      isLocked: !hasValidLicense 
    },
    ...(isAdmin ? [{ 
      id: 'admin' as TabType, 
      label: getTranslation(lang, 'adminGenerator'), 
      icon: '🔑',
      emojiSize: 'text-lg',
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950/30',
    }] : []),
    { 
      id: 'settings' as TabType, 
      label: getTranslation(lang, 'settings'), 
      icon: '⚙️',
      emojiSize: 'text-lg',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50 dark:bg-gray-800/30',
    },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-[#F5F2EA] dark:bg-[#242824] border-b border-[#E8E2D2] dark:border-[#353B35] transition-colors sticky top-[61px] z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all touch-manipulation min-h-[40px] ${
                    isActive
                      ? `${item.bgColor} ${item.color} shadow-sm ring-2 ring-offset-1 ring-${item.color.split('-')[1]}-300/50`
                      : 'text-[#7C776B] dark:text-[#A09886] hover:text-[#2D2A26] dark:hover:text-[#F5F2EA] hover:bg-[#EAE5D8] dark:hover:bg-[#2D322D]'
                  }`}
                >
                  <span className={`${item.emojiSize} transition-transform duration-200 ${isActive ? 'scale-125' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  <span className={isActive ? 'font-bold' : ''}>{item.label}</span>
                  {item.isLocked && <Lock className="w-3 h-3 text-rose-500/80 dark:text-rose-400/80 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#1C1E1C]/95 backdrop-blur-md border-t border-[#E8E2D2] dark:border-[#353B35] pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 px-2 shadow-lg transition-colors">
        <div className="flex items-center justify-around gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`group relative flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all min-h-[56px] min-w-[56px] flex-shrink-0 touch-manipulation ${
                  isActive
                    ? `${item.bgColor} scale-105`
                    : 'hover:bg-[#F5F2EA] dark:hover:bg-[#2D322D]'
                }`}
              >
                <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? `${item.bgColor} ${item.color} scale-110 shadow-sm` 
                    : 'group-hover:scale-110'
                }`}>
                  <span className={`${item.emojiSize} ${isActive ? item.color : ''}`}>
                    {item.icon}
                  </span>
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white dark:border-[#1C1E1C] animate-bounce" />
                  )}
                </div>
                <span className={`text-[10px] tracking-tight leading-tight mt-0.5 whitespace-nowrap text-center transition-colors ${
                  isActive 
                    ? `font-bold ${item.color}` 
                    : 'text-[#7C776B] dark:text-[#A09886]'
                }`}>
                  {item.label}
                </span>
                {item.isLocked && (
                  <div className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white rounded-full p-0.5 border-2 border-white dark:border-[#1C1E1C] shadow-sm">
                    <Lock className="w-2.5 h-2.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};