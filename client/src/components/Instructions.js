import { Box, Heading, Link, Text } from '@chakra-ui/react';

const instructionList = [
  {
    title: '',
    description: '',
  },
];

const Step = ({ stepNum, title, children }) => {
  return (
    <Box>
      <Heading>
        {stepNum}. {title}
      </Heading>
      <Text>{children}</Text>
    </Box>
  );
};

const Instructions = () => {
  return (
    <Box width="100%" padding={4}>
      <Heading as="h2">Instructions</Heading>
    </Box>
  );
};

export default Instructions;
