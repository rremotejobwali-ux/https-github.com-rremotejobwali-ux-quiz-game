import React, { useState } from 'react';
import { QuizSettings } from '../types';
import { BrainCircuit, Sparkles, Zap, ChevronRight } from 'lucide-react';

interface SetupScreenProps {
  onStart: (settings: QuizSettings) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<QuizSettings['difficulty']>('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onStart({ topic, difficulty });
    }
  };

  const difficulties: QuizSettings['difficulty'][] = ['Easy', 'Medium', 'Hard', 'Expert'];

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4 text-indigo-600">
          <BrainCircuit size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Quiz Master AI</h1>
        <p className="text-slate-500 mt-2">Challenge yourself on any topic imaginable.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-semibold text-slate-700 mb-2">
            What do you want to learn about?
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Sparkles size={18} />
            </div>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Quantum Physics, 90s Pop Music, Coffee..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800 font-medium placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Select Difficulty
          </label>
          <div className="grid grid-cols-2 gap-3">
            {difficulties.map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setDifficulty(diff)}
                className={`flex items-center justify-center px-4 py-3 rounded-xl border transition-all duration-200 font-medium ${
                  difficulty === diff
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-[1.02]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {diff === 'Expert' && <Zap size={16} className="mr-2" />}
                {diff}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!topic.trim()}
          className="w-full flex items-center justify-center py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Generate Quiz
          <ChevronRight className="ml-2" size={20} />
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Powered by Gemini 2.5 Flash</p>
      </div>
    </div>
  );
};

export default SetupScreen;
