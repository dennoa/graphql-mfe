import { Pool } from 'undici';
import { HTTPDataSource, Request } from 'apollo-datasource-http'
import decodeJwt from 'jwt-decode';

import { svxApi } from '../../config';
import CustomersApi from './customers-api';
import PropertiesApi from './properties-api';

const clientOptions = {
  bodyTimeout: 15000,
  headersTimeout: 15000,
};

const requestOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

const publicPaths: string[] = ['/users-auth'];
const requiresAuth = (path: string) => publicPaths.indexOf(path) < 0;

interface DecodedJwt {
  exp: number;
}

function getReauthenticationTimestamp(jwt: string): number {
  const decoded = decodeJwt(jwt) as DecodedJwt;
  return decoded.exp * 1000 - 10000;
}

interface AuthResponse {
  jwt: string;
}

class SvxApi extends HTTPDataSource {
  private authToken: string|undefined;
  private reauthTimestamp: number;
  public customers: CustomersApi;
  public properties: PropertiesApi;

  constructor(pool: Pool) {
    super(svxApi.baseUrl, { pool, clientOptions, requestOptions });
    this.authToken = undefined;
    this.reauthTimestamp = 0;
    this.customers = new CustomersApi(this);
    this.properties = new PropertiesApi(this);
  }

  private isTimeToReAuth() {
    return this.reauthTimestamp < Date.now();
  }

  async onRequest(request: Request): Promise<void> {
    if (requiresAuth(request.path)) {
      if (this.isTimeToReAuth()) {
        const body = svxApi.credentials;
        const { body: { jwt } } = await this.post<AuthResponse>('/users-auth', { body });
        this.authToken = `Bearer ${jwt}`;
        this.reauthTimestamp = getReauthenticationTimestamp(jwt);
      }
      request.headers.Authorization = this.authToken;
    }
  }
}

const instance = new SvxApi(new Pool(svxApi.baseUrl));

export default instance;
