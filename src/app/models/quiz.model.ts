export interface Question {
  id: string;
  skill: string;
  question: string;
  options: Option[];
  correctAnswer?: boolean;
}

export interface Option {
  text: string;
  id: string;
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
  questionId: string;
  selected: string; // index of option from 0 to 3
}
