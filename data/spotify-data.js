require('dotenv').config();
const { RESTDataSource } = require('apollo-datasource-rest');

class SpotifyApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  // set spotify token with each request
  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async search(query = 'Small Black', type = 'Artist') {
    const data = await this.get('movies', {
      q: query,
      order_by: 'most_viewed',
    });
    return data.results;
  }
}

module.exports = SpotifyApi;
