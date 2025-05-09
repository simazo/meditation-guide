import type { MeditationDetail } from "../types/useQuestionResult";

interface Props {
  recommendation: MeditationDetail[] | null;
}

const Recommendation: React.FC<Props> = ({ recommendation }) => {
  if (!recommendation || recommendation.length === 0) {
    return <p>適した瞑想法が見つかりませんでした。</p>;
  }
  return (
    <div>
      <h2>おすすめの瞑想法</h2>
      {recommendation.map((item) => (
        <div key={item.name}>
          <h3>{item.name}</h3>
          <p><strong>概要:</strong> {item.description}</p>
          <p><strong>目的:</strong> {item.purpose}</p>
          <p><strong>効果:</strong> {item.effect}</p>
          <p><strong>方法:</strong> {item.method}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};


export default Recommendation;
