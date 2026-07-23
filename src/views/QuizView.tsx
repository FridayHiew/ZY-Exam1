// QuizView.tsx - Kid-Friendly Version
import React, { useState, useEffect } from 'react';
import { AppStorageState, Question, QuizConfig, QuizResult, UserAnswerRecord } from '../types';
import { saveAppState, resolveImagePath } from '../utils/storage';
import { getTranslation } from '../utils/i18n';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, Clock, Award, RotateCcw, Check, AlertCircle, Grid, HelpCircle, Star, Sparkles, Rocket, Smile } from 'lucide-react';
import { quizSounds } from '../utils/sound';

interface QuizViewProps {
  appState: AppStorageState;
  config: QuizConfig;
  onFinishQuiz: (result: QuizResult) => void;
  onExitQuiz: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  appState,
  config,
  onFinishQuiz,
  onExitQuiz,
}) => {
  const { collections, quizResults, settings } = appState;
  const lang = settings.language;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map());
  const [showExplanation, setShowExplanation] = useState<Map<number, boolean>>(new Map());
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number | null>(null);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState<QuizResult | null>(null);
  const [shuffledQuestionsMap, setShuffledQuestionsMap] = useState<Map<number, { options: [string, string, string, string]; correctIndex: number }>>(new Map());
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    let selectedQuestions: Question[] = [];

    if (config.mode === 'PRACTICE' || config.mode === 'EXAM') {
      const col = collections.find((c) => c.id === config.collectionId) || collections[0];
      if (col && col.questions.length > 0) {
        selectedQuestions = [...col.questions].sort(() => Math.random() - 0.5);
        if (config.questionCount) {
          selectedQuestions = selectedQuestions.slice(0, config.questionCount);
        }
      }
    } else if (config.mode === 'MISTAKE_REVIEW') {
      const incorrectIds = new Set<string>();
      quizResults.forEach((res) => {
        res.answerRecords.forEach((ans) => {
          if (!ans.isCorrect) incorrectIds.add(ans.questionId);
        });
      });
      const allQs = collections.flatMap((c) => c.questions);
      selectedQuestions = allQs.filter((q) => incorrectIds.has(q.id));
      if (selectedQuestions.length === 0) {
        selectedQuestions = allQs.slice(0, 10);
      }
    } else if (config.mode === 'WEAK_TOPICS') {
      const allQs = collections.flatMap((c) => c.questions);
      selectedQuestions = [...allQs].sort(() => Math.random() - 0.5).slice(0, config.questionCount || 10);
    }

    setQuestions(selectedQuestions);

    const shuffledMap = new Map();
    selectedQuestions.forEach((q, idx) => {
      const indices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
      const shuffledOpts: [string, string, string, string] = [
        q.options[indices[0]],
        q.options[indices[1]],
        q.options[indices[2]],
        q.options[indices[3]],
      ];
      const newCorrectIdx = indices.indexOf(q.correctIndex);
      shuffledMap.set(idx, { options: shuffledOpts, correctIndex: newCorrectIdx });
    });
    setShuffledQuestionsMap(shuffledMap);

    if (config.mode === 'EXAM' && config.timeLimitMinutes) {
      setTimeRemainingSeconds(config.timeLimitMinutes * 60);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex, isExamCompleted]);

  useEffect(() => {
    if (isExamCompleted) return;

    const timer = setInterval(() => {
      setTimeSpentSeconds((prev) => prev + 1);

      if (timeRemainingSeconds !== null) {
        setTimeRemainingSeconds((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer);
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemainingSeconds, isExamCompleted]);

  const currentQ = questions[currentIndex];
  const shuffledData = shuffledQuestionsMap.get(currentIndex);
  const totalQuestions = questions.length;

  const handleSelectOption = (optionIndex: number) => {
    if (isExamCompleted) return;

    const alreadyAnswered = userAnswers.has(currentIndex);
    setUserAnswers((prev) => {
      const next = new Map(prev);
      next.set(currentIndex, optionIndex);
      return next;
    });

    if (config.mode === 'PRACTICE' || config.mode === 'MISTAKE_REVIEW') {
      setShowExplanation((prev) => {
        const next = new Map(prev);
        next.set(currentIndex, true);
        return next;
      });

      if (!alreadyAnswered) {
        const shuff = shuffledQuestionsMap.get(currentIndex);
        if (shuff) {
          const isCorrect = optionIndex === shuff.correctIndex;
          if (isCorrect) {
            quizSounds.playRightAnswer();
          } else {
            quizSounds.playWrongAnswer();
          }
        }
      }
    }
  };

  const handleFinalSubmit = () => {
    if (isExamCompleted) return;

    const records: UserAnswerRecord[] = questions.map((q, idx) => {
      const shuff = shuffledQuestionsMap.get(idx);
      const selected = userAnswers.get(idx) ?? -1;
      const isCorrect = shuff ? selected === shuff.correctIndex : false;

      return {
        questionId: q.id,
        questionText: q.questionText,
        category: q.category || 'General',
        selectedOptionIndex: selected,
        correctOptionIndex: shuff ? shuff.correctIndex : q.correctIndex,
        isCorrect,
        timeSpentSeconds: Math.round(timeSpentSeconds / Math.max(1, questions.length)),
        shuffledOptions: shuff?.options ? [...shuff.options] : [...q.options],
        originalCorrectText: q.options[q.correctIndex],
      };
    });

    const correctCount = records.filter((r) => r.isCorrect).length;
    const scorePercentage = Math.round((correctCount / Math.max(1, totalQuestions)) * 100);
    const passMark = config.passMarkPercentage || appState.settings.defaultPassMark || 70;
    const passed = scorePercentage >= passMark;

    const result: QuizResult = {
      id: `res_${Date.now()}`,
      collectionId: config.collectionId,
      collectionName: config.collectionName || `${config.mode} Session`,
      mode: config.mode,
      date: new Date().toISOString(),
      totalQuestions,
      correctCount,
      scorePercentage,
      passed,
      timeSpentSeconds,
      answerRecords: records,
    };

    setFinalResult(result);
    setIsExamCompleted(true);
    onFinishQuiz(result);

    if (passed && scorePercentage >= 80) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }

    if (config.mode === 'EXAM') {
      if (passed) {
        quizSounds.playPassExam();
      } else {
        quizSounds.playFailedExam();
      }
    }
  };

  const getProgressEmoji = () => {
    const answered = userAnswers.size;
    const total = questions.length;
    if (answered === total) return '🎉';
    if (answered >= total * 0.7) return '🌟';
    if (answered >= total * 0.4) return '💪';
    return '🚀';
  };

  if (questions.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-gray-200 dark:border-gray-700">
        <div className="text-6xl mb-4">🤔</div>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          No questions found! Try adding a book first.
        </p>
        <button
          onClick={onExitQuiz}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform"
        >
          🏠 Go Home
        </button>
      </div>
    );
  }

  // Results View - Kid Friendly
  if (isExamCompleted && finalResult) {
    const isAwesome = finalResult.scorePercentage >= 80;
    const isGood = finalResult.scorePercentage >= 60;
    const emoji = isAwesome ? '🌟' : isGood ? '💪' : '📚';
    const message = isAwesome 
      ? 'AMAZING! You\'re a superstar! 🌟' 
      : isGood 
      ? 'Good job! Keep practicing! 💪' 
      : 'Don\'t give up! Practice makes perfect! 📚';

    return (
      <div className="space-y-6 pb-12 max-w-3xl mx-auto">
        {showCelebration && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl animate-bounce">🎉</div>
              <div className="text-4xl font-bold text-yellow-500 mt-4 animate-pulse">
                ⭐ AMAZING! ⭐
              </div>
            </div>
          </div>
        )}

        <div className="p-8 bg-white dark:bg-[#242824] rounded-3xl border-2 border-gray-200 dark:border-gray-700 shadow-xl text-center">
          <div className="text-7xl mb-4">{emoji}</div>
          
          <h2 className="text-3xl font-bold text-[#3E4A3E] dark:text-[#F5F2EA] mb-2">
            {finalResult.scorePercentage}%
          </h2>
          
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">
            {message}
          </p>

          <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl mb-6">
            <div>
              <div className="text-2xl mb-1">❓</div>
              <div className="font-bold text-sm">{finalResult.totalQuestions}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Questions</div>
            </div>
            <div>
              <div className="text-2xl mb-1">✅</div>
              <div className="font-bold text-sm text-green-600 dark:text-green-400">{finalResult.correctCount}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Correct</div>
            </div>
            <div>
              <div className="text-2xl mb-1">⏱️</div>
              <div className="font-bold text-sm">
                {Math.floor(finalResult.timeSpentSeconds / 60)}m {finalResult.timeSpentSeconds % 60}s
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Time</div>
            </div>
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={onExitQuiz}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-2xl text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              🏠 Home
            </button>
            <button
              onClick={() => {
                setIsExamCompleted(false);
                setFinalResult(null);
                setCurrentIndex(0);
                setUserAnswers(new Map());
                setShowExplanation(new Map());
                setTimeSpentSeconds(0);
                setShowCelebration(false);
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform"
            >
              🔄 Try Again
            </button>
          </div>
        </div>

        {/* Answer Review - Kid Friendly */}
        <div className="p-6 bg-white dark:bg-[#242824] rounded-2xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA] mb-4 flex items-center gap-2">
            <span>📝</span> Review Your Answers
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {finalResult.answerRecords.map((ans, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border-2 ${
                  ans.isCorrect
                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20'
                    : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{ans.isCorrect ? '✅' : '❌'}</span>
                    <span className="font-bold text-sm text-[#3E4A3E] dark:text-[#F5F2EA]">
                      Q{idx + 1}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {ans.category}
                  </span>
                </div>
                <p className="text-sm text-[#2D2A26] dark:text-[#EAE7DF] mt-1">
                  {ans.questionText}
                </p>
                <div className="mt-2 text-xs">
                  <span className="text-green-600 dark:text-green-400">✓ {ans.shuffledOptions?.[ans.correctOptionIndex]}</span>
                  {!ans.isCorrect && (
                    <span className="text-red-600 dark:text-red-400 ml-2">
                      ✗ You picked: {ans.shuffledOptions?.[ans.selectedOptionIndex]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz View - Kid Friendly
  const progress = ((userAnswers.size) / totalQuestions) * 100;

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Top Bar */}
      <div className="p-4 bg-white dark:bg-[#242824] rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getProgressEmoji()}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span className="text-sm">📝</span>
              </div>
              <div className="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {timeRemainingSeconds !== null && (
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span className="font-bold text-yellow-700 dark:text-yellow-300 font-mono text-lg">
                {Math.floor(timeRemainingSeconds / 60)
                  .toString()
                  .padStart(2, '0')}
                :{(timeRemainingSeconds % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}

          <button
            onClick={onExitQuiz}
            className="text-2xl hover:bg-gray-100 dark:hover:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 bg-white dark:bg-[#242824] rounded-3xl border-2 border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🤔</span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {currentQ.category || 'Fun Facts'}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#3E4A3E] dark:text-[#F5F2EA] leading-relaxed mb-4">
          {currentQ.questionText}
        </h3>

        {currentQ.image && (
          <div className="my-3 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 flex items-center justify-center p-2">
            <img
              src={resolveImagePath(currentQ.image)}
              alt="Question illustration"
              className="max-h-48 object-contain rounded-xl"
            />
          </div>
        )}

        {/* Options */}
        <div className="space-y-3">
          {shuffledData?.options.map((optText, oIdx) => {
            const isSelected = userAnswers.get(currentIndex) === oIdx;
            const isCorrectOption = oIdx === shuffledData.correctIndex;
            const isRevealed =
              (config.mode === 'PRACTICE' || config.mode === 'MISTAKE_REVIEW') &&
              showExplanation.get(currentIndex);

            let buttonStyle = 'border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20';

            if (isSelected) {
              buttonStyle = 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20';
            }

            if (isRevealed) {
              if (isCorrectOption) {
                buttonStyle = 'border-2 border-green-500 bg-green-50 dark:bg-green-950/20';
              } else if (isSelected && !isCorrectOption) {
                buttonStyle = 'border-2 border-red-500 bg-red-50 dark:bg-red-950/20';
              }
            }

            const optionLetter = String.fromCharCode(65 + oIdx);

            return (
              <button
                key={oIdx}
                onClick={() => handleSelectOption(oIdx)}
                className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all flex items-center gap-3 ${buttonStyle}`}
                disabled={isRevealed}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  isRevealed && isCorrectOption
                    ? 'bg-green-500 text-white'
                    : isRevealed && isSelected && !isCorrectOption
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                  {isRevealed && isCorrectOption ? '✓' : isRevealed && isSelected && !isCorrectOption ? '✗' : optionLetter}
                </span>
                <span>{optText}</span>
                {isRevealed && isCorrectOption && <span className="ml-auto text-green-600 dark:text-green-400">✅ Correct!</span>}
                {isRevealed && isSelected && !isCorrectOption && <span className="ml-auto text-red-600 dark:text-red-400">❌ Oops!</span>}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {(config.mode === 'PRACTICE' || config.mode === 'MISTAKE_REVIEW') &&
          showExplanation.get(currentIndex) && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">💡</span>
                <span className="font-bold text-blue-700 dark:text-blue-300">Explanation</span>
              </div>
              <p className="text-sm text-[#2D2A26] dark:text-[#EAE7DF]">
                {currentQ.explanation || 'Great job! Keep learning! 📚'}
              </p>
              {currentQ.sourceReference && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  📖 {currentQ.sourceReference}
                </div>
              )}
            </div>
          )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          className="flex items-center gap-2 px-5 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-2xl text-sm disabled:opacity-40 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
            {userAnswers.size}/{totalQuestions}
          </span>
          <span className="text-sm">✅</span>
        </div>

        {currentIndex < totalQuestions - 1 ? (
          <button
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleFinalSubmit}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform"
          >
            <span>🎯 Finish!</span>
            <Check className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Progress Indicators */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {questions.map((_, idx) => {
          const isAnswered = userAnswers.has(idx);
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                isCurrent
                  ? 'ring-2 ring-blue-500 scale-110'
                  : ''
              } ${
                isAnswered
                  ? 'bg-green-400 dark:bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};