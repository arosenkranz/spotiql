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
    totalTracks: Int
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
    trackNumber: Int
    duration: Int
    album: Album
    artists: [Artist]
    previewUrl: String
    images: [Image]
  }

  type Image {
    url: String
    height: Int
    width: Int
  }

  type Playlist {
    description: String
    spotifyUrl: String
    id: ID
    images: [Image]
    name: String
    ownerId: String
    ownerName: String
    trackCount: Int
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
    genreName: String
  }

  type User {
    displayName: String
    email: String
    spotifyUrl: String
    image: Image
    id: ID
    product: String
  }

  type Player {
    deviceId: ID
    deviceName: String
    deviceType: String
    deviceVolume: Int
    isPlaying: Boolean
    trackInfo: PlayerTrackInfo
  }

  type Device {
    deviceId: ID
    deviceName: String
    deviceType: String
    deviceVolume: Int
    isActive: Boolean
    isRestricted: Boolean
    isPrivateSession: Boolean
  }

  type PlayerTrackInfo {
    album: Album
    artists: [Artist]
    trackName: String
    trackId: ID
  }

  type AudioAnalysis {
    bars: [TimeInterval]
    beats: [TimeInterval]
    sections: [Section]
    segments: [Segment]
    tatums: [TimeInterval]
  }

  type TimeInterval {
    start: Float
    duration: Float
    confidence: Float
  }

  type Section {
    start: Float
    duration: Float
    confidence: Float
    loudness: Float
    tempo: Float
    tempoConfidence: Float
    key: Int
    keyConfidence: Float
    mode: Int
    modeConfidence: Float
    timeSignature: Int
    timeSignatureConfidence: Float
  }

  type Segment {
    start: Float
    duration: Float
    confidence: Float
    loudnessStart: Float
    loudnessMax: Float
    loudnessMaxTime: Float
    loudnessEnd: Float
    pitches: [Float]
    timbre: [Float]
  }

  type AudioFeature {
    durationMs: Float
    key: Int
    mode: Int
    timeSignature: Int
    acousticness: Float
    danceability: Float
    energy: Float
    instrumentalness: Float
    liveness: Float
    loudness: Float
    speechiness: Float
    valence: Float
    tempo: Float
    id: String
    uri: String
    trackHref: String
    analysisUrl: String
    type: String
  }

  enum AllowedSearchType {
    TRACK
    ARTIST
    ALBUM
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
      seedArtists: [String]
      seedTracks: [String]
      seedGenres: [String]
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

    # track
    getSingleTrack(trackId: ID!): Track
    getTracks(ids: [ID]!): [Track]
    getAudioAnalysis(trackId: ID!): AudioAnalysis
    getAudioFeatures(trackId: ID!): AudioFeature
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
