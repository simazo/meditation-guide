import type { MeditationDetail } from "../types/useQuestionResult";
import { Box, Heading, VStack } from "@chakra-ui/react";
import RecommendInfoSection from "./RecommendInfoSection";

interface Props {
  recommendation: MeditationDetail[] | null;
}

const Recommendation: React.FC<Props> = ({ recommendation }) => {
  if (!recommendation || recommendation.length === 0) {
    return <p>適した瞑想法が見つかりませんでした。</p>;
  }
  return (
    <VStack>
      {recommendation.map((item) => (
        <Box key={item.name} p={4} borderWidth="1px" borderRadius="2xl" boxShadow="lg" bg="gray.50">
          <Box width="100%" textAlign="center"><Heading size="3xl" color="teal.600" >{item.name}</Heading></Box>
          <RecommendInfoSection title="概要" content={item.description} />
          <RecommendInfoSection title="目的" content={item.purpose} />
          <RecommendInfoSection title="効果" content={item.effect} />
          <RecommendInfoSection title="方法" content={item.method} />
        </Box>
      ))}
    </VStack>
  );
};


export default Recommendation;
