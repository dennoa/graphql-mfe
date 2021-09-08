"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
/**
 * The Query and Mutation types here need to correspond to the defined resolvers
 */
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Book {
    id: ID!
    title: String
    author: String
  }

  # All available queries
  type Query {
    books: [Book]
  }

  # All available mutations
  type Mutation {
    createBook(title: String, author: String): Book
    updateBook(id: ID!, title: String, author: String): Book
    removeBook(id: ID!): Boolean
  }
`;
exports.default = exports.typeDefs;
