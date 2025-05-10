import type {ProgressProps} from "../types/progress";
import { Box, Text, Progress } from "@chakra-ui/react";

const ProgressComponent: React.FC<ProgressProps> = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  return (
    <Box>
      <Text mb={2}>{current} / {total}</Text>
      <Progress.Root value={percentage} max={100} colorPalette={"orange"} size="lg">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
        <Progress.Label />
        <Progress.ValueText />
      </Progress.Root>
    </Box>
  );
};

export default ProgressComponent;
