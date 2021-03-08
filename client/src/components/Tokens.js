import { Code, Box, Heading, useClipboard, Button, Link, Text } from '@chakra-ui/react';

const Tokens = ({ authTokens }) => {
  const { hasCopied: hasCopiedAccessToken, onCopy: copyAccessToken } = useClipboard(
    authTokens.access_token
  );
  const { hasCopied: hasCopiedRefreshToken, onCopy: copyRefreshToken } = useClipboard(
    authTokens.refresh_token
  );

  const handleGetRefresh = () => {
    const queryUrl = `/auth/spotify/refresh?refresh_token=${authTokens.refresh_token}`;

    fetch(queryUrl)
      .then((res) => res.json())
      .then((tokenData) => {
        console.log(tokenData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box padding={4}>
      {!authTokens.access_token ? (
        <>
          <Link
            fontSize="xl"
            display="inline-block"
            px="5"
            py="3"
            backgroundColor="gray.600"
            color="gray.100"
            transition="all 0.25s ease-in-out"
            _hover={{
              backgroundColor: 'gray.700',
            }}
            href={`${
              process.env.REACT_APP_SERVER_URL || 'https://spotiql.herokuapp.com'
            }/auth/spotify/login?redirect_uri=${window.location.href}`}
          >
            Get Access Token
          </Link>
        </>
      ) : (
        <>
          <Heading as="h3" fontSize="2xl" my="2">
            Access Token
          </Heading>
          <Code
            backgroundColor="gray.800"
            color="white"
            py={5}
            pl={5}
            pr="140px"
            isTruncated={true}
            maxWidth="100%"
            position="relative"
            scrollX="scroll"
          >
            {authTokens.access_token}
            <Button
              colorScheme="green"
              onClick={copyAccessToken}
              position="absolute"
              top="2.5"
              right="2.5"
            >
              {hasCopiedAccessToken ? 'Copied' : 'Copy'}
            </Button>
          </Code>
          <Heading as="h3" my="2" fontSize="2xl">
            Refresh Token
          </Heading>
          <Code
            backgroundColor="gray.800"
            color="white"
            isTruncated={true}
            py={5}
            pl={5}
            pr="140px"
            maxWidth="100%"
            position="relative"
          >
            {authTokens.refresh_token}
            <Button
              colorScheme="green"
              onClick={copyRefreshToken}
              position="absolute"
              top="2.5"
              right="2.5"
            >
              {hasCopiedRefreshToken ? 'Copied' : 'Copy'}
            </Button>
          </Code>
        </>
      )}
    </Box>
  );
};

export default Tokens;
