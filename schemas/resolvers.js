const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    search: async (_, args, { dataSources: { spotifySearch }, token }) => {
      if (token) {
        const results = await spotifySearch.search(args.q, args.type);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getAlbums: async (_, args, { dataSources: { spotifyAlbum }, token }) => {
      if (token) {
        const results = await spotifyAlbum.getAlbums(args.ids);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getSingleAlbum: async (_, args, { dataSources: { spotifyAlbum }, token }) => {
      if (token) {
        const results = await spotifyAlbum.getSingleAlbum(args.id);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getSingleAlbumTracks: async (_, args, { dataSources: { spotifyAlbum }, token }) => {
      if (token) {
        const results = await spotifyAlbum.getSingleAlbumTracks(args.id);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    }
  }
};

module.exports = resolvers;
