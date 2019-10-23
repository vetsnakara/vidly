/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-fragments */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/state-in-constructor */

import React from 'react';
import Pagination from './Pagination';
import ListGroup from './ListGroup/ListGroup';
import MoviesTable from './MoviesTable';

import { getMovies } from '../services/fakeMovieService';
import { getGenres, ALL_GENRES_ID } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    loading: true,
  };

  componentDidMount() {
    Promise.all([getMovies(), getGenres()]).then(([movies, genres]) => {
      const defaultGenre = { _id: ALL_GENRES_ID, name: 'All Genres' };

      this.setState({
        movies,
        genres: [defaultGenre, ...genres],
        selectedGenre: defaultGenre,
        loading: false,
      });
    });
  }

  handleLike = ({ _id }) =>
    this.setState(({ movies }) => {
      return {
        movies: movies.map(movie => {
          if (movie._id === _id) {
            return {
              ...movie,
              liked: !movie.liked,
            };
          }
          return movie;
        }),
      };
    });

  handlePageChange = page => this.setState({ currentPage: page });

  handleDelete = ({ _id }) =>
    this.setState(prevState => {
      const movies = prevState.movies.filter(m => m._id !== _id);
      return {
        movies,
      };
    });

  handleGenreSelect = ({ _id }) => {
    const { genres } = this.state;
    const selectedGenre = genres.find(genre => genre._id === _id);

    this.setState({
      selectedGenre,
      currentPage: 1,
    });
  };

  render() {
    const { loading } = this.state;
    if (loading) return <p>Loading...</p>;

    const {
      movies: allMovies,
      genres,
      selectedGenre,
      pageSize,
      currentPage,
    } = this.state;

    // filter movies by genre
    const filteredMovies =
      selectedGenre._id === ALL_GENRES_ID
        ? allMovies
        : allMovies.filter(({ genre }) => genre._id === selectedGenre._id);

    const { length: count } = filteredMovies;

    // paginate movies
    const movies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>
            {count > 0
              ? `Showing ${count} movies in database.`
              : 'There no movies in database.'}
          </p>
          {count > 0 && (
            <React.Fragment>
              <MoviesTable
                movies={movies}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
              />
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Movies;
