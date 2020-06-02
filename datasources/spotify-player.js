const { RESTDataSource } = require('apollo-datasource-rest');

class SpotifyPlayer extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/me/player';
  }

  // set spotify token with each request
  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async currentPlayerState() {
    const data = await this.get('/');
    const results = data ? this.playerReducer(data) : {};
    return results;
  }

  async recentlyPlayed(limit = 50) {
    const data = await this.get('/recently-played', {
      limit
    });

    const results =
      data && data.items.length ? data.items.map(({ track }) => this.trackReducer(track)) : [];

    return results;
  }

  async getDevices() {
    const data = await this.get('/devices');

    const results =
      data && data.devices.length ? data.devices.map(device => this.deviceReducer(device)) : [];

    return results;
  }

  async getCurrentlyPlaying() {
    const data = await this.get('/currently-playing');

    const results = data && data.item ? this.trackReducer(data.item) : {};

    return results;
  }

  async nextTrack(deviceId) {
    const params = `${deviceId ? `?device_id=${deviceId}` : ''}`;

    try {
      await this.post(`/next${params}`);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async previousTrack(deviceId) {
    const params = `${deviceId ? `?device_id=${deviceId}` : ''}`;

    try {
      await this.post(`/previous/${params}`);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async addToQueue(uri, deviceId) {
    const params = `?uri=${uri}${deviceId ? `&device_id=${deviceId}` : ''}`;

    try {
      await this.post(`/queue/${params}`);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async pauseTrack(deviceId) {
    const params = `${deviceId ? `?device_id=${deviceId}` : ''}`;

    try {
      await this.put(`/pause/${params}`);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async playTrack(deviceId) {
    const params = `${deviceId ? `?device_id=${deviceId}` : ''}`;

    try {
      await this.put(`/play/${params}`);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async setRepeat(state = 'off', deviceId) {
    const params = `?state=${state}${deviceId ? `&device_id=${deviceId}` : ''}`;

    try {
      await this.put(`/repeat/${params}`);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async seekTrack(position = 0, deviceId) {
    const params = `?position_ms=${position}${deviceId ? `&device_id=${deviceId}` : ''}`;

    try {
      await this.put(`/seek/${params}`);
      return true;
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      return false;
    }
  }

  async shufflePlayer(state = 'false', deviceId) {
    const params = `?state=${state}${deviceId ? `&device_id=${deviceId}` : ''}`;

    try {
      await this.put(`/shuffle/${params}`);
      return true;
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      return false;
    }
  }

  async transferPlayback(deviceIds) {
    try {
      await this.put('/shuffle', {
        device_id: deviceIds
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async setVolume(volume = 75, deviceId) {
    const params = `?volume=${volume}${deviceId ? `&device_id=${deviceId}` : ''}`;

    try {
      await this.put(`/volume/${params}`);
      return null;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  deviceReducer(device) {
    return {
      device_id: device.id,
      is_active: device.is_active,
      is_private_session: device.is_private_session,
      is_restricted: device.is_restricted,
      device_name: device.name,
      device_type: device.type,
      device_volume: device.volume_percent
    };
  }

  playerReducer(player) {
    return {
      device_id: player.device.id,
      device_name: player.device.name,
      device_type: player.device.type,
      device_volume: player.device.volume_percent,
      is_playing: player.is_playing,
      track_info: {
        album: player.item ? this.albumReducer(player.item.album) : null,
        artists: player.item ? player.item.artists.map(artist => this.artistReducer(artist)) : null,
        track_name: player.item ? player.item.name : null,
        track_id: player.item ? player.item.id : null
      }
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
    return {
      id: album.id,
      name: album.name,
      artists: album.artists ? album.artists.map(artist => this.artistReducer(artist)) : null,
      total_tracks: album.total_tracks,
      tracks: album.tracks ? album.tracks.items.map(track => this.trackReducer(track)) : null,
      images: album.images ? album.images.map(image => this.imageReducer(image)) : null,
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

module.exports = SpotifyPlayer;
