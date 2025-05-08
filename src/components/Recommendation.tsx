import React from "react";

const Recommendation: React.FC<{ recommendation: string | null }> = ({ recommendation }) => (
  <h2>{recommendation || "結果を計算中..."}</h2>
);

export default Recommendation;
