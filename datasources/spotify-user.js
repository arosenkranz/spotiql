const { RESTDataSource } = require('apollo-datasource-rest');

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

    const results = data ? this.userReducer(data) : {};

    return results;
  }

  async getMyPlaylists(limit = 50, offset = 0) {
    const data = await this.get('/me/playlists', {
      limit,
      offset
    });

    const results =
      data && data.items.length ? data.items.map(playlist => this.playlistReducer(playlist)) : [];

    return results;
  }

  async getMyTopArtists(limit = 50, offset = 0) {
    const data = await this.get('/me/top/artists', {
      limit,
      offset
    });
    const results =
      data && data.items.length ? data.items.map(artist => this.artistReducer(artist)) : [];

    return results;
  }

  async getMyTopTracks(limit = 50, offset = 0) {
    const data = await this.get('/me/top/tracks', {
      limit,
      offset
    });

    const results =
      data && data.items.length ? data.items.map(track => this.trackReducer(track)) : [];

    return results;
  }

  async getMySavedAlbums(limit = 25, offset = 0) {
    const data = await this.get('/me/albums', {
      limit,
      offset
    });

    const results =
      data && data.items.length ? data.items.map(({ album }) => this.albumReducer(album)) : [];

    return results;
  }

  async getMySavedTracks(limit = 50, offset = 0) {
    const data = await this.get('/me/tracks', {
      limit,
      offset
    });

    const results =
      data && data.items.length ? data.items.map(({ track }) => this.trackReducer(track)) : [];

    return results;
  }

  userReducer(user) {
    return {
      id: user.id,
      display_name: user.display_name,
      image: user.images.length ? this.imageReducer(user.images[0]) : {},
      email: user.email,
      spotify_url: user.external_urls.spotify,
      product: user.product
    };
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
    if (!album) {
      return {};
    }
    return {
      id: album.id,
      name: album.name,
      artists: album.artists ? album.artists.map(artist => this.artistReducer(artist)) : [],
      total_tracks: album.total_tracks,
      tracks: album.tracks ? album.tracks.items.map(track => this.trackReducer(track)) : [],
      images: album.images ? album.images.map(image => this.imageReducer(image)) : [],
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
      album: this.albumReducer(track.album),
      artists: track.artists ? track.artists.map(artist => this.artistReducer(artist)) : [],
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

  playlistReducer(playlist) {
    return {
      description: playlist.description,
      spotify_url: playlist.external_urls.spotify,
      id: playlist.id,
      images: playlist.images ? playlist.images.map(image => this.imageReducer(image)) : [],
      name: playlist.name,
      owner_id: playlist.owner.id,
      owner_name: playlist.owner.display_name,
      track_count: playlist.tracks.total
    };
  }

  categoryReducer(category) {
    return {
      id: category.id,
      name: category.name,
      icons: category.icons ? category.icons.map(icon => this.imageReducer(icon)) : []
    };
  }
}

module.exports = SpotifyUser;
