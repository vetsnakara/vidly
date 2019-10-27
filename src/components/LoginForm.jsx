/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */

import Joi from 'joi-browser';

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

  validateSchema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password'),
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

    const options = {
      abortEarly: false,
    };

    const { error: results } = Joi.validate(
      account,
      this.validateSchema,
      options,
    );

    if (!results) return null;

    const errors = results.details.reduce((all, current) => {
      const { path, message } = current;
      const [name] = path;

      return { ...all, [name]: message };
    }, {});

    return errors;
  }

  validateInput({ name, value }) {
    const input = { [name]: value };

    const schema = { [name]: this.validateSchema[name] };

    const { error } = Joi.validate(input, schema);
    const message = error ? error.details[0].message : null;

    return message;
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
