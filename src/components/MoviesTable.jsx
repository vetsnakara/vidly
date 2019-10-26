/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */

import React from 'react';
import { Link } from 'react-router-dom';

import Table from './Table';
import Like from './Like';

function MoviesTable({ movies, sortColumn, onDelete, onLike, onSort }) {
  const columns = [
    {
      path: 'title',
      label: 'Title',
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>,
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: movie => (
        <Like liked={movie.liked} onLike={() => onLike(movie)} />
      ),
    },
    {
      key: 'delete',
      content: movie => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table
      items={movies}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

export default MoviesTable;
