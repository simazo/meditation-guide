import { useState } from "react";
import { questions } from "../data/questions";

type AnswerMap = Record<number, boolean>; // 回答結果を保持するマップ
type TagCountMap = Record<string, number>; // タグごとの出現回数を集計したマップ
type SortedTagList = [string, number][]; // 出現回数順にソートされたタグのリスト

export const useQuestion = () => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastQuestion = currentIndex === questions.length;

  const answerQuestion = (questionId: number, answer: boolean) => {
    setAnswers(prevAnswers => {
      const updatedAnswers = { ...prevAnswers, [questionId]: answer };
      return updatedAnswers;
    });
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  // タグ集計
  const countTags = (answers: AnswerMap) =>
    questions
      .filter(q => answers[q.id]) // Yes(true)と回答した質問だけ抽出
      .flatMap(q => q.tags) // フィルターで残った質問に対して、tagsプロパティを配列で取り出し、すべての tags を1つの配列に平坦化 例: [['集中', '姿勢'], ['集中']] → ['集中', '姿勢', '集中']
      .reduce((acc, tag) => { // タグ配列を1つずつ処理して、出現回数をカウント
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {} as TagCountMap);
  
  // タグを出現回数順にソート
  const sortTagsByCount = (tagCount: TagCountMap) =>
    Object.entries(tagCount).sort((a, b) => b[1] - a[1]);
  
  // 推奨結果の算出
  const createRecommendation = (sortedTags: SortedTagList, topN: number) => {
    if (sortedTags.length === 0) {
      return "適した瞑想法が見つかりませんでした。";
    }

    const topTags = sortedTags.slice(0, topN).map((tag) => tag);
    console.log(topTags);
    return `おすすめの瞑想法は: ${topTags.join(",")}`;
  }

  // 回答を集計して推奨結果を算出
  const calcRecommendation = (answers: AnswerMap) => {
    const tagCount = countTags(answers);
    const sortedTags = sortTagsByCount(tagCount);
    const result = createRecommendation(sortedTags, 2);
    setRecommendation(result);
  };

  const currentQuestion = questions[currentIndex];

  return {
    currentQuestion,
    answerQuestion,
    calcRecommendation,
    isLastQuestion,
    answers,
    recommendation,
  };
};
