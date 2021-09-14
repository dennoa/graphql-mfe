/**
 * Similar to the route handling of a REST API server, the top level mappings here just delegate elsewhere
 */
import books from '../models/books';
import customers from '../models/customers';
import properties from '../models/properties';

export const resolvers = {
  Query: {
    ...books.resolvers.Query,
    ...customers.resolvers.Query,
    ...properties.resolvers.Query,
  },
  Mutation: {
    ...books.resolvers.Mutation,
  }
};

export default resolvers;
