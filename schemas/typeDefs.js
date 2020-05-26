const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    # search
    search(q: String!, type: AllowedSearchType): SearchResult
    # albums
    getAlbums(ids: [String]): [Album]
    getSingleAlbum(id: String!): Album
    getSingleAlbumTracks(id: String!): [Track]
    # artists
    getArtists(ids: [String]): [Artist]
    getSingleArtist(id: String!): Artist
    getSingleArtistAlbums(id: String!): [Album]
    getSingleArtistRelated(id: String!): [Artist]
    getSingleArtistTopTracks(id: String!): [Track]
    # browse
    getFeaturedPlaylists(limit: Int, offset: Int): [Playlist]
    getNewReleases(limit: Int, offset: Int): [Album]
    getGenres: [Genre]
    getCategories(limit: Int, offset: Int): [Category]
    getSingleCategory(categoryId: String!): Category
    getCategoryPlaylists(categoryId: String!): [Playlist]
    getRecommendationTracks(
      limit: Int
      seed_artists: [String]
      seed_tracks: [String]
      seed_genres: [String]
    ): [Track]
  }

  type SearchResult {
    albums: [Album]
    artists: [Artist]
    tracks: [Track]
    # playlist: [Playlist]
    # episodes: [Episode]
  }

  type Album {
    id: String
    name: String
    uri: String
    total_tracks: Int
    tracks: [Track]
    artists: [Artist]
    images: [Image]
  }

  type Artist {
    id: String
    name: String
    uri: String
    genres: [String]
    images: [Image]
  }

  type Track {
    id: String
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
    id: String
    images: [Image]
    name: String
    owner_id: String
    owner_name: String
    track_count: Int
  }

  type Category {
    icons: [Image]
    id: String
    name: String
  }

  type Genre {
    genre_name: String
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
