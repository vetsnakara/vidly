/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-fragments */

import React from 'react';
import cn from 'classnames';

function Counter({ counter, onIncrement, onDecrement, onDelete }) {
  function getBadgeClasses() {
    const { value } = counter;
    const badgeType = value === 0 ? 'warning' : 'primary';
    return cn('badge', 'm-2', `badge-${badgeType}`);
  }

  function formatCount() {
    const { value } = counter;
    return value === 0 ? 'Zero' : value;
  }

  const value = formatCount();

  const badgeClasses = getBadgeClasses();

  return (
    <div className="row">
      <div className="col-2">
        <span className={badgeClasses}>{value}</span>
      </div>
      <div className="col">
        <button
          type="button"
          className="btn btn-secondary btn-sm mr-2"
          onClick={() => onIncrement(counter)}
        >
          +
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm mr-2"
          onClick={() => onDecrement(counter)}
          disabled={counter.value === 0}
        >
          -
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(counter)}
        >
          x
        </button>
      </div>
    </div>
  );
}

export default Counter;
