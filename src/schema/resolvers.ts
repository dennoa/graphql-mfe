/**
 * Similar to the route handling of a REST API server, the top level mappings here just delegate to other handlers
 */
import { bookHandler } from '../handlers';

export const resolvers = {
  Query: {
    books: () => bookHandler.getBooks(),
  },
  Mutation: {
    createBook: (parent, details) => bookHandler.createBook(details),
    updateBook: (parent, book) => bookHandler.updateBook(book),
    removeBook: (parent, identifier) => bookHandler.removeBook(identifier.id),
  }
};

export default resolvers;
