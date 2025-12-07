export interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizSettings {
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
}

export type GameState = 'SETUP' | 'LOADING' | 'PLAYING' | 'FINISHED' | 'ERROR';

export interface UserAnswer {
  questionId: number;
  selectedOptionIndex: number;
  isCorrect: boolean;
  timeTaken: number; // in seconds
}
