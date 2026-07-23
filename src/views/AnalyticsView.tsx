// AnalyticsView.tsx - Kid-Friendly Version
import React, { useMemo } from 'react';
import { AppStorageState, QuizConfig } from '../types';
import { calculateCategoryMetrics, calculateOverallStats } from '../utils/analytics';
import { getTranslation } from '../utils/i18n';
import { BarChart3, Target, Award, Clock, RotateCcw, AlertTriangle, CheckCircle2, XCircle, Folder, Layers, Shield, Sparkles, Star, Trophy, Rocket, Smile } from 'lucide-react';

interface AnalyticsViewProps {
  appState: AppStorageState;
  onStartQuiz: (config: QuizConfig) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  appState,
  onStartQuiz,
}) => {
  const { collections, quizResults, settings } = appState;
  const lang = settings.language;

  const stats = calculateOverallStats(quizResults);
  const allQuestions = collections.flatMap((c) => c.questions);
  const categoryMetrics = calculateCategoryMetrics(quizResults, allQuestions);

  const getAccuracyEmoji = (acc: number) => {
    if (acc >= 90) return '🌟';
    if (acc >= 70) return '⭐';
    if (acc >= 50) return '💪';
    return '📚';
  };

  const getAccuracyColor = (acc: number) => {
    if (acc >= 80) return 'text-green-600 dark:text-green-400';
    if (acc >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-3">
        <span className="text-4xl">📊</span>
        <div>
          <h2 className="text-2xl font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
            Your Progress
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            See how much you've learned!
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl text-center shadow-sm">
          <div className="text-3xl mb-1">📝</div>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {stats.totalSessions}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Quizzes Done</div>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl text-center shadow-sm">
          <div className="text-3xl mb-1">✅</div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">
            {stats.totalQuestionsAnswered}
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 font-medium">Questions Answered</div>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl text-center shadow-sm">
          <div className="text-3xl mb-1">🎯</div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
            {stats.overallAccuracy}%
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
            {getAccuracyEmoji(stats.overallAccuracy)} Accuracy
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-2xl text-center shadow-sm">
          <div className="text-3xl mb-1">⏱️</div>
          <div className="text-2xl font-bold text-pink-700 dark:text-pink-300">
            {Math.floor(stats.totalTimeSpentSeconds / 60)}m
          </div>
          <div className="text-xs text-pink-600 dark:text-pink-400 font-medium">Time Learning</div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="p-5 bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
        <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA] flex items-center gap-2 mb-4">
          <span>📚</span> Your Strongest Subjects
        </h3>

        {categoryMetrics.length === 0 ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">📖</div>
            <p className="text-gray-500 dark:text-gray-400">
              Start learning to see your progress here!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {categoryMetrics.map((cat) => (
              <div key={cat.category} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
                    {cat.category}
                  </span>
                  <span className={`font-bold ${getAccuracyColor(cat.weightedAccuracy)}`}>
                    {cat.weightedAccuracy}% {getAccuracyEmoji(cat.weightedAccuracy)}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      cat.weightedAccuracy >= 80
                        ? 'bg-gradient-to-r from-green-400 to-green-500'
                        : cat.weightedAccuracy >= 60
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                        : 'bg-gradient-to-r from-red-400 to-red-500'
                    }`}
                    style={{ width: `${cat.weightedAccuracy}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>✅ {cat.correctAttempts} correct</span>
                  <span>📝 {cat.totalAttempts} attempts</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mistake Review */}
      {stats.totalWrong > 0 && (
        <div className="p-5 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-2 border-yellow-300 dark:border-yellow-700 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🔄</span>
            <div>
              <h3 className="font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
                Practice Mistakes
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You have {stats.totalWrong} questions to review!
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              onStartQuiz({
                mode: 'MISTAKE_REVIEW',
                questionCount: 15,
              })
            }
            className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform whitespace-nowrap"
          >
            🔄 Review Mistakes
          </button>
        </div>
      )}

      {/* Recent History */}
      <div className="p-5 bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
        <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA] flex items-center gap-2 mb-4">
          <span>📝</span> Recent Quizzes
        </h3>

        {quizResults.length === 0 ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">🎮</div>
            <p className="text-gray-500 dark:text-gray-400">
              No quizzes yet. Start your first one!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                  <th className="pb-3 text-left">📅 Date</th>
                  <th className="pb-3 text-left">📖 Book</th>
                  <th className="pb-3 text-left">🎯 Score</th>
                  <th className="pb-3 text-left">🏆 Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {quizResults.slice(-8).reverse().map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 text-gray-500 dark:text-gray-400 text-xs">
                      {new Date(res.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 font-medium text-[#3E4A3E] dark:text-[#F5F2EA]">
                      {res.collectionName}
                    </td>
                    <td className="py-3 font-bold text-blue-600 dark:text-blue-400">
                      {res.scorePercentage}%
                    </td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        res.passed
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                      }`}>
                        {res.passed ? '🌟 Passed' : '💪 Keep Going'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Fun Fact */}
      <div className="p-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💡</span>
          <div>
            <div className="font-bold text-indigo-700 dark:text-indigo-300">
              Progress Tip
            </div>
            <p className="text-sm text-indigo-600 dark:text-indigo-400">
              {stats.totalQuestionsAnswered > 0 
                ? `You've answered ${stats.totalQuestionsAnswered} questions! Keep going to become a learning superstar! 🌟`
                : 'Start learning today and watch your progress grow! 🚀'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};