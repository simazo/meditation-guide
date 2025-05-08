import React from "react";

interface ProgressProps {
  current: number;
  total: number;
}

const Progress: React.FC<ProgressProps> = ({ current, total }) => {
  return (
    <h3>
      {current} / {total}
    </h3>
  );
};

export default Progress;
