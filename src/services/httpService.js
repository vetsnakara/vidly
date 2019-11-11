/* eslint-disable no-param-reassign */
import axios from 'axios';
import { toast } from 'react-toastify';

// import logger from './logService';
import tokenService from './tokenService';

axios.interceptors.request.use(config => {
  const token = tokenService.get();

  if (token) {
    config.headers.common['x-auth-token'] = token;
  }

  return config;
});

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error('Unexpected error occured');
    console.log(error);
    // logger.log(error);
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
