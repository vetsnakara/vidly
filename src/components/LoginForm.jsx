/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */

import Joi from 'joi-browser';

import React from 'react';
import Form from './Form';

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
