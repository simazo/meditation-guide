import React from "react";

const Question: React.FC<{
  text: string;
  onAnswer: (answer: boolean) => void;
}> = ({ text, onAnswer }) => (
  <div>
    <p>{text}</p>
    <button onClick={() => onAnswer(true)}>はい</button>
    <button onClick={() => onAnswer(false)}>いいえ</button>
  </div>
);

export default Question;
