import { Box, Heading, Text } from "@chakra-ui/react";

interface RecommendInfoSectionProps {
  title: string;
  content: string;
}

const RecommendInfoSection: React.FC<RecommendInfoSectionProps> = ({ title, content }) => {
  return (
    <Box gap={2} p={4}>
      <Heading size="xl" alignItems="center" color="teal.600" >
        {title}
      </Heading>
      <Text letterSpacing="wide" whiteSpace="pre-line">
        {content}
      </Text>
    </Box>
  );
}
export default RecommendInfoSection;