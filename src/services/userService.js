/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */

import http from './httpService';
import authService from './authService';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/users`;

async function register(credits) {
  const { headers } = await http.post(apiEndpoint, {
    email: credits.username,
    name: credits.name,
    password: credits.password,
  });

  const token = headers['x-auth-token'];

  const user = authService.loginWithToken(token);

  return user;
}

export default {
  register,
};
