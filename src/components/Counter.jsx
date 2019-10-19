/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-fragments */

import React from 'react';
import cn from 'classnames';

class Counter extends React.Component {
  state = {
    count: 0,
  };

  getBadgeClasses() {
    const { count } = this.state;
    const badgeType = count === 0 ? 'warning' : 'primary';
    return cn('badge', 'm-2', `badge-${badgeType}`);
  }

  // eslint-disable-next-line class-methods-use-this
  handleIncrement = () => {
    this.setState(state => ({
      count: state.count + 1,
    }));
  };

  formatCount() {
    const { count } = this.state;
    return count === 0 ? 'Zero' : count;
  }

  render() {
    const count = this.formatCount();
    const badgeClasses = this.getBadgeClasses();

    return (
      <React.Fragment>
        <span className={badgeClasses}>{count}</span>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={this.handleIncrement}
        >
          Increment
        </button>
      </React.Fragment>
    );
  }
}

export default Counter;
