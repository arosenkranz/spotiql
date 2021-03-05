import { Container, Code, Box, Icon, Heading, Stack } from '@chakra-ui/react';

function Tokens({ tokens }) {
  return (
    <Box padding={4} borderWidth="2px" borderRadius="lg">
      <Heading as="h2">Access Token</Heading>
      <Code wordBreak="break-all" p="3">
        {tokens.access_token}
      </Code>
      <Heading mt="2" as="h2">
        Refresh Token
      </Heading>
      <Code wordBreak="break-all" p="3">
        {tokens.refresh_token}
      </Code>
    </Box>
  );
}

export default Tokens;
