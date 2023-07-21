const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const TrackAPI = require("./datasources/track-api");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          trackAPI: new TrackAPI({ cache }),
        },
      };
    },
  });

  console.log(`
      🚀  Server is running
      📭  Query at ${url}
    `);
}

startApolloServer();
