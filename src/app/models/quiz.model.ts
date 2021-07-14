export interface QuizCategory {
  id: number;
  name: string;
}

export interface QuizQuestion {
  category: string,
  difficulty: Difficulty,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
}

export enum Difficulty {
  Easy="easy",
  Medium="medium",
  Hard="hard"
}

