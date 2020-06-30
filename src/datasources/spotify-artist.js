const { RESTDataSource } = require('apollo-datasource-rest');
const Reducers = require('../utils/reducers');

class SpotifyArtist extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/artists';
  }

  // set spotify token with each request
  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getArtists(albumIds) {
    const data = await this.get('/', {
      ids: albumIds
    });

    const results =
      data.artists && data.artists.length
        ? data.artists.map(artist => Reducers.artistReducer(artist))
        : [];

    return results;
  }

  async getSingleArtist(artistId) {
    const data = await this.get(`/${artistId}`);
    const results = data ? Reducers.artistReducer(data) : {};

    return results;
  }

  async getSingleArtistAlbums(artistId) {
    const data = await this.get(`/${artistId}/albums`);

    const results =
      data.items && data.items.length ? data.items.map(album => Reducers.albumReducer(album)) : [];

    return results;
  }

  async getSingleArtistsRelated(artistId) {
    const data = await this.get(`/${artistId}/related-artists`);

    const results =
      data.items && data.items.length
        ? data.items.map(artist => Reducers.artistReducer(artist))
        : [];

    return results;
  }

  async getSingleArtistTopTracks(artistId) {
    const data = await this.get(`/${artistId}/top-tracks`, {
      country: 'from_token'
    });

    const results =
      data.tracks && data.tracks.length
        ? data.tracks.map(track => Reducers.trackReducer(track))
        : [];

    return results;
  }
}

module.exports = SpotifyArtist;
