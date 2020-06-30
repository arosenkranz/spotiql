class Reducers {
  userReducer(user) {
    return {
      id: user.id || null,
      displayName: user.display_name || null,
      image: user.images.length ? this.imageReducer(user.images[0]) : {},
      email: user.email || null,
      spotifyUrl: user.external_urls.spotify || null,
      product: user.product || null
    };
  }

  // artist reducer
  artistReducer(artist) {
    return {
      id: artist.id || null,
      name: artist.name || null,
      genres: artist.genres || null,
      images:
        artist.images && artist.images.length
          ? artist.images.map(image => this.imageReducer(image))
          : [],
      uri: artist.uri || null
    };
  }

  // album reducer
  albumReducer(album) {
    return {
      id: album.id || null,
      name: album.name || null,
      artists: album.artists ? album.artists.map(artist => this.artistReducer(artist)) : [],
      totalTracks: album.total_tracks || null,
      tracks: album.tracks ? album.tracks.items.map(track => this.trackReducer(track)) : [],
      images: album.images ? album.images.map(image => this.imageReducer(image)) : [],
      uri: album.uri || null
    };
  }

  // track reducer
  trackReducer(track) {
    return {
      id: track.id || null,
      name: track.name || null,
      uri: track.uri || null,
      duration: track.duration_ms || null,
      trackNumber: track.track_number || null,
      album: this.album ? this.albumReducer(track.album) : null,
      artists: track.artists ? track.artists.map(artist => this.artistReducer(artist)) : [],
      previewUrl: track.preview_url
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
      description: playlist.description || null,
      spotifyUrl: playlist.external_urls.spotify || null,
      id: playlist.id || null,
      images: playlist.images ? playlist.images.map(image => this.imageReducer(image)) : [],
      name: playlist.name || null,
      ownerId: playlist.owner.id || null,
      ownerName: playlist.owner.display_name || null,
      trackCount: playlist.tracks.total || null
    };
  }

  categoryReducer(category) {
    return {
      id: category.id || null,
      name: category.name || null,
      icons: category.icons ? category.icons.map(icon => this.imageReducer(icon)) : []
    };
  }

  playerReducer(player) {
    return {
      deviceId: player.device.id || null,
      deviceName: player.device.name || null,
      deviceType: player.device.type || null,
      deviceVolume: player.device.volume_percent || null,
      isPlaying: player.is_playing || null,
      track_info: {
        album: player.item ? this.albumReducer(player.item.album) : null,
        artists: player.item ? player.item.artists.map(artist => this.artistReducer(artist)) : null,
        trackName: player.item ? player.item.name : null,
        trackId: player.item ? player.item.id : null
      }
    };
  }

  deviceReducer(device) {
    return {
      deviceId: device.id || null,
      isActive: device.is_active || null,
      isPrivateSession: device.is_private_session || null,
      isRestricted: device.is_restricted || null,
      deviceName: device.name || null,
      deviceType: device.type || null,
      deviceVolume: device.volume_percent || null
    };
  }
}

module.exports = new Reducers();
