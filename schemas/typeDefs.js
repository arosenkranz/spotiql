const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    search(q: String!, type: String!): String
  }
`;

module.exports = typeDefs;
