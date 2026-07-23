// LibraryView.tsx - Kid-Friendly Version
import React, { useState } from 'react';
import { AppStorageState, KnowledgeCollection, QuizConfig } from '../types';
import { exportCollectionAsZIP } from '../utils/exporter';
import { getTranslation } from '../utils/i18n';
import { Play, Download, Trash2, BookOpen, Search, Folder, Plus, Star, Sparkles, Rocket } from 'lucide-react';

interface LibraryViewProps {
  appState: AppStorageState;
  onUpdateCollections: (collections: KnowledgeCollection[]) => void;
  onStartQuiz: (config: QuizConfig) => void;
  onNavigateTab: (tab: any) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  appState,
  onUpdateCollections,
  onStartQuiz,
  onNavigateTab,
}) => {
  const { collections, settings } = appState;
  const lang = settings.language;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<KnowledgeCollection | null>(null);

  const filteredCollections = collections.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyEmoji = (diff: string) => {
    if (diff === 'Beginner') return '🌱';
    if (diff === 'Intermediate') return '🌿';
    return '🌳';
  };

  const getDifficultyColor = (diff: string) => {
    if (diff === 'Beginner') return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300';
    if (diff === 'Intermediate') return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300';
    return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300';
  };

  const getDifficultyLabel = (diff: string) => {
    if (diff === 'Beginner') return '🌟 Easy';
    if (diff === 'Intermediate') return '⭐ Medium';
    return '🔥 Hard';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">📚</span>
            <h2 className="text-2xl font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
              My Learning Books
            </h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {collections.length} book{collections.length !== 1 ? 's' : ''} ready to explore!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('import')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            <span>➕ Add Book</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Search for a book..."
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-sm text-[#2D2A26] dark:text-[#EAE7DF] focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Collection Grid */}
      {filteredCollections.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-[#242824] rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <div className="text-6xl mb-4">📖</div>
          <p className="text-gray-500 dark:text-gray-400">
            No books found. Click "Add Book" to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCollections.map((collection) => {
            const qCount = collection.questions.length;
            const diffEmoji = getDifficultyEmoji(collection.difficulty);
            const diffColor = getDifficultyColor(collection.difficulty);
            const diffLabel = getDifficultyLabel(collection.difficulty);

            return (
              <div
                key={collection.id}
                className="group bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{diffEmoji}</span>
                    <div>
                      <h3 className="font-bold text-base text-[#3E4A3E] dark:text-[#F5F2EA] line-clamp-1">
                        {collection.name}
                      </h3>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${diffColor}`}>
                        {diffLabel}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded-lg">
                    {qCount} ❓
                  </span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                  {collection.description || '📝 Ready to learn!'}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    disabled={qCount === 0}
                    onClick={() =>
                      onStartQuiz({
                        collectionId: collection.id,
                        collectionName: collection.name,
                        mode: 'PRACTICE',
                        questionCount: Math.min(10, qCount),
                      })
                    }
                    className="w-full py-2.5 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-xl text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    🚀 Start Learning!
                  </button>

                  <div className="flex gap-2">
                    <button
                      disabled={qCount === 0}
                      onClick={() =>
                        onStartQuiz({
                          collectionId: collection.id,
                          collectionName: collection.name,
                          mode: 'EXAM',
                          questionCount: Math.min(10, qCount),
                        })
                      }
                      className="flex-1 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-xl text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      📝 Quiz
                    </button>
                    <button
                      onClick={() => setSelectedCollection(collection)}
                      className="flex-1 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold rounded-xl text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      👀 View
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${collection.name}"?`)) {
                          onUpdateCollections(collections.filter((c) => c.id !== collection.id));
                        }
                      }}
                      className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View Collection Modal */}
      {selectedCollection && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#242824] rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{getDifficultyEmoji(selectedCollection.difficulty)}</span>
                  <h3 className="text-xl font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
                    {selectedCollection.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedCollection.questions.length} questions
                </p>
              </div>
              <button
                onClick={() => setSelectedCollection(null)}
                className="text-2xl hover:bg-gray-100 dark:hover:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-3">
              {selectedCollection.questions.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  📭 No questions yet. Add some by importing!
                </p>
              ) : (
                selectedCollection.questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                        Q{idx + 1}
                      </span>
                      <p className="text-sm text-[#2D2A26] dark:text-[#EAE7DF]">
                        {q.questionText}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-2">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`text-xs p-1.5 rounded-lg ${
                            oIdx === q.correctIndex
                              ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-bold'
                              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {String.fromCharCode(65 + oIdx)}. {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setSelectedCollection(null)}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};