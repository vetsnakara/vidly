/* eslint-disable react/jsx-fragments */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from './NavBar';
import Movies from './Movies';
import Customers from './Customers';
import Rentals from './Renatals';
import MovieForm from './MovieForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import NotFound from './NotFound';

import 'react-toastify/dist/ReactToastify.css';

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
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <ToastContainer />
      </BrowserRouter>
    );
  }
}

export default App;
