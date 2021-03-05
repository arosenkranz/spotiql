import { useState, useEffect } from 'react';
import { Container, Code, Box, Icon, Heading, Stack } from '@chakra-ui/react';
import { FaSpotify } from 'react-icons/fa';

import Tokens from './components/Tokens';

function App() {
  const [tokens, setTokensObj] = useState(null);

  useEffect(() => {
    if (window.location.hash) {
      const hashObj = window.location.hash
        ?.substr(1)
        .split('&')
        .map((v) => v.split('='))
        .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {});

      setTokensObj(hashObj);
    }
  }, []);

  const handleGetRefresh = () => {
    const queryUrl = `/auth/spotify/refresh?refresh_token=${tokens.refresh_token}`;

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
    <div>
      <section>
        <Container padding={3} maxW="lg" my={5} overflow="scroll">
          <Stack
            direction={['column', 'row']}
            spacing={6}
            alignItems="center"
            justifyContent="center"
            padding={4}
          >
            <Icon as={FaSpotify} boxSize={20} />
            <Heading as="h1" size="3xl">
              SpotiQL
            </Heading>
          </Stack>
          {!tokens && (
            <Box padding={3}>
              <a
                href={`${
                  process.env.REACT_APP_SERVER_URL || 'https://spotiql.herokuapp.com'
                }/auth/spotify/login?redirect_uri=${window.location.href}`}
              >
                Login
              </a>
            </Box>
          )}
          {tokens && <Tokens tokens={tokens} />}
        </Container>
      </section>
    </div>
  );
}

export default App;
