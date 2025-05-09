import type { Question } from './question';

export interface MeditationDetail {
  name: string;
  description: string;
  purpose: string;
  effect: string;
  method: string;
}

export interface UseQuestionResult {
  currentQuestion: Question | undefined;
  answerQuestion: (questionId: number, answer: boolean) => void;
  calcRecommendation: () => void;
  isLastQuestion: boolean;
  recommendation: MeditationDetail[] | null;
  nextQuestion: (answer: boolean) => void;
}
