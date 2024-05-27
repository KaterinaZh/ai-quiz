export interface Question {
  id: number;
  skill: string;
  question: string;
  options: Option[];
  correctAnswer?: boolean;
}

export interface Option {
  text: string;
  isCorrect?: boolean;
  selected?: boolean;
}

export interface QuizTheme {
  skill: string;
  questions: Question[];
  correctAnswers?: number;
  percent?: number;
}

export interface SolvedQuestion {
  questionId: number;
  selected: number; // index of option from 0 to 3
}
