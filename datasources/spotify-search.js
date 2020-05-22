require('dotenv').config();
const { RESTDataSource } = require('apollo-datasource-rest');

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
        ? data.artists.items.map(artist => this.artistReducer(artist))
        : [];

    results.albums =
      data.albums && data.albums.items.length
        ? data.albums.items.map(album => this.albumReducer(album))
        : [];

    results.tracks =
      data.tracks && data.tracks.items.length
        ? data.tracks.items.map(track => this.trackReducer(track))
        : [];

    return results;
  }

  // artist reducer
  artistReducer(artist) {
    return {
      name: artist.name,
      genres: artist.genres,
      images:
        artist.images && artist.images.length
          ? artist.images.map(image => this.imageReducer(image))
          : [],
      uri: artist.uri
    };
  }

  // album reducer
  albumReducer(album) {
    return {
      name: album.name,
      artists: album.artists.map(artist => this.artistReducer(artist)),
      total_tracks: album.total_tracks,
      images: album.images.map(image => this.imageReducer(image)),
      uri: album.uri
    };
  }

  // track reducer
  trackReducer(track) {
    return {
      name: track.name,
      uri: track.uri,
      duration: track.duration_ms,
      track_number: track.track_number,
      artists: track.artists.map(artist => this.artistReducer(artist)),
      album: this.albumReducer(track.album)
    };
  }

  imageReducer(image) {
    return {
      url: image.url,
      height: image.height,
      width: image.width
    };
  }
}

module.exports = SpotifySearch;
