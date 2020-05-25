const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    // SEARCH
    search: async (_, args, { dataSources: { spotifySearch }, token }) => {
      if (token) {
        const results = await spotifySearch.search(args.q, args.type);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    // ALBUMS
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
    },
    // ARTISTS
    getArtists: async (_, args, { dataSources: { spotifyArtist }, token }) => {
      if (token) {
        const results = await spotifyArtist.getArtists(args.ids);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getSingleArtist: async (_, args, { dataSources: { spotifyArtist }, token }) => {
      if (token) {
        const results = await spotifyArtist.getSingleArtist(args.id);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getSingleArtistAlbums: async (_, args, { dataSources: { spotifyArtist }, token }) => {
      if (token) {
        const results = await spotifyArtist.getSingleArtistAlbums(args.id);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getSingleArtistRelated: async (_, args, { dataSources: { spotifyArtist }, token }) => {
      if (token) {
        const results = await spotifyArtist.getSingleArtistRelated(args.id);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getSingleArtistTopTracks: async (_, args, { dataSources: { spotifyArtist }, token }) => {
      if (token) {
        const results = await spotifyArtist.getSingleArtistTopTracks(args.id);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    }
  }
};

module.exports = resolvers;
