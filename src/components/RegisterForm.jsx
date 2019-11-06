/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */

import Joi from 'joi-browser';

import React from 'react';
import Form from './Form';

import * as userService from '../services/userService';

class RegisterForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
      name: '',
    },
    errors: {},
  };

  validateSchema = {
    username: Joi.string()
      .email()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .min(5)
      .label('Password'),
    name: Joi.string()
      .required()
      .label('Name'),
  };

  async doSubmit() {
    const { data: user } = this.state;
    await userService.register(user);
  }

  render() {
    return (
      <div>
        <h1 className="mb-3">Register Form</h1>
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
          {this.renderInput({
            name: 'name',
            label: 'Name',
          })}
          {this.renderSubmitButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
