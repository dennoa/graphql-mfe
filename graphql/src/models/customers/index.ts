export const types = {
  general: `
    type Address {
      full_address: String
    }

    type Customer {
      _id: Int
      customer_type: String
      first_name: String
      middle_name: String
      last_name: String
      title: String
      date_of_birth: String
      gender: String
      addresses: [Address]
    }
  `,
  Query: `
    customers(name: String, skip: Int, limit: Int): [Customer]
  `,
};

export const resolvers = {
  Query: {
    // @ts-ignore
    customers: (parent, query, { dataSources: { svxApi } }) => svxApi.customers.find(query),
  },
};

export const customers = {
  types,
  resolvers,
};

export default customers;
