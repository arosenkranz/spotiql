const { RESTDataSource } = require('apollo-datasource-rest');

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
      data.albums && data.albums.length ? data.albums.map(album => this.albumReducer(album)) : [];

    return results;
  }

  async getSingleAlbum(albumId) {
    const data = await this.get(`/${albumId}`);
    const results = data ? this.albumReducer(data) : {};

    return results;
  }

  async getSingleAlbumTracks(albumId) {
    const data = await this.get(`/${albumId}/tracks`);

    const results =
      data.items && data.items.length ? data.items.map(track => this.trackReducer(track)) : [];

    return results;
  }

  // artist reducer
  artistReducer(artist) {
    return {
      id: artist.id,
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
      id: album.id,
      name: album.name,
      artists: album.artists.map(artist => this.artistReducer(artist)),
      total_tracks: album.total_tracks,
      tracks: album.tracks.items.map(track => this.trackReducer(track)),
      images: album.images.map(image => this.imageReducer(image)),
      uri: album.uri
    };
  }

  // track reducer
  trackReducer(track) {
    return {
      id: track.id,
      name: track.name,
      uri: track.uri,
      duration: track.duration_ms,
      track_number: track.track_number,
      artists: track.artists.map(artist => this.artistReducer(artist)),
      preview_url: track.preview_url
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

module.exports = SpotifyAlbum;
