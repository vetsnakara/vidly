/* eslint-disable react/no-unused-state */
/* eslint-disable no-empty */
/* eslint-disable react/state-in-constructor */
/* eslint-disable no-undef */
// todo: use modal when deleting movies

/* eslint-disable react/jsx-fragments */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { toast } from 'react-toastify';

import NavBar from './NavBar';
import Movies from './Movies';
import Customers from './Customers';
import Rentals from './Renatals';
import MovieForm from './MovieForm';
import LoginForm from './LoginForm';
import Logout from './Logout';
import RegisterForm from './RegisterForm';
import NotFound from './NotFound';

import { UserProvider } from '../context/user';
import authService from '../services/authService';

import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      setUser: this.setUser,
      unsetUser: this.unsetUser,
    };
  }

  componentDidMount() {
    const { setUser } = this.state;
    const user = authService.getCurrentUser();
    setUser(user);
  }

  setUser = user => this.setState({ user });

  unsetUser = () => {
    const { user } = this.state;
    if (user) this.setState({ user: null });
  };

  render() {
    return (
      <UserProvider value={this.state}>
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
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={RegisterForm} />
              <Redirect exact from="/" to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </BrowserRouter>
      </UserProvider>
    );
  }
}

export default App;
