/* eslint-disable import/prefer-default-export */
import http from './httpService';

export const ALL_GENRES_ID = 'ALL_GENRES_ID';

export const getGenres = () => http.get(`/genres`).then(({ data }) => data);
