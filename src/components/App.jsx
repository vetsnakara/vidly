/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-fragments */

import React from 'react';
import CounterNavbar from './CounterNavbar';
import CounterList from './CounterList';

class App extends React.Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  handleDelete = counterToDelete =>
    this.setState(({ counters }) => {
      const newCounters = counters.filter(
        counter => counter !== counterToDelete,
      );
      return {
        counters: newCounters,
      };
    });

  handleIncrement = counterToIncrement => {
    this.setState(({ counters }) => ({
      counters: counters.map(counter => {
        if (counter === counterToIncrement) {
          return {
            ...counterToIncrement,
            value: counterToIncrement.value + 1,
          };
        }

        return counter;
      }),
    }));
  };

  handleDecrement = counterToIncrement => {
    this.setState(({ counters }) => ({
      counters: counters.map(counter => {
        if (counter === counterToIncrement) {
          return {
            ...counterToIncrement,
            value: counterToIncrement.value - 1,
          };
        }

        return counter;
      }),
    }));
  };

  handleReset = () => {
    const { counters } = this.state;

    this.setState({
      counters: counters.map(counter => ({
        ...counter,
        value: 0,
      })),
    });
  };

  render() {
    const { counters } = this.state;
    const totalCounters = counters.filter(c => c.value > 0).length;

    console.log(totalCounters);

    return (
      <React.Fragment>
        <header className="mb-2">
          <CounterNavbar totalCounters={totalCounters} />
        </header>
        <main className="container">
          <CounterList
            counters={counters}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            onReset={this.handleReset}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
