const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type SearchResult {
    albums: [Album]
    artists: [Artist]
    tracks: [Track]
    # playlist: [Playlist]
    # episodes: [Episode]
  }

  type Album {
    id: ID
    name: String
    uri: String
    total_tracks: Int
    tracks: [Track]
    artists: [Artist]
    images: [Image]
  }

  type Artist {
    id: ID
    name: String
    uri: String
    genres: [String]
    images: [Image]
  }

  type Track {
    id: ID
    name: String
    uri: String
    track_number: Int
    duration: Int
    album: Album
    artists: [Artist]
    preview_url: String
  }

  type Image {
    url: String
    height: Int
    width: Int
  }

  type Playlist {
    description: String
    spotify_url: String
    id: ID
    images: [Image]
    name: String
    owner_id: String
    owner_name: String
    track_count: Int
  }

  type PlaylistTracks {
    tracks: [Track]
    nextPage: String
  }

  type Category {
    icons: [Image]
    id: ID
    name: String
  }

  type Genre {
    genre_name: String
  }

  type User {
    display_name: String
    email: String
    spotify_url: String
    image: Image
    id: ID
    product: String
  }

  type Player {
    device_id: ID
    device_name: String
    device_type: String
    device_volume: Int
    is_playing: Boolean
    track_info: PlayerTrackInfo
  }

  type Device {
    device_id: ID
    device_name: String
    device_type: String
    device_volume: Int
    is_active: Boolean
    is_restricted: Boolean
    is_private_session: Boolean
  }

  type PlayerTrackInfo {
    album: Album
    artists: [Artist]
    track_name: String
    track_id: ID
  }

  enum AllowedSearchType {
    track
    artist
    album
    # playlist
    # show
    # episode
  }

  type Query {
    # search
    search(q: String!, type: AllowedSearchType): SearchResult

    # albums
    getAlbums(ids: [ID]): [Album]
    getSingleAlbum(id: ID!): Album
    getSingleAlbumTracks(id: ID!): [Track]

    # artists
    getArtists(ids: [ID]): [Artist]
    getSingleArtist(id: ID!): Artist
    getSingleArtistAlbums(id: ID!): [Album]
    getSingleArtistRelated(id: ID!): [Artist]
    getSingleArtistTopTracks(id: ID!): [Track]

    # browse
    getFeaturedPlaylists(limit: Int, offset: Int): [Playlist]
    getNewReleases(limit: Int, offset: Int): [Album]
    getGenres: [Genre]
    getCategories(limit: Int, offset: Int): [Category]
    getSingleCategory(categoryId: ID!): Category
    getCategoryPlaylists(categoryId: ID!): [Playlist]
    getRecommendationTracks(
      limit: Int
      seed_artists: [String]
      seed_tracks: [String]
      seed_genres: [String]
    ): [Track]

    # me
    getMyProfile: User
    getMyPlaylists(limit: Int, offset: Int): [Playlist]
    getMyTopArtists(limit: Int, offset: Int): [Artist]
    getMyTopTracks(limit: Int, offset: Int): [Track]
    getMySavedAlbums(limit: Int, offset: Int): [Album]
    getMySavedTracks(limit: Int, offset: Int): [Track]

    # playlists
    getPlaylist(playlistId: ID!): Playlist
    getPlaylistTracks(playlistId: ID!, limit: Int, offset: Int): PlaylistTracks

    # player
    currentPlayerState: Player
    recentlyPlayed(limit: Int): [Track]
    getDevices: [Device]
    getCurrentlyPlaying: Track
  }

  type Mutation {
    # player
    nextTrack(deviceId: ID): Boolean
    previousTrack(deviceId: ID): Boolean
    addToQueue(uri: String!, deviceId: ID): Boolean
    pauseTrack(deviceId: ID): Boolean
    playTrack(deviceId: ID): Boolean
    setRepeat(state: String, deviceId: ID): Boolean
    seekTrack(position: Int, deviceId: ID): Boolean
    shufflePlayer(state: String, deviceId: ID): Boolean
    transferPlayback(deviceIds: [ID!]!): Boolean
    setVolume(volume: Int, deviceId: ID): Boolean
  }
`;

module.exports = typeDefs;
