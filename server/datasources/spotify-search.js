const { RESTDataSource } = require('apollo-datasource-rest');
const Reducers = require('../utils/reducers');

class SpotifySearch extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/search';
  }

  // set spotify token with each request
  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  // use enum for limited type choices
  // show,episode,playlist
  async search(query = 'Small Black', type = 'artist,album,track') {
    const data = await this.get('/', {
      q: query,
      type,
      market: 'from_token',
      order_by: 'most_viewed'
    });

    const results = {};

    results.artists =
      data.artists && data.artists.items.length
        ? data.artists.items.map(artist => Reducers.artistReducer(artist))
        : [];

    results.albums =
      data.albums && data.albums.items.length
        ? data.albums.items.map(album => Reducers.albumReducer(album))
        : [];

    results.tracks =
      data.tracks && data.tracks.items.length
        ? data.tracks.items.map(track => Reducers.trackReducer(track))
        : [];

    return results;
  }
}

module.exports = SpotifySearch;
