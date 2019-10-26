/* eslint-disable react/prop-types */
import React from 'react';

function MovieForm({ match, history }) {
  return (
    <div>
      <h1 className="mb-3">{`Movie with ID: ${match.params.id}`}</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => history.push('/movies')}
      >
        Save
      </button>
    </div>
  );
}

export default MovieForm;
