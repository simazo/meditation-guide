import { useEffect } from "react";
import { useQuestion } from "../hooks/useQuestion";

const App: React.FC = () => {
  const { 
    currentQuestion, 
    answerQuestion, 
    calcRecommendation,
    isLastQuestion,
    answers,
    recommendation,
  } = useQuestion();

  // const onAnswer = (questionId: number, answer: boolean) => {
  //   answerQuestion(questionId, answer);
  //   if(isLastQuestion) calcRecommendation(answers);
  // };
  // 
  // 回答が終わってから集計結果を計算するよう、同期を取るためuseEffectに変更
  useEffect(() => {
    if (isLastQuestion) {
      calcRecommendation(answers);
    }
  }, [isLastQuestion, answers, calcRecommendation]);

  const onAnswer = (questionId: number, answer: boolean) => {
    answerQuestion(questionId, answer);
  };

  return (
    <div>
      {/* <h1>瞑想法診断</h1> */}
      {currentQuestion ? (
      <div>
        <p>{currentQuestion.text}</p>
        <button onClick={() => onAnswer(currentQuestion.id, true)}>はい</button>
        <button onClick={() => onAnswer(currentQuestion.id, false)}>いいえ</button>
      </div>
      ) : (
        recommendation ? (
          <h2>{recommendation}</h2> // 推奨結果が存在すれば表示
        ) : (
          <h2>結果を計算中...</h2> // 結果がまだ出ていない場合
        )
      )}
    </div>
  );
};

export default App;
