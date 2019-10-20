/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Counter from './Counter';

function CounterList({
  counters,
  onIncrement,
  onDecrement,
  onDelete,
  onReset,
}) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn-sm m-2"
        onClick={onReset}
      >
        Reset
      </button>
      {counters.map(counter => (
        <Counter
          key={counter.id}
          counter={counter}
          onDelete={onDelete}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
    </div>
  );
}

export default CounterList;
