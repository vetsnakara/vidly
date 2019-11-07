/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-fragments */
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { UserConsumer } from '../context/user';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink exact className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>
          <UserConsumer>
            {({ user }) => {
              return (
                <React.Fragment>
                  {!user && (
                    <React.Fragment>
                      <NavLink className="nav-item nav-link" to="/login">
                        Login
                      </NavLink>
                      <NavLink className="nav-item nav-link" to="/register">
                        Register
                      </NavLink>
                    </React.Fragment>
                  )}
                  {user && (
                    <React.Fragment>
                      <NavLink className="nav-item nav-link" to="/profile">
                        {user.name}
                      </NavLink>
                      <NavLink className="nav-item nav-link" to="/logout">
                        Logout
                      </NavLink>
                    </React.Fragment>
                  )}
                </React.Fragment>
              );
            }}
          </UserConsumer>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
