const { RESTDataSource } = require('apollo-datasource-rest');

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
        ? data.playlists.items.map(playlist => this.playlistReducer(playlist))
        : [];

    return results;
  }

  async getNewReleases(limit = 50, offset = 0) {
    const data = await this.get('/browse/new-releases', {
      limit,
      offset
    });
    console.log(data);
    const results =
      data.albums && data.albums.items.length
        ? data.albums.items.map(album => this.albumReducer(album))
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
        ? data.categories.items.map(category => this.categoryReducer(category))
        : [];

    return results;
  }

  async getSingleCategory(categoryId = 'chill') {
    const data = await this.get(`/browse/categories/${categoryId}`);
    const results = data ? this.categoryReducer(data) : {};
    return results;
  }

  async getCategoryPlaylists(categoryId = 'chill') {
    const data = await this.get(`/browse/categories/${categoryId}/playlists`);
    const results =
      data.playlists && data.playlists.items.length
        ? data.playlists.items.map(playlist => this.playlistReducer(playlist))
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
      artists: album.artists ? album.artists.map(artist => this.artistReducer(artist)) : [],
      total_tracks: album.total_tracks,
      tracks: album.tracks ? album.tracks.items.map(track => this.trackReducer(track)) : [],
      images: album.images ? album.images.map(image => this.imageReducer(image)) : [],
      uri: album.uri
    };
  }

  // track reducer
  trackReducer(track) {
    console.log(track.album.name);
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

module.exports = SpotifyBrowse;
