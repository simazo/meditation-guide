import { renderHook, act } from "@testing-library/react";
import { useQuestion } from "../hooks/useQuestion";
import { questions } from "../../data/questions";

// モックデータ
jest.mock("../../data/questions", () => ({
  questions: [
    { id: 1, text: "質問1", tags: ["集中", "リラックス", "姿勢"] },
    { id: 2, text: "質問2", tags: ["集中", "リラックス"] },
    { id: 3, text: "質問3", tags: ["集中", "リラックス"] },
    { id: 4, text: "質問4", tags: ["集中", "平安"] },
    { id: 5, text: "質問5", tags: ["慈しみ", "姿勢"] },
  ],
}));

describe("useQuestion", () => {
  it("初期状態を確認する", () => {
    const { result } = renderHook(() => useQuestion());
    expect(result.current.currentQuestion).toEqual(questions[0]);
    expect(result.current.isLastQuestion).toBe(false);
    expect(result.current.recommendation).toBeNull();
  });

  it("質問に回答し、次の質問に進む", () => {
    const { result } = renderHook(() => useQuestion());

    act(() => {
      result.current.answerQuestion(1, true);
    });

    expect(result.current.currentQuestion).toEqual(questions[1]);
  });

  it("全ての質問に回答後、推奨結果を計算する", () => {
    const { result } = renderHook(() => useQuestion());

    act(() => {
      result.current.answerQuestion(1, true);
      result.current.answerQuestion(2, true);
      result.current.answerQuestion(3, true);
      result.current.answerQuestion(4, true);
      result.current.answerQuestion(5, true);
    });

    expect(result.current.isLastQuestion).toBe(true);

    act(() => {
      result.current.calcRecommendation();
    });

    expect(result.current.recommendation).toBe("おすすめの瞑想法は: 集中, リラックス, 姿勢");
  });
});
