/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';

function Select({
  name,
  label,
  items,
  selectedValue,
  itemProps = {
    key: '_id',
    value: '_id',
    title: 'name',
  },
  ...rest
}) {
  return (
    <div className="form-group">
      <label htmlFor="genre">
        {label}
        <select
          name={name}
          id={name}
          value={selectedValue}
          className="form-control"
          {...rest}
        >
          {items.map(item => {
            const key = item[itemProps.key];
            const value = item[itemProps.value];
            const title = item[itemProps.title];

            return (
              <option key={key} value={value}>
                {title}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}

export default Select;
