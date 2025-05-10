import { Button, Text, VStack, HStack } from "@chakra-ui/react";

const Question: React.FC<{
  text: string;
  onAnswer: (answer: boolean) => void;
}> = ({ text, onAnswer }) => (
  <VStack>
    <Text fontSize="xl">{text}</Text>
    <HStack>
      <Button colorPalette="blue" onClick={() => onAnswer(true)} minW="100px">
        はい
      </Button>
      <Button colorPalette="cyan" onClick={() => onAnswer(false)} minW="100px">
        いいえ
      </Button>
    </HStack>
  </VStack>
);

export default Question;
