import { gql } from 'apollo-server-express';

/**
 * The Query and Mutation types here need to correspond to the defined resolvers
 */
export const typeDefs = gql`
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

export default typeDefs;
