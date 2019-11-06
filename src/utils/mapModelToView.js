/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */

export function mapModelToView(movie) {
  return {
    _id: movie._id,
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
    // liked: !!movie.liked,
  };
}
