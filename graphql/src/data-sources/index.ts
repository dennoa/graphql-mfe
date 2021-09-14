import booksApi from './books-api';
import svxApi from './svx-api';

export const dataSources = {
  booksApi,
  svxApi,
};

export const getDataSources = () => dataSources;

export default getDataSources;
