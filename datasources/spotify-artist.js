const { RESTDataSource } = require('apollo-datasource-rest');

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
        ? data.artists.map(artist => this.artistReducer(artist))
        : [];

    return results;
  }

  async getSingleArtist(artistId) {
    const data = await this.get(`/${artistId}`);
    const results = data ? this.artistReducer(data) : {};

    return results;
  }

  async getSingleArtistAlbums(artistId) {
    const data = await this.get(`/${artistId}/albums`);

    const results =
      data.items && data.items.length ? data.items.map(album => this.albumReducer(album)) : [];

    return results;
  }

  async getSingleArtistsRelated(artistId) {
    const data = await this.get(`/${artistId}/related-artists`);

    const results =
      data.items && data.items.length ? data.items.map(artist => this.artistReducer(artist)) : [];

    return results;
  }

  async getSingleArtistTopTracks(artistId) {
    const data = await this.get(`/${artistId}/top-tracks`, {
      country: 'from_token'
    });

    const results =
      data.tracks && data.tracks.length ? data.tracks.map(track => this.trackReducer(track)) : [];

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
      tracks:
        album.tracks && album.tracks.length
          ? album.tracks.items.map(track => this.trackReducer(track))
          : [],
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

module.exports = SpotifyArtist;
