import { useState, useEffect } from 'react';

import { Box, Icon, Heading, Flex, Image } from '@chakra-ui/react';
import { FaSpotify } from 'react-icons/fa';

import Tokens from './components/Tokens';
import Instructions from './components/Instructions';

const App = () => {
  const [tokens, setTokens] = useState({ access_token: '', refresh_token: '' });

  useEffect(() => {
    if (window.location.hash) {
      const hashObj = window.location.hash
        ?.substr(1)
        .split('&')
        .map((v) => v.split('='))
        .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {});

      setTokens(hashObj);

      window.history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search
      );
    }
  }, []);
  return (
    <Box>
      <Flex
        alignItems="stretch"
        width="100%"
        minHeight="100vh"
        p={10}
        position="sticky"
        bgGradient="linear(to-b, rgba(121, 40, 202, 0.7), rgba(255, 0, 128, 0.7))"
      >
        <Box flex={['0 0 100%', null, '2 0 60%']} maxWidth="100%" overflow="hidden">
          <Flex alignItems="center" width="100%" justifyContent="flex-start" padding={4} mb={8}>
            <Icon as={FaSpotify} boxSize={20} fill="gray.900" pr="5" />
            <Heading as="h1" size="3xl" color="gray.900">
              SpotiQL
            </Heading>
          </Flex>
          <Tokens authTokens={tokens} />
          <Instructions />
        </Box>

        <Box
          flex={['0 0 100%', null, '1 0 40%']}
          position="sticky"
          top="0"
          maxWidth="100%"
          overflow="hidden"
        >
          <Image
            src="/assets/images/home-pic.jpg"
            alt=""
            fit="cover"
            position="absolute"
            width="100%"
            height="100%"
            top="0"
            left="0"
            loading="lazy"
          />
          <Box
            position="absolute"
            width="100%"
            height="100%"
            top="0"
            left="0"
            bgGradient="linear(to-b, rgba(121, 40, 202, 0.3), rgba(255, 0, 128, 0.3))"
            backgroundBlendMode="screen"
            z-index="2"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default App;
