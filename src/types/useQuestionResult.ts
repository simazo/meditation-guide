import type { Question } from './question';

export interface UseQuestionResult {
  currentQuestion: Question | undefined;
  answerQuestion: (questionId: number, answer: boolean) => void;
  calcRecommendation: () => void;
  isLastQuestion: boolean;
  recommendation: string | null;
  nextQuestion: (answer: boolean) => void;
}
