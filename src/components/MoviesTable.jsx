/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */

import React from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../context/user';
import WithContext from './hoc/WithContext';

import Table from './Table';
import Like from './Like';

function MoviesTable({
  movies,
  sortColumn,
  onDelete,
  onLike,
  onSort,
  context,
}) {
  const { user } = context;
  const isAdmin = user && user.isAdmin;

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
  ];

  const deleteColumn = {
    key: 'delete',
    content: movie =>
      isAdmin && (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(movie)}
        >
          Delete
        </button>
      ),
  };

  if (isAdmin) columns.push(deleteColumn);

  return (
    <Table
      items={movies}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

export default WithContext(UserContext, MoviesTable);
