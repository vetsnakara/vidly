/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from '../context/user';

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const {
    location: { pathname: referrer },
  } = rest;

  return (
    <UserConsumer>
      {({ user }) =>
        user ? (
          <Route
            {...rest}
            render={props =>
              Component ? <Component {...props} /> : render(props)
            }
          />
        ) : (
          <Redirect to={{ pathname: '/login', state: { referrer } }} />
        )
      }
    </UserConsumer>
  );
};

export default ProtectedRoute;
