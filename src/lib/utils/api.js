/* eslint-disable no-console */
import axios from 'axios';

// import { configuration } from './configuration';

// configuration();

export const callApi = async ({
  method, uri, data = {}, params = {},
}) => {
  const baseUrl = process.env.REACT_APP_BASEURL;
  const url = `${baseUrl}/${uri}`;
  const response = await axios({
    method,
    url,
    data,
    params,
  });
  console.log('response', response);
  return response;
};
