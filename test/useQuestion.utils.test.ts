import { countTags, sortTagsByCount, createRecommendation } from "../hooks/useQuestion";

// モックデータ
jest.mock("../data/questions", () => ({
  questions: [
    { id: 1, text: "質問1", tags: ["集中", "姿勢"] },
    { id: 2, text: "質問2", tags: ["集中"] },
    { id: 3, text: "質問3", tags: ["リラックス"] },
  ],
}));

describe("countTags", () => {
  it("回答に基づいてタグを正しく集計する", () => {
    const answers = { 1: true, 2: false, 3: true };
    const result = countTags(answers);
    expect(result).toEqual({ 集中: 1, 姿勢: 1, リラックス: 1 });
  });
});

describe("sortTagsByCount", () => {
  it("タグを出現回数順にソートする", () => {
    const tagCount = { 集中: 3, 姿勢: 1, リラックス: 2 };
    const result = sortTagsByCount(tagCount);
    expect(result).toEqual([
      ["集中", 3],
      ["リラックス", 2],
      ["姿勢", 1],
    ]);
  });
});

describe("createRecommendation", () => {
  it("トップNのタグを使用して推奨結果を生成する", () => {
    const sortedTags: [string, number][] = [
      ["集中", 3],
      ["リラックス", 2],
      ["姿勢", 1],
    ];
    const result = createRecommendation(sortedTags, 2);
    expect(result).toBe("おすすめの瞑想法は: 集中, リラックス");
  });

  it("タグが空の場合、適切なメッセージを返す", () => {
    const result = createRecommendation([], 3);
    expect(result).toBe("適した瞑想法が見つかりませんでした。");
  });
});
