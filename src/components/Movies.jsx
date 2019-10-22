/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-fragments */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/state-in-constructor */

import React from 'react';
import Like from './Like/Like';
import Pagination from './Pagination';

import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';

class Movies extends React.Component {
  state = {
    movies: null,
    loading: true,
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    getMovies().then(movies => this.setState({ movies, loading: false }));
  }

  handleLike({ _id }) {
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
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleDelete({ _id }) {
    this.setState(prevState => {
      const movies = prevState.movies.filter(m => m._id !== _id);
      return {
        movies,
      };
    });
  }

  render() {
    const { loading } = this.state;
    if (loading) return <p>Loading...</p>;

    const { movies: allMovies, pageSize, currentPage } = this.state;
    const { length: count } = allMovies;

    const movies = paginate(allMovies, currentPage, pageSize);

    if (count === 0) return <p>There no movies in database.</p>;

    return (
      <React.Fragment>
        <p>{`Showing ${count} movies in database.`}</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onLike={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
