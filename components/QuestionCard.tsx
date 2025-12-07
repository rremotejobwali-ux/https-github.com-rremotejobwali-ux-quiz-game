import React, { useState } from 'react';
import { Question } from '../types';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswer: (optionIndex: number) => void;
  onNext: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
  onNext,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // If we receive a new question prop, reset state
  React.useEffect(() => {
    setSelectedOption(null);
    setIsConfirmed(false);
  }, [question.id]);

  const handleSelect = (index: number) => {
    if (isConfirmed) return;
    setSelectedOption(index);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    setIsConfirmed(true);
    onAnswer(selectedOption);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6 bg-white/50 backdrop-blur-sm rounded-full h-2 w-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Question {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 leading-snug">
            {question.questionText}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ";
              
              if (isConfirmed) {
                if (index === question.correctAnswerIndex) {
                  btnClass += "bg-green-50 border-green-500 text-green-800 shadow-sm";
                } else if (index === selectedOption) {
                  btnClass += "bg-red-50 border-red-500 text-red-800 shadow-sm";
                } else {
                  btnClass += "border-slate-100 text-slate-400 opacity-60";
                }
              } else {
                if (selectedOption === index) {
                  btnClass += "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md ring-1 ring-indigo-600";
                } else {
                  btnClass += "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={isConfirmed}
                  className={btnClass}
                >
                  <span className="flex-1 font-medium text-lg">{option}</span>
                  {isConfirmed && index === question.correctAnswerIndex && (
                    <CheckCircle2 className="text-green-600 ml-3 flex-shrink-0" />
                  )}
                  {isConfirmed && index === selectedOption && index !== question.correctAnswerIndex && (
                    <XCircle className="text-red-600 ml-3 flex-shrink-0" />
                  )}
                  {!isConfirmed && selectedOption === index && (
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                    </div>
                  )}
                  {!isConfirmed && selectedOption !== index && (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-indigo-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Section */}
          {isConfirmed && (
            <div className="mt-8 animate-in slide-in-from-bottom-2 duration-300">
               <div className={`p-5 rounded-2xl mb-6 flex items-start space-x-4 ${
                 selectedOption === question.correctAnswerIndex 
                 ? 'bg-green-100/50 text-green-900' 
                 : 'bg-indigo-50 text-slate-800'
               }`}>
                 <div className="flex-shrink-0 mt-1">
                   <HelpCircle className={selectedOption === question.correctAnswerIndex ? "text-green-600" : "text-indigo-600"} size={24} />
                 </div>
                 <div>
                   <p className="font-bold text-lg mb-1">Explanation</p>
                   <p className="leading-relaxed opacity-90">{question.explanation}</p>
                 </div>
               </div>

               <button
                onClick={onNext}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors flex items-center justify-center shadow-lg"
               >
                 {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
                 <ArrowRight className="ml-2" />
               </button>
            </div>
          )}

          {/* Confirm Button (Before Answering) */}
          {!isConfirmed && (
            <div className="mt-8">
               <button
                onClick={handleConfirm}
                disabled={selectedOption === null}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-indigo-200"
               >
                 Confirm Answer
               </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
