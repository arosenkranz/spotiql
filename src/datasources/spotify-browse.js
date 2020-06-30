const { RESTDataSource } = require('apollo-datasource-rest');
const Reducers = require('../utils/reducers');

class SpotifyBrowse extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1';
  }

  // set spotify token with each request
  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getFeaturedPlaylists(limit = 50, offset = 0) {
    const data = await this.get('/browse/featured-playlists', {
      limit,
      offset
    });
    const results =
      data.playlists && data.playlists.items.length
        ? data.playlists.items.map(playlist => Reducers.playlistReducer(playlist))
        : [];

    return results;
  }

  async getNewReleases(limit = 50, offset = 0) {
    const data = await this.get('/browse/new-releases', {
      limit,
      offset
    });
    const results =
      data.albums && data.albums.items.length
        ? data.albums.items.map(album => Reducers.albumReducer(album))
        : [];

    return results;
  }

  async getGenres() {
    const data = await this.get('/recommendations/available-genre-seeds');

    const results = data.genres ? data.genres.map(genre => ({ genre_name: genre })) : [];

    return results;
  }

  async getCategories(limit = 50, offset = 0) {
    const data = await this.get('/browse/categories', {
      limit,
      offset
    });

    const results =
      data.categories && data.categories.items.length
        ? data.categories.items.map(category => Reducers.categoryReducer(category))
        : [];

    return results;
  }

  async getSingleCategory(categoryId = 'chill') {
    const data = await this.get(`/browse/categories/${categoryId}`);
    const results = data ? Reducers.categoryReducer(data) : {};
    return results;
  }

  async getCategoryPlaylists(categoryId = 'chill') {
    const data = await this.get(`/browse/categories/${categoryId}/playlists`);
    const results =
      data.playlists && data.playlists.items.length
        ? data.playlists.items.map(playlist => Reducers.playlistReducer(playlist))
        : [];

    return results;
  }

  async getRecommendationTracks(
    limit = 100,
    seed_artists = [],
    seed_tracks = [],
    seed_genres = []
  ) {
    const data = await this.get('/recommendations', {
      limit,
      seed_artists,
      seed_tracks,
      seed_genres
    });

    const results =
      data.tracks && data.tracks.length
        ? data.tracks.map(track => Reducers.trackReducer(track))
        : [];

    return results;
  }
}

module.exports = SpotifyBrowse;
