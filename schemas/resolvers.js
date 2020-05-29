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
    },
    // Browse
    getFeaturedPlaylists: async (_, args, { dataSources: { spotifyBrowse }, token }) => {
      if (token) {
        const results = await spotifyBrowse.getFeaturedPlaylists(args.limit, args.offset);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getNewReleases: async (_, args, { dataSources: { spotifyBrowse }, token }) => {
      if (token) {
        const results = await spotifyBrowse.getNewReleases(args.limit, args.offset);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getGenres: async (_, __, { dataSources: { spotifyBrowse }, token }) => {
      if (token) {
        const results = await spotifyBrowse.getGenres();
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getCategories: async (_, args, { dataSources: { spotifyBrowse }, token }) => {
      if (token) {
        const results = await spotifyBrowse.getCategories(args.limit, args.offset);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getSingleCategory: async (_, args, { dataSources: { spotifyBrowse }, token }) => {
      if (token) {
        const results = await spotifyBrowse.getSingleCategory(args.categoryId);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getCategoryPlaylists: async (_, args, { dataSources: { spotifyBrowse }, token }) => {
      if (token) {
        const results = await spotifyBrowse.getCategoryPlaylists(args.categoryId);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getRecommendationTracks: async (_, args, { dataSources: { spotifyBrowse }, token }) => {
      if (token) {
        const results = await spotifyBrowse.getRecommendationTracks(
          args.limit,
          args.seed_artists,
          args.seed_tracks,
          args.seed_genres
        );
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },

    // me
    getMyProfile: async (_, args, { dataSources: { spotifyMe }, token }) => {
      if (token) {
        const results = await spotifyMe.getMyProfile();
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getMyPlaylists: async (_, { limit, offset }, { dataSources: { spotifyMe }, token }) => {
      if (token) {
        const results = await spotifyMe.getMyPlaylists(limit, offset);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getMyTopArtists: async (_, { limit, offset }, { dataSources: { spotifyMe }, token }) => {
      if (token) {
        const results = await spotifyMe.getMyTopArtists(limit, offset);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getMyTopTracks: async (_, { limit, offset }, { dataSources: { spotifyMe }, token }) => {
      if (token) {
        const results = await spotifyMe.getMyTopTracks(limit, offset);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    }
  }
};

module.exports = resolvers;
