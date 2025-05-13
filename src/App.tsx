import { useEffect } from "react";
import { useQuestion } from "./hooks/useQuestion";
import Question from "./components/Question";
import Recommendation from "./components/Recommendation";
import Progress from "./components/ProgressComponent";
import type { UseQuestionResult } from "./types/useQuestionResult";
import { Box, Heading, VStack, Center } from "@chakra-ui/react";

const App: React.FC = () => {
  const {
    currentQuestion,
    answerQuestion,
    calcRecommendation,
    isLastQuestion,
    recommendation,
  }: UseQuestionResult = useQuestion();

  useEffect(() => {
    if (isLastQuestion) {
      calcRecommendation();
    }
  }, [isLastQuestion]);

  const onAnswer = (questionId: number, answer: boolean) => {
    answerQuestion(questionId, answer);
  };

  return (
    <Center minHeight="100vh" bg="gray.50" px={4}>
      <Box w="full" maxW="lg" bg="white" p={6} rounded="lg" shadow="md">
        <VStack align="stretch">

          {currentQuestion?.id ? (
            <>
              <Heading as="h1" size="xl" textAlign="center">瞑想法診断</Heading>
              <Progress current={currentQuestion.id} total={20} />
              <Question
                text={currentQuestion.text}
                onAnswer={(answer) => onAnswer(currentQuestion.id, answer)}
              />
            </>
          ) : (
            <>
              <Recommendation recommendation={recommendation} />
            </>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default App;
