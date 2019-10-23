/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */

import React from 'react';
import Like from './Like';

function MoviesTable({ movies, sortColumn, onDelete, onLike, onSort }) {
  function raiseSort(path) {
    const newSortColumn = { path };

    if (path === sortColumn.path) {
      newSortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      newSortColumn.order = 'asc';
    }

    onSort(newSortColumn);
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => raiseSort('title')}>Title</th>
          <th onClick={() => raiseSort('genre.name')}>Genre</th>
          <th onClick={() => raiseSort('numberInStock')}>Stock</th>
          <th onClick={() => raiseSort('dailyRentalRate')}>Rate</th>
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
              <Like liked={movie.liked} onLike={() => onLike(movie)} />
            </td>
            <td>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(movie)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MoviesTable;
