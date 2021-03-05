const { RESTDataSource } = require('apollo-datasource-rest');
const Reducers = require('../utils/reducers');

class SpotifyAlbum extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/albums';
  }

  // set spotify token with each request
  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getAlbums(albumIds) {
    const data = await this.get('/', {
      ids: albumIds
    });

    const results =
      data.albums && data.albums.length
        ? data.albums.map(album => Reducers.albumReducer(album))
        : [];

    return results;
  }

  async getSingleAlbum(albumId) {
    const data = await this.get(`/${albumId}`);
    const results = data ? Reducers.albumReducer(data) : {};

    return results;
  }

  async getSingleAlbumTracks(albumId) {
    const data = await this.get(`/${albumId}/tracks`);

    const results =
      data.items && data.items.length ? data.items.map(track => Reducers.trackReducer(track)) : [];

    return results;
  }
}

module.exports = SpotifyAlbum;
