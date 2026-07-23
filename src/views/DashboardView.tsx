// DashboardView.tsx - Kid-Friendly Version
import React, { useMemo } from 'react';
import { AppStorageState, QuizConfig } from '../types';
import { calculateCategoryMetrics, calculateOverallStats } from '../utils/analytics';
import { getTranslation } from '../utils/i18n';
import { getRandomQuote } from '../data/motivationalQuotes';
import { Play, Award, Flame, Target, BookOpen, AlertCircle, Sparkles, ArrowRight, CheckCircle2, Folder, Layers, Star, Trophy, Rocket, Brain, Smile } from 'lucide-react';

interface DashboardViewProps {
  appState: AppStorageState;
  onStartQuiz: (config: QuizConfig) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  appState,
  onStartQuiz,
  onNavigateTab,
}) => {
  const { collections, quizResults, settings, currentStreak } = appState;
  const lang = settings.language;

  const motivationalQuote = useMemo(() => getRandomQuote(lang), [lang]);
  const totalQuestions = collections.reduce((acc, c) => acc + c.questions.length, 0);
  const overallStats = calculateOverallStats(quizResults);

  // Kid-friendly emoji for accuracy
  const getAccuracyEmoji = (accuracy: number) => {
    if (accuracy >= 90) return '🌟';
    if (accuracy >= 70) return '⭐';
    if (accuracy >= 50) return '💪';
    return '📚';
  };

  // Kid-friendly message based on streak
  const getStreakMessage = (streak: number) => {
    if (streak >= 30) return '🏆 You\'re a Learning Champion!';
    if (streak >= 14) return '🚀 Amazing streak! Keep going!';
    if (streak >= 7) return '⭐ You\'re on fire!';
    if (streak >= 3) return '💪 Great job! Keep it up!';
    if (streak >= 1) return '🎉 You started your streak!';
    return '🌟 Start your learning streak today!';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner - Kid Friendly */}
      <div className="bg-gradient-to-br from-yellow-400 via-orange-300 to-pink-400 dark:from-yellow-600 dark:via-orange-500 dark:to-pink-600 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 text-8xl opacity-20">🌈</div>
        <div className="absolute bottom-0 left-0 text-6xl opacity-20">📚</div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">👋</span>
            <span className="text-xl font-bold">Hi, {appState.profile.displayName}!</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
              <Flame className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span className="font-bold">{currentStreak}</span>
              <span>day streak!</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span>{overallStats.totalSessions}</span>
              <span>quizzes done!</span>
            </div>
          </div>

          <p className="text-lg font-bold italic leading-relaxed">
            💭 {motivationalQuote}
          </p>
          
          <p className="text-sm mt-2 opacity-90">
            {getStreakMessage(currentStreak)}
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            {collections.length > 0 && (
              <button
                onClick={() => {
                  const col = collections[0];
                  onStartQuiz({
                    collectionId: col.id,
                    collectionName: col.name,
                    mode: 'PRACTICE',
                    questionCount: Math.min(10, col.questions.length),
                  });
                }}
                className="flex items-center gap-2 px-5 py-3 bg-white text-orange-600 font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform"
              >
                <Play className="w-5 h-5 fill-orange-600" />
                <span>▶️ Start Learning!</span>
              </button>
            )}
            <button
              onClick={() => onNavigateTab('library')}
              className="flex items-center gap-2 px-5 py-3 bg-white/20 text-white font-bold rounded-2xl text-sm hover:bg-white/30 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>📖 My Books</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fun Stats - Kid Friendly */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl shadow-sm text-center">
          <div className="text-3xl mb-1">📚</div>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {collections.length}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Book Sets</div>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl shadow-sm text-center">
          <div className="text-3xl mb-1">❓</div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">
            {totalQuestions}
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 font-medium">Questions</div>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl shadow-sm text-center">
          <div className="text-3xl mb-1">🎯</div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
            {overallStats.overallAccuracy || 0}%
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
            {getAccuracyEmoji(overallStats.overallAccuracy || 0)} Accuracy
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-2xl shadow-sm text-center">
          <div className="text-3xl mb-1">✅</div>
          <div className="text-2xl font-bold text-pink-700 dark:text-pink-300">
            {overallStats.totalQuestionsAnswered}
          </div>
          <div className="text-xs text-pink-600 dark:text-pink-400 font-medium">Answered</div>
        </div>
      </div>

      {/* Subject Groups - Kid Friendly */}
      {collections.length > 0 && (
        <div className="p-5 bg-white dark:bg-[#242824] rounded-2xl border border-[#E8E2D2] dark:border-[#353B35] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📁</span>
              <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
                Your Subjects
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('library')}
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>See All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {collections.slice(0, 6).map((col) => (
              <div
                key={col.id}
                onClick={() => {
                  onStartQuiz({
                    collectionId: col.id,
                    collectionName: col.name,
                    mode: 'PRACTICE',
                    questionCount: Math.min(10, col.questions.length),
                  });
                }}
                className="p-4 rounded-2xl border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="text-2xl mb-1">
                  {col.difficulty === 'Beginner' ? '🌱' : 
                   col.difficulty === 'Intermediate' ? '🌿' : '🌳'}
                </div>
                <div className="font-bold text-sm text-[#3E4A3E] dark:text-[#F5F2EA] truncate">
                  {col.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {col.questions.length} questions
                </div>
                <div className="mt-2 inline-block px-2 py-0.5 bg-blue-200 dark:bg-blue-800 rounded-full text-xs font-bold text-blue-700 dark:text-blue-300">
                  {col.difficulty || 'Fun'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity - Kid Friendly */}
      <div className="p-5 bg-white dark:bg-[#242824] rounded-2xl border border-[#E8E2D2] dark:border-[#353B35] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📝</span>
          <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
            Your Recent Quizzes
          </h3>
        </div>

        {quizResults.length === 0 ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">🎮</div>
            <p className="text-gray-500 dark:text-gray-400">
              No quizzes yet! Start learning to see your progress here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {quizResults.slice(-5).reverse().map((res) => {
              const isPassed = res.passed;
              const emoji = isPassed ? '🌟' : '💪';
              const color = isPassed ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20' : 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/20';
              
              return (
                <div
                  key={res.id}
                  className={`p-4 rounded-xl border ${color} flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{emoji}</span>
                    <div>
                      <div className="font-bold text-sm text-[#3E4A3E] dark:text-[#F5F2EA]">
                        {res.collectionName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {res.mode} • {new Date(res.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${isPassed ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                      {res.scorePercentage}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {res.correctCount}/{res.totalQuestions} correct
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fun Fact / Tip */}
      <div className="p-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl border border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💡</span>
          <div>
            <div className="font-bold text-sm text-indigo-700 dark:text-indigo-300">
              Did you know?
            </div>
            <p className="text-sm text-indigo-600 dark:text-indigo-400">
              Learning just 10 minutes every day helps your brain grow stronger! 🧠
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};