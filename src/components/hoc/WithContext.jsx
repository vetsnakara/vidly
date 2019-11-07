/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const WithContext = (Context, Component) => props => {
  return (
    <Context.Consumer>
      {value => <Component {...props} context={value} />}
    </Context.Consumer>
  );
};

export default WithContext;
