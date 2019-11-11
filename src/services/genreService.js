/* eslint-disable import/prefer-default-export */
import http from './httpService';
import { apiUrl } from '../config.json';

export const ALL_GENRES_ID = 'ALL_GENRES_ID';

export const getGenres = () =>
  http.get(`${apiUrl}/genres`).then(({ data }) => data);
