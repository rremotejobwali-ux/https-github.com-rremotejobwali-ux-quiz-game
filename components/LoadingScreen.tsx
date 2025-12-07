import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen: React.FC<{ topic: string }> = ({ topic }) => {
  const [tipIndex, setTipIndex] = useState(0);
  
  const tips = [
    "Consulting the archives...",
    "Drafting challenging questions...",
    "Double-checking facts...",
    "Polishing the answers...",
    "Preparing your challenge..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
        <Loader2 size={64} className="text-indigo-600 animate-spin relative z-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Generating Quiz</h2>
      <p className="text-lg text-indigo-600 font-medium mb-8">Topic: {topic}</p>
      <div className="h-6 overflow-hidden">
        <p className="text-slate-500 animate-bounce">{tips[tipIndex]}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
