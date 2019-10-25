/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */

import React from 'react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Like from './Like';

function MoviesTable({ movies, sortColumn, onDelete, onLike, onSort }) {
  const columns = [
    { path: 'title', label: 'Title' },
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
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} items={movies} />
    </table>
  );
}

export default MoviesTable;
