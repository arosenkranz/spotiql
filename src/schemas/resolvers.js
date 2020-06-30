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
          args.seedArtists,
          args.seedTracks,
          args.seedGenres
        );
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },

    // me
    getMyProfile: async (_, __, { dataSources: { spotifyUser }, token }) => {
      if (token) {
        const results = await spotifyUser.getMyProfile();
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getMyPlaylists: async (_, { limit, offset }, { dataSources: { spotifyUser }, token }) => {
      if (token) {
        const results = await spotifyUser.getMyPlaylists(limit, offset);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getMyTopArtists: async (_, { limit, offset }, { dataSources: { spotifyUser }, token }) => {
      if (token) {
        const results = await spotifyUser.getMyTopArtists(limit, offset);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getMyTopTracks: async (_, { limit, offset }, { dataSources: { spotifyUser }, token }) => {
      if (token) {
        const results = await spotifyUser.getMyTopTracks(limit, offset);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getMySavedAlbums: async (_, { limit, offset }, { dataSources: { spotifyUser }, token }) => {
      if (token) {
        const results = await spotifyUser.getMySavedAlbums(limit, offset);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getMySavedTracks: async (_, { limit, offset }, { dataSources: { spotifyUser }, token }) => {
      if (token) {
        const results = await spotifyUser.getMySavedTracks(limit, offset);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },

    // playlists
    getPlaylist: async (_, { playlistId }, { dataSources: { spotifyPlaylists }, token }) => {
      if (token) {
        const results = await spotifyPlaylists.getPlaylist(playlistId);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getPlaylistTracks: async (
      _,
      { playlistId, limit, offset },
      { dataSources: { spotifyPlaylists }, token }
    ) => {
      if (token) {
        const results = await spotifyPlaylists.getPlaylistTracks(playlistId, limit, offset);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },

    // player
    currentPlayerState: async (_, __, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.currentPlayerState();
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    recentlyPlayed: async (_, { limit }, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.recentlyPlayed(limit);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getDevices: async (_, __, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.getDevices();
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    getCurrentlyPlaying: async (_, __, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.getCurrentlyPlaying();
        return results;
      }
      throw new AuthenticationError('Not logged in');
    }
  },
  // Mutation
  Mutation: {
    // player
    nextTrack: async (_, { deviceId }, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.nextTrack(deviceId);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    previousTrack: async (_, { deviceId }, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.previousTrack(deviceId);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    addToQueue: async (_, { uri, deviceId }, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.addToQueue(uri, deviceId);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    pauseTrack: async (_, { deviceId }, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.pauseTrack(deviceId);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    playTrack: async (_, { deviceId }, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.playTrack(deviceId);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    setRepeat: async (_, { state, deviceId }, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.setRepeat(state, deviceId);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    seekTrack: async (_, { position, deviceId }, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.seekTrack(position, deviceId);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    shufflePlayer: async (_, { state, deviceId }, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.shufflePlayer(state, deviceId);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    transferPlayback: async (_, { deviceIds }, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.transferPlayback(deviceIds);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    },
    setVolume: async (_, { volume, deviceId }, { dataSources: { spotifyPlayer }, token }) => {
      if (token) {
        const results = await spotifyPlayer.setVolume(volume, deviceId);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    }
  }
};

module.exports = resolvers;
