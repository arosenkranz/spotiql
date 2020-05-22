const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    search: async (_, args, { dataSources, token }) => {
      if (token) {
        const results = await dataSources.spotifySearch.search(args.q, args.type);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    }
  }
};

module.exports = resolvers;
