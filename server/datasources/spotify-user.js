const { RESTDataSource } = require('apollo-datasource-rest');
const Reducers = require('../utils/reducers');

class SpotifyUser extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1';
  }

  // set spotify token with each request
  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getMyProfile() {
    const data = await this.get('/me');

    const results = data ? Reducers.userReducer(data) : {};

    return results;
  }

  async getMyPlaylists(limit = 50, offset = 0) {
    const data = await this.get('/me/playlists', {
      limit,
      offset
    });

    const results =
      data && data.items.length
        ? data.items.map(playlist => Reducers.playlistReducer(playlist))
        : [];

    return results;
  }

  async getMyTopArtists(limit = 50, offset = 0) {
    const data = await this.get('/me/top/artists', {
      limit,
      offset
    });
    const results =
      data && data.items.length ? data.items.map(artist => Reducers.artistReducer(artist)) : [];

    return results;
  }

  async getMyTopTracks(limit = 50, offset = 0) {
    const data = await this.get('/me/top/tracks', {
      limit,
      offset
    });

    const results =
      data && data.items.length ? data.items.map(track => Reducers.trackReducer(track)) : [];

    return results;
  }

  async getMySavedAlbums(limit = 25, offset = 0) {
    const data = await this.get('/me/albums', {
      limit,
      offset
    });

    const results =
      data && data.items.length ? data.items.map(({ album }) => Reducers.albumReducer(album)) : [];

    return results;
  }

  async getMySavedTracks(limit = 50, offset = 0) {
    const data = await this.get('/me/tracks', {
      limit,
      offset
    });

    const results =
      data && data.items.length ? data.items.map(({ track }) => Reducers.trackReducer(track)) : [];

    return results;
  }
}

module.exports = SpotifyUser;
