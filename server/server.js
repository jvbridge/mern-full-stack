import express from 'express';
import * as path from 'path';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';
import { authMiddleware } from './util/index.js';
import { PORT } from './config/consts.js';
import db from './config/connection.js';

// create the express server
const app = express();

// create the graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// basic middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// redirect all gets in production to be handled by react router
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

/**
 * The start function for the server
 * @param typedefs
 * @param resolvers
 */
const start = async (typedefs, resolvers) => {
  // start the graphql server
  await server.start();

  // allow our app to be added
  server.applyMiddleware({ app });

  // start listening on the connection
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// set up complete time to run the server
start(typeDefs, resolvers);
