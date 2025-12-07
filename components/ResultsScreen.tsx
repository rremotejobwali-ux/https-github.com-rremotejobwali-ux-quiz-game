import React from 'react';
import { Question, UserAnswer, QuizSettings } from '../types';
import { Trophy, RefreshCcw, Check, X, Award } from 'lucide-react';

interface ResultsScreenProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  settings: QuizSettings;
  onPlayAgain: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  questions,
  userAnswers,
  settings,
  onPlayAgain,
}) => {
  const correctCount = userAnswers.filter((a) => a.isCorrect).length;
  const scorePercentage = Math.round((correctCount / questions.length) * 100);

  let message = "";
  let colorClass = "";
  
  if (scorePercentage >= 90) {
    message = "Quiz Master!";
    colorClass = "text-yellow-500";
  } else if (scorePercentage >= 70) {
    message = "Great Job!";
    colorClass = "text-green-500";
  } else if (scorePercentage >= 50) {
    message = "Good Effort!";
    colorClass = "text-indigo-500";
  } else {
    message = "Keep Learning!";
    colorClass = "text-slate-500";
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-xl mb-6">
          <Trophy size={48} className={colorClass} />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-2">{message}</h2>
        <p className="text-slate-500 text-lg">You scored <span className={`font-bold ${colorClass}`}>{scorePercentage}%</span> on {settings.topic}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 mb-8">
        <div className="p-6 md:p-8">
           <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
             <Award className="mr-2 text-indigo-600" />
             Review Your Answers
           </h3>
           
           <div className="space-y-4">
             {questions.map((q, idx) => {
               const userAnswer = userAnswers.find(a => a.questionId === q.id);
               const isCorrect = userAnswer?.isCorrect;
               
               return (
                 <div key={q.id} className={`p-4 rounded-xl border-l-4 ${isCorrect ? 'border-l-green-500 bg-green-50/50' : 'border-l-red-500 bg-red-50/50'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm mb-1">
                          {idx + 1}. {q.questionText}
                        </p>
                        <div className="text-sm mt-2">
                          <span className="text-slate-500 mr-2">Correct:</span>
                          <span className="font-medium text-green-700">{q.options[q.correctAnswerIndex]}</span>
                        </div>
                        {!isCorrect && userAnswer && (
                          <div className="text-sm mt-1">
                             <span className="text-slate-500 mr-2">You picked:</span>
                             <span className="font-medium text-red-700">{q.options[userAnswer.selectedOptionIndex]}</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        {isCorrect ? <Check className="text-green-500" size={20}/> : <X className="text-red-500" size={20} />}
                      </div>
                    </div>
                 </div>
               );
             })}
           </div>
        </div>
      </div>

      <div className="flex justify-center mb-12">
        <button
          onClick={onPlayAgain}
          className="flex items-center px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-indigo-200 hover:-translate-y-1 transition-all"
        >
          <RefreshCcw className="mr-2" size={20} />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;