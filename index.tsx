import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Question, QuizSettings, GameState, UserAnswer } from './types';
import { generateQuiz } from './services/geminiService';
import SetupScreen from './components/SetupScreen';
import LoadingScreen from './components/LoadingScreen';
import QuestionCard from './components/QuestionCard';
import ResultsScreen from './components/ResultsScreen';
import { AlertTriangle } from 'lucide-react';

const App = () => {
  const [gameState, setGameState] = useState<GameState>('SETUP');
  const [settings, setSettings] = useState<QuizSettings>({ topic: '', difficulty: 'Medium' });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [error, setError] = useState<string>('');

  const handleStartQuiz = async (newSettings: QuizSettings) => {
    setSettings(newSettings);
    setGameState('LOADING');
    setError('');

    try {
      const generatedQuestions = await generateQuiz(newSettings);
      setQuestions(generatedQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setGameState('PLAYING');
    } catch (err) {
      console.error(err);
      setError('Failed to generate quiz. Please try again.');
      setGameState('ERROR');
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
    
    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptionIndex: optionIndex,
      isCorrect,
      timeTaken: 0 
    };

    setUserAnswers([...userAnswers, answer]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState('FINISHED');
    }
  };

  const handlePlayAgain = () => {
    setGameState('SETUP');
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center min-h-screen">
        
        {gameState === 'SETUP' && (
          <SetupScreen onStart={handleStartQuiz} />
        )}

        {gameState === 'LOADING' && (
          <LoadingScreen topic={settings.topic} />
        )}

        {gameState === 'PLAYING' && questions.length > 0 && (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}

        {gameState === 'FINISHED' && (
          <ResultsScreen
            questions={questions}
            userAnswers={userAnswers}
            settings={settings}
            onPlayAgain={handlePlayAgain}
          />
        )}

        {gameState === 'ERROR' && (
          <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-red-100 max-w-md animate-in fade-in zoom-in duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h3>
            <p className="text-slate-500 mb-6">{error || "We couldn't generate a quiz right now."}</p>
            <button 
              onClick={() => setGameState('SETUP')}
              className="px-6 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);