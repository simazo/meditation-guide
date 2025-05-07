import { useState } from "react";
import { questions } from "../data/questions";

export const useQuestion = () => {
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAnswer = (questionId: number, answer: boolean) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    if (nextIndex === questions.length) {
      calcRecommendation(updatedAnswers);
    }
  };

  // タグ集計
  const countTags = (answers: Record<number, boolean>) =>
    questions
      .filter(q => answers[q.id])
      .flatMap(q => q.tags)
      .reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
  
  // タグをスコア順にソート
  const sortTagsByCount = (tagCount: Record<string, number>) =>
    Object.entries(tagCount).sort((a, b) => b[1] - a[1]);
  
  // 推奨結果の算出
  const getTopRecommendation = (sortedTags: [string, number][]) =>
    sortedTags.length > 0
      ? `おすすめの瞑想法は: ${sortedTags[0][0]}`
      : "適した瞑想法が見つかりませんでした。";

  const calcRecommendation = (latestAnswers: Record<number, boolean>) => {
    const tagCount = countTags(latestAnswers);
    const sortedTags = sortTagsByCount(tagCount);
    const result = getTopRecommendation(sortedTags);
    setRecommendation(result);
  };

  const currentQuestion = questions[currentIndex];

  return {
    currentQuestion,
    handleAnswer,
    recommendation,
  };
};
