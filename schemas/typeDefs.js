const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    search(q: String!, type: AllowedSearchType): SearchResult
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
    artists: Artist
  }

  type Image {
    url: String
    height: Int
    width: Int
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
