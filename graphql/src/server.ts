import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, Config } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import { port } from './config';
import dataSources from './data-sources';
import logger from './logger';
import { resolvers, typeDefs } from './schema';


export async function startServer() {
  const app = express();
  // TODO: Configure express middleware (e.g. serve static, cors if required, etc.)
  const httpServer = http.createServer(app);
  const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins,
    dataSources,
  } as Config<ExpressContext>);

  await server.start(); // Must await server start before applying middleware
  server.applyMiddleware({
     app,
     path: '/graphql', // host from /graphql to allow serving other resources
  });

  await new Promise(resolve => httpServer.listen({ port }, resolve));
  logger.info(`🚀 Server listening on :${port}${server.graphqlPath}`);
}
