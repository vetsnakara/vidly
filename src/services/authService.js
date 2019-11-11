/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import jwtDecode from 'jwt-decode';

import http from './httpService';
import tokenService from './tokenService';

const apiEndpoint = `/auth`;

async function login(email, password) {
  const { data: token } = await http.post(apiEndpoint, { email, password });

  const user = loginWithToken(token);

  return user;
}

function logout() {
  tokenService.remove();
}

function loginWithToken(token) {
  const user = jwtDecode(token);
  tokenService.set(token);
  return user;
}

function getCurrentUser() {
  try {
    const token = getToken();
    const user = jwtDecode(token);
    return user;
  } catch (ex) {
    return null;
  }
}

function getToken() {
  return tokenService.get();
}

export default {
  login,
  logout,
  loginWithToken,
  getCurrentUser,
  getToken,
};
