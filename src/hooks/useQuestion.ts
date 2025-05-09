import { useState } from "react";
import { questions } from "../../data/questions";
import type { Question } from "../types/question";
import type { MeditationDetail, UseQuestionResult } from "../types/useQuestionResult";
import { MEDITATION_DETAILS } from "../constants/meditationDetails";

type AnswerMap = Record<number, boolean>; // 回答結果を保持するマップ
type TagCountMap = Record<string, number>; // タグごとの出現回数を集計したマップ
type SortedTagList = [string, number][]; // 出現回数順にソートされたタグのリスト

export const useQuestion = (): UseQuestionResult => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [recommendation, setRecommendation] = useState<MeditationDetail[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastQuestion = questions.length > 0 && currentIndex === questions.length; // 空配列対応
  const currentQuestion: Question | undefined = questions[currentIndex];

  const answerQuestion = (questionId: number, answer: boolean) => {
    setAnswers(prevAnswers => {
      const updatedAnswers = { ...prevAnswers, [questionId]: answer };
      return updatedAnswers;
    });
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const nextQuestion = (answer: boolean) => {
    const currentQuestion = questions[currentIndex] || null;
    if (currentQuestion) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // 回答を集計して推奨結果を算出
  const calcRecommendation = () => {
    const tagCount = countTags(answers);
    const sortedTags = sortTagsByCount(tagCount);
    const result = createRecommendation(sortedTags, 3);
    setRecommendation(result);
  };

  return {
    currentQuestion,
    answerQuestion,
    calcRecommendation,
    isLastQuestion,
    recommendation,
    nextQuestion,
  };
};

// タグ集計
export const countTags = (answers: AnswerMap) =>
  questions
    .filter(q => answers[q.id]) // Yes(true)と回答した質問だけ抽出
    .flatMap(q => q.tags) // フィルターで残った質問に対して、tagsプロパティを配列で取り出し、すべての tags を1つの配列に平坦化 例: [['集中', '姿勢'], ['集中']] → ['集中', '姿勢', '集中']
    .reduce((acc, tag) => { // タグ配列を1つずつ処理して、出現回数をカウント
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as TagCountMap);

// タグを出現回数順にソート
export const sortTagsByCount = (tagCount: TagCountMap) =>
  Object.entries(tagCount).sort((a, b) => b[1] - a[1]);

// 推奨結果の算出
export const createRecommendation = (sortedTags: SortedTagList, topN: number): MeditationDetail[] => {
  if (sortedTags.length === 0) return [];

  const topTags = sortedTags.slice(0, topN).map(([tag]) => tag);

  return topTags
    .map(tag => {
      const details = MEDITATION_DETAILS[tag];
      if (!details) return null;
      return {
        name: tag,
        ...details,
      };
    })
    .filter((detail): detail is MeditationDetail => detail !== null);
};
