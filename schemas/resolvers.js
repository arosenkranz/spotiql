const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    search: async (_, args, { dataSources: { spotifySearch }, token }) => {
      if (token) {
        const results = await spotifySearch.search(args.q, args.type);
        return results;
      }
      throw new AuthenticationError('Not logged in');
    }
  }
};

module.exports = resolvers;
