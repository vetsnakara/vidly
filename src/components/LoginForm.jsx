/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */

import Joi from 'joi-browser';

import React from 'react';
import Form from './Form';
import Input from './Input';

class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
    },
    errors: {},
  };

  validateSchema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password'),
  };

  doSubmit() {
    console.log('Form is submitted to the server');
  }

  render() {
    const { data, errors } = this.state;
    const { username, password } = data;

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
          <button
            disabled={this.validate()}
            type="submit"
            className="btn btn-primary"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
