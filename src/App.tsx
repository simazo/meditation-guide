import { useQuestion } from "../hooks/useQuestion";

const App: React.FC = () => {
  const { 
    currentQuestion, 
    handleAnswer, 
    recommendation, 
  } = useQuestion();
  
  return (
    <div>
      {/* <h1>瞑想法診断</h1> */}
      {currentQuestion ? (
      <div>
        <p>{currentQuestion.text}</p>
        <button onClick={() => handleAnswer(currentQuestion.id, true)}>はい</button>
        <button onClick={() => handleAnswer(currentQuestion.id, false)}>いいえ</button>
      </div>
      ) : (
        recommendation && <h2>{recommendation}</h2>
      )}
    </div>
  );
};

export default App;
