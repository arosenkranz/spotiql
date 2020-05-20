const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    search: () => 'hi'
  }
};

module.exports = resolvers;
