import { HTTPDataSource } from 'apollo-datasource-http'

interface GetPropertiesQuery {
  property_id?: string;
  address?: string;
}

interface Property {
  property_id: string;
  full_address: string;
  slope: string;
}

interface PropertiesResponse {
  properties: Property[];
}

export default class PropertiesApi {
  fetcher: HTTPDataSource;

  constructor(fetcher: HTTPDataSource) {
    this.fetcher = fetcher;
  }

  async find(propertiesQuery: GetPropertiesQuery): Promise<Property[]> {
    const query = { ...propertiesQuery };
    const res = await this.fetcher.get<PropertiesResponse>('/properties', { query });
    return res.body.properties;
  }  
}
