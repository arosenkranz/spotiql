const { RESTDataSource } = require('apollo-datasource-rest');
const Reducers = require('../utils/reducers');

class SpotifyPlaylists extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/playlists';
  }

  // set spotify token with each request
  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getPlaylist(playlistId) {
    const data = await this.get(`/${playlistId}`);
    const results = data ? Reducers.playlistReducer(data) : {};
    return results;
  }

  async getPlaylistTracks(playlistId, limit = 100, offset = 0) {
    const data = await this.get(`/${playlistId}/tracks`, {
      limit,
      offset
    });

    const results = {
      tracks:
        data && data.items.length
          ? data.items.map(({ track }) => Reducers.trackReducer(track))
          : [],
      nextPage: data && data.next ? data.next : null
    };

    return results;
  }
}

module.exports = SpotifyPlaylists;
