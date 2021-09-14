export const port = +(process.env.GRAPHQLMFE_PORT || 4000);

export const svxApi = {
  baseUrl: process.env.GRAPHQLMFE_SVX_API_BASE_URL as string,
  credentials: {
    username: process.env.GRAPHQLMFE_SVX_API_USERNAME as string,
    password: process.env.GRAPHQLMFE_SVX_API_PASSWORD as string,
  },
};

export default {
  port,
  svxApi,
};
