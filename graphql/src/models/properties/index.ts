export const types = {
  general: `
    type Property {
      property_id: String
      full_address: String
      slope: String
    }
  `,
  Query: `
    properties(property_id: String, address: String): [Property]
  `,
};

export const resolvers = {
  Query: {
    // @ts-ignore
    properties: (parent, query, { dataSources: { svxApi } }) => svxApi.properties.find(query),
  },
};

export const properties = {
  types,
  resolvers,
};

export default properties;
