const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');
const routes = require('./routes');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const {
  SpotifySearch,
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyBrowse,
  SpotifyUser,
  SpotifyPlaylists
} = require('./datasources');

const PORT = process.env.PORT || 4000;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      spotifySearch: new SpotifySearch(),
      spotifyAlbum: new SpotifyAlbum(),
      spotifyArtist: new SpotifyArtist(),
      spotifyBrowse: new SpotifyBrowse(),
      spotifyUser: new SpotifyUser(),
      spotifyPlaylists: new SpotifyPlaylists()
    };
  },
  context: authMiddleware
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));
app.use(routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
