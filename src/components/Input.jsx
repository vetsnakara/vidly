/* eslint-disable react/prop-types */

import React from 'react';

function Input({ name, label, value, onChange, error }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        <input
          id={name}
          name={name}
          type="text"
          className="form-control"
          onChange={onChange}
          value={value}
        />
      </label>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
