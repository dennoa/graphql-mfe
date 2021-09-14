import { HTTPDataSource } from 'apollo-datasource-http'

interface GetCustomersQuery {
  name?: string;
  skip?: number;
  limit?: number;
}

interface Address {
  full_address: string;
}

interface Customer {
  _id: number;
  customer_type: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  title?: string;
  date_of_birth: string;
  gender: string;
  addresses: Address[];
}

interface CustomersResponse {
  customers: Customer[];
}

export default class CustomersApi {
  fetcher: HTTPDataSource;

  constructor(fetcher: HTTPDataSource) {
    this.fetcher = fetcher;
  }

  async find(custQuery: GetCustomersQuery): Promise<Customer[]> {
    const query = { skip: 0, limit: 50, include_addresses: 'true', ...custQuery };
    const { body: { customers } } = await this.fetcher.get<CustomersResponse>('/customers', { query });
    return customers;
  }  
}
