/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */

import Joi from 'joi-browser';

import React from 'react';
import Form from './Form';

import * as authService from '../services/authService';

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
      .email()
      .label('Username'),
    password: Joi.string()
      .required()
      .min(5)
      .label('Password'),
  };

  async doSubmit() {
    try {
      const { username: email, password } = this.state.data;
      await authService.login(email, password);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState(({ errors }) => ({
          errors: { ...errors, username: ex.response.data },
        }));
      }
    }
  }

  render() {
    return (
      <div>
        <h1 className="mb-3">Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: 'username',
            label: 'Username',
          })}
          {this.renderInput({
            name: 'password',
            label: 'Password',
            type: 'password',
          })}
          {this.renderSubmitButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
