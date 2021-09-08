import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, Config } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import { resolvers, typeDefs } from './schema';


export async function startServer() {
  const app = express();
  // TODO: Configure express middleware (e.g. serve static, cors if required, etc.)
  const httpServer = http.createServer(app);
  const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];
  const server = new ApolloServer({ typeDefs, resolvers, plugins } as Config<ExpressContext>);

  await server.start(); // Must await server start before applying middleware
  server.applyMiddleware({
     app,
     path: '/graphql', // host from /graphql to allow serving other resources
  });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
