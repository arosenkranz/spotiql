const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
  }

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

  enum AllowedSearchType {
    track
    artist
    album
    # playlist
    # show
    # episode
  }
`;

module.exports = typeDefs;
