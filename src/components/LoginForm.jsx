/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */

import React from 'react';

import Input from './Input';

class LoginForm extends React.Component {
  state = {
    account: {
      username: '',
      password: '',
    },
    errors: {},
  };

  handleSubmit = e => {
    e.preventDefault();

    // check errors
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log('Form is submitted to the server');
  };

  handleChange = ({ target: input }) => {
    const { name, value } = input;

    // check errors
    this.setState(state => {
      const { account } = state;
      const errors = { ...state.errors };

      const errorMessage = this.validateInput(input);
      if (errorMessage) errors[name] = errorMessage;
      else delete errors[name];

      return {
        account: {
          ...account,
          [name]: value,
        },
        errors,
      };
    });
  };

  // eslint-disable-next-line class-methods-use-this
  validate() {
    const { account } = this.state;
    const { username, password } = account;
    const errors = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  validateInput({ name, value }) {
    if (name === 'username') {
      if (!value.trim()) {
        return 'Username is required';
      }
    }
    if (name === 'password') {
      if (!value.trim()) {
        return 'Password is required';
      }
    }
    return null;
  }

  render() {
    const { account, errors } = this.state;
    const { username, password } = account;

    return (
      <div>
        <h1 className="mb-3">Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            label="Password"
            value={password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
