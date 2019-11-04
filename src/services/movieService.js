/* eslint-disable import/prefer-default-export */
import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/movies`;

export const getMovies = () => http.get(apiEndpoint).then(({ data }) => data);

export const deleteMovie = movieId =>
  http.delete(`${apiEndpoint}/${movieId}`).then(({ data }) => data);

export const saveMovie = movie => console.log(movie);
