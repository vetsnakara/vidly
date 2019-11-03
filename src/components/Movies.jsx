/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-fragments */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/state-in-constructor */

import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import ListGroup from './ListGroup/ListGroup';
import MoviesTable from './MoviesTable';
import Search from './Search';

import { getMovies, saveMovie } from '../services/fakeMovieService';
import { getGenres, ALL_GENRES_ID } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import { mapModelToView } from '../utils/mapModelToView';
import { byGenre, byTitle } from '../utils/filters';

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    sortColumn: {
      path: 'title',
      order: 'asc',
    },
    loading: true,
    searchTerm: '',
  };

  async componentDidMount() {
    const [movies, genres] = await this.getMoviesAndGenres();

    const defaultGenre = { _id: ALL_GENRES_ID, name: 'All Genres' };

    this.setState({
      movies,
      genres: [defaultGenre, ...genres],
      selectedGenre: defaultGenre,
      loading: false,
    });
  }

  getMoviesAndGenres() {
    return Promise.all([getMovies(), getGenres()]);
  }

  handleLike = async ({ _id }) => {
    let movie;

    this.setState(
      state => {
        const movies = [...state.movies];

        const index = movies.findIndex(m => m._id === _id);

        movie = { ...movies[index] };
        movie.liked = !movie.liked;

        movies.splice(index, 1, movie);

        return { movies };
      },
      async () => {
        const movieToSave = mapModelToView(movie);
        return saveMovie(movieToSave);
      },
    );
  };

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
      searchTerm: '',
    });
  };

  handleSort = sortColumn => this.setState({ sortColumn });

  getPagedData() {
    const {
      movies: allMovies,
      selectedGenre,
      sortColumn,
      currentPage,
      pageSize,
      searchTerm,
    } = this.state;

    const filteredMovies =
      selectedGenre._id === ALL_GENRES_ID
        ? allMovies.filter(byTitle(searchTerm))
        : allMovies.filter(byGenre(selectedGenre));

    const { length: count } = filteredMovies;

    // sort movies
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order],
    );

    // paginate movies
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { count, data: movies };
  }

  handleSearch = searchTerm =>
    this.setState({
      searchTerm,
      selectedGenre: { _id: ALL_GENRES_ID },
      currentPage: 1,
    });

  render() {
    const { loading } = this.state;
    if (loading) return <p>Loading...</p>;

    const {
      sortColumn,
      genres,
      selectedGenre,
      pageSize,
      currentPage,
      searchTerm,
    } = this.state;

    const { count, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row mb-3">
          <div className="col">
            <h1>Movies</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <Link to="/movies/new" className="btn btn-primary mb-3">
              New Movie
            </Link>
            <p>
              {count > 0
                ? `Showing ${count} movies in database.`
                : 'There no movies in database.'}
            </p>
            <Search searchTerm={searchTerm} onSearch={this.handleSearch} />
            {count > 0 && (
              <React.Fragment>
                <MoviesTable
                  movies={movies}
                  sortColumn={sortColumn}
                  onLike={this.handleLike}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
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
      </React.Fragment>
    );
  }
}

export default Movies;
