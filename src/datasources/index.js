const SpotifySearch = require('./spotify-search');
const SpotifyAlbum = require('./spotify-album');
const SpotifyArtist = require('./spotify-artist');
const SpotifyBrowse = require('./spotify-browse');
const SpotifyUser = require('./spotify-user');
const SpotifyPlaylists = require('./spotify-playlists');
const SpotifyPlayer = require('./spotify-player');
const SpotifyTrack = require('./spotify-track');

module.exports = () => {
  return {
    spotifySearch: new SpotifySearch(),
    spotifyAlbum: new SpotifyAlbum(),
    spotifyArtist: new SpotifyArtist(),
    spotifyBrowse: new SpotifyBrowse(),
    spotifyUser: new SpotifyUser(),
    spotifyPlaylists: new SpotifyPlaylists(),
    spotifyPlayer: new SpotifyPlayer(),
    spotifyTrack: new SpotifyTrack()
  };
};
