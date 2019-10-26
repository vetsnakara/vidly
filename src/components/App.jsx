/* eslint-disable react/jsx-fragments */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './NavBar';
import Movies from './Movies';
import Customers from './Customers';
import Rentals from './Renatals';
import MovieForm from './MovieForm';
import NotFound from './NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="navigation row mb-4">
          <div className="col">
            <NavBar />
          </div>
        </div>
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
