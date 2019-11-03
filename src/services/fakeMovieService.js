/* eslint-disable no-underscore-dangle */
import * as genresAPI from './fakeGenreService';

const movies = [
  {
    _id: '5b21ca3eeb7f6fbccd471815',
    title: 'Terminator',
    genre: { _id: '5b21ca3eeb7f6fbccd471818', name: 'Action' },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: '2018-01-03T19:04:28.809Z',
    liked: true,
  },
  {
    _id: '5b21ca3eeb7f6fbccd471816',
    title: 'Die Hard',
    genre: { _id: '5b21ca3eeb7f6fbccd471818', name: 'Action' },
    numberInStock: 5,
    dailyRentalRate: 2.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd471817',
    title: 'Get Out',
    genre: { _id: '5b21ca3eeb7f6fbccd471820', name: 'Thriller' },
    numberInStock: 8,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd471819',
    title: 'Trip to Italy',
    genre: { _id: '5b21ca3eeb7f6fbccd471814', name: 'Comedy' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181a',
    title: 'Airplane',
    genre: { _id: '5b21ca3eeb7f6fbccd471814', name: 'Comedy' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181b',
    title: 'Wedding Crashers',
    genre: { _id: '5b21ca3eeb7f6fbccd471814', name: 'Comedy' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181e',
    title: 'Gone Girl',
    genre: { _id: '5b21ca3eeb7f6fbccd471820', name: 'Thriller' },
    numberInStock: 7,
    dailyRentalRate: 4.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181f',
    title: 'The Sixth Sense',
    genre: { _id: '5b21ca3eeb7f6fbccd471820', name: 'Thriller' },
    numberInStock: 4,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd471821',
    title: 'The Avengers',
    genre: { _id: '5b21ca3eeb7f6fbccd471818', name: 'Action' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
];

export function getMovies() {
  return new Promise(res => {
    setTimeout(() => {
      res(movies);
    }, 1);
  });
}

export async function getMovie(id) {
  const result = await new Promise(res => {
    setTimeout(() => {
      const movie = movies.find(m => m._id === id);
      res(movie);
    });
  });
  return result;
}

export async function saveMovie(movie) {
  const { _id, title, genreId, numberInStock, dailyRentalRate } = movie;

  return new Promise(res => {
    setTimeout(() => {
      const movieInDb = {
        title,
        numberInStock,
        dailyRentalRate,
        genre: genresAPI.genres.find(g => g._id === genreId),
      };

      if (!_id) {
        movieInDb._id = Date.now();
        movies.push(movieInDb);
      } else {
        const index = movies.findIndex(m => m._id === _id);

        movies[index] = {
          ...movies[index],
          ...movieInDb,
        };
      }

      console.log(movies);

      res(movieInDb);
    }, 1);
  });
}

export function deleteMovie(id) {
  const movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
