import { gql } from 'apollo-server-express';

import books from '../models/books';
import customers from '../models/customers';
import properties from '../models/properties';

/**
 * The Query and Mutation types here need to correspond to the defined resolvers
 */
export const typeDefs = gql`
  ${books.types.general}
  ${customers.types.general}
  ${properties.types.general}

  type Query {
    ${books.types.Query}
    ${customers.types.Query}
    ${properties.types.Query}
  }

  type Mutation {
    ${books.types.Mutation}
  }
`;

export default typeDefs;
