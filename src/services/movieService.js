/* eslint-disable import/prefer-default-export */
import http from './httpService';

const apiEndpoint = `/movies`;

const movieUrl = id => `${apiEndpoint}/${id}`;

export const getMovies = () => http.get(apiEndpoint).then(({ data }) => data);

export const getMovie = id => http.get(movieUrl(id)).then(({ data }) => data);

export const deleteMovie = id =>
  http.delete(movieUrl(id)).then(({ data }) => data);

export const saveMovie = ({ _id: movieId, ...body }) => {
  if (movieId) return http.put(movieUrl(movieId), body);
  return http.post(apiEndpoint, body);
};
