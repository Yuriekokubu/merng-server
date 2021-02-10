const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const { MOGODB } = require('./config.js');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MOGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MONGODB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.log(err);
  });
