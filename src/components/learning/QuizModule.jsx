import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import { useCourse } from '../../context/CourseContext';

export const QuizModule = ({ courseId, quiz, onCompleteQuiz }) => {
  const { saveQuizResult } = useCourse();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = quiz?.questions || [];
  const currentQ = questions[currentIdx];

  const handleSelect = (idx) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctAnswer) {
      setCorrectAnswersCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      const finalScore = Math.round(((correctAnswersCount + (selectedOption === currentQ.correctAnswer ? 1 : 0)) / questions.length) * 100);
      setQuizFinished(true);
      saveQuizResult(courseId, quiz.id, finalScore);
      if (onCompleteQuiz) {
        onCompleteQuiz(finalScore);
      }
    }
  };

  const handleRetake = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswersCount(0);
    setQuizFinished(false);
  };

  if (!quiz || questions.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm">
        No assessment questions available for this module.
      </div>
    );
  }

  if (quizFinished) {
    const finalScore = Math.round((correctAnswersCount / questions.length) * 100);
    const passed = finalScore >= 70;

    return (
      <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center max-w-xl mx-auto shadow-xl">
        <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 ${
          passed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
        }`}>
          <Award size={36} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {passed ? "Assessment Passed! 🎓" : "Review & Try Again"}
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          You scored <strong className="text-indigo-600 dark:text-indigo-400 text-lg">{finalScore}%</strong> ({correctAnswersCount} of {questions.length} correct).
        </p>

        <button 
          onClick={handleRetake} 
          className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw size={15} /> Retake Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-2xl shadow-xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          Question {currentIdx + 1} of {questions.length}
        </span>
        <span className="text-xs text-slate-500 truncate max-w-xs">{quiz.title}</span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
        {currentQ.question}
      </h3>

      <div className="flex flex-col gap-3">
        {currentQ.options.map((opt, idx) => {
          let stateStyle = "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200";
          if (isAnswerSubmitted) {
            if (idx === currentQ.correctAnswer) {
              stateStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-300";
            } else if (idx === selectedOption) {
              stateStyle = "bg-rose-500/10 border-rose-500 text-rose-800 dark:text-rose-300";
            }
          } else if (idx === selectedOption) {
            stateStyle = "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300";
          }

          return (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 text-sm font-medium ${stateStyle}`}
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{opt}</span>
              {isAnswerSubmitted && idx === currentQ.correctAnswer && (
                <CheckCircle2 size={18} className="text-emerald-500" />
              )}
              {isAnswerSubmitted && idx === selectedOption && idx !== currentQ.correctAnswer && (
                <XCircle size={18} className="text-rose-500" />
              )}
            </div>
          );
        })}
      </div>

      {isAnswerSubmitted && currentQ.explanation && (
        <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-900 dark:text-indigo-200 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 font-bold">
            <HelpCircle size={14} /> Explanation:
          </div>
          <p>{currentQ.explanation}</p>
        </div>
      )}

      <div className="flex justify-end pt-2">
        {!isAnswerSubmitted ? (
          <button 
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/25 cursor-pointer"
          >
            Check Answer
          </button>
        ) : (
          <button 
            onClick={handleNextQuestion} 
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/25 flex items-center gap-2 cursor-pointer"
          >
            {currentIdx + 1 === questions.length ? "Finish Assessment" : "Next Question"} <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
