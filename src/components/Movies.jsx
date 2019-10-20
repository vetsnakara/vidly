/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/state-in-constructor */

import React from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends React.Component {
  state = {
    movies: null,
    loading: true,
  };

  componentDidMount() {
    getMovies().then(movies => this.setState({ movies, loading: false }));
  }

  handleDelete({ _id }) {
    this.setState(prevState => {
      const movies = prevState.movies.filter(m => m._id !== _id);
      return {
        movies,
      };
    });
  }

  render() {
    const { movies, loading } = this.state;

    if (loading) return <p>Loading...</p>;

    if (movies.length === 0) return <p>There no movies in database.</p>;

    return (
      <div>
        <p>{`Showing ${movies.length} movies in database.`}</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
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
      </div>
    );
  }
}

export default Movies;
