const { RESTDataSource } = require('apollo-datasource-rest');
const Reducers = require('../utils/reducers');

class SpotifyTrack extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1';
  }

  // set spotify token with each request
  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  // get single track
  async getSingleTrack(trackId) {
    const data = await this.get(`/tracks/${trackId}`);

    const results = data ? Reducers.trackReducer(data) : {};

    return results;
  }

  // get several tracks
  async getTracks(ids) {
    const data = await this.get('/tracks', {
      ids: ids.join(''),
      market: 'from_token'
    });

    const results =
      data.tracks && data.tracks.length
        ? data.tracks.map(track => Reducers.trackReducer(track))
        : [];

    return results;
  }

  // get audio analysis
  async getAudioAnalysis(trackId) {
    const data = await this.get(`/audio-analysis/${trackId}`);

    const results = data ? Reducers.audioAnalysisReducer(data) : {};

    return results;
  }

  // get audio features
  async getAudioFeatures(trackId) {
    const data = await this.get(`/audio-features/${trackId}`);

    const results = data ? Reducers.audioFeatureReducer(data) : {};

    return results;
  }
}

module.exports = SpotifyTrack;
