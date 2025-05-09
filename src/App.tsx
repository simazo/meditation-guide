import { useEffect } from "react";
import { useQuestion } from "./hooks/useQuestion";
import Question from "./components/Question";
import Recommendation from "./components/Recommendation";
import Progress from "./components/Progress";
import type { UseQuestionResult } from "./types/useQuestionResult";

const App: React.FC = () => {
  const { 
    currentQuestion, 
    answerQuestion, 
    calcRecommendation,
    isLastQuestion,
    recommendation,
  }: UseQuestionResult = useQuestion();

  useEffect(() => {
    if (isLastQuestion) {
      calcRecommendation();
    }
  }, [isLastQuestion]);

  const onAnswer = (questionId: number, answer: boolean) => {
    answerQuestion(questionId, answer);
  };

  return (
    <div>
      <h1>瞑想法診断</h1>
      { <Progress current={currentQuestion?.id || 0} total={20} /> }
      {currentQuestion ? (
        <Question 
          text={currentQuestion.text} 
          onAnswer={(answer) => onAnswer(currentQuestion.id, answer)} 
        />
      ) : (
        <Recommendation recommendation={recommendation} />
      )}
    </div>
  );
};

export default App;
