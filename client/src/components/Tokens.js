import { Code, Box, Heading, useClipboard, Button } from '@chakra-ui/react';

function Tokens({ tokens }) {
  console.log(tokens.access_token);
  const { hasCopied: hasCopiedAccessToken, onCopy: copyAccessToken } = useClipboard(
    tokens.access_token
  );
  const { hasCopied: hasCopiedRefreshToken, onCopy: copyRefreshToken } = useClipboard(
    tokens.refresh_token
  );
  return (
    <Box padding={4} borderWidth="2px" borderRadius="lg">
      <Heading as="h2">Access Token</Heading>
      <Code wordBreak="break-all" py={5} pl={5} pr="100px" position="relative">
        {tokens.access_token}
        <Button
          colorScheme="blackAlpha"
          onClick={copyAccessToken}
          position="absolute"
          top="1"
          right="1"
        >
          {hasCopiedAccessToken ? 'Copied' : 'Copy'}
        </Button>
      </Code>
      <Heading mt="2" as="h2">
        Refresh Token
      </Heading>
      <Code wordBreak="break-all" py={5} pl={5} pr="100px" position="relative">
        {tokens.refresh_token}
        <Button
          colorScheme="blackAlpha"
          onClick={copyRefreshToken}
          position="absolute"
          top="1"
          right="1"
        >
          {hasCopiedRefreshToken ? 'Copied' : 'Copy'}
        </Button>
      </Code>
    </Box>
  );
}

export default Tokens;
