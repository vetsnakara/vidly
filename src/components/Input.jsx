/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react';

function Input({ name, label, error, ...rest }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        <input id={name} name={name} className="form-control" {...rest} />
      </label>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
