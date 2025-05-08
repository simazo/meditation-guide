import type {ProgressProps} from "../types/progress";

const Progress: React.FC<ProgressProps> = ({ current, total }) => {
  return (
    <h3>
      {current} / {total}
    </h3>
  );
};

export default Progress;
