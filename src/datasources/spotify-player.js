const { RESTDataSource } = require('apollo-datasource-rest');
const Reducers = require('../utils/reducers');

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
    const results = data ? Reducers.playerReducer(data) : {};
    return results;
  }

  async recentlyPlayed(limit = 50) {
    const data = await this.get('/recently-played', {
      limit
    });

    const results =
      data && data.items.length ? data.items.map(({ track }) => Reducers.trackReducer(track)) : [];

    return results;
  }

  async getDevices() {
    const data = await this.get('/devices');

    const results =
      data && data.devices.length ? data.devices.map(device => Reducers.deviceReducer(device)) : [];

    return results;
  }

  async getCurrentlyPlaying() {
    const data = await this.get('/currently-playing');

    const results = data && data.item ? Reducers.trackReducer(data.item) : {};

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
}

module.exports = SpotifyPlayer;
