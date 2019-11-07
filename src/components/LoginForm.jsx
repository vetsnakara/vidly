/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */

import Joi from 'joi-browser';

import React from 'react';
import { toast } from 'react-toastify';

import Form from './Form';

import * as authService from '../services/authService';

import WithContext from './hoc/WithContext';
import UserContext from '../context/user';

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
    const { setUser } = this.props.context;

    try {
      const { username: email, password } = this.state.data;
      const { data: jwt } = await authService.login(email, password);
      localStorage.setItem('token', jwt);
      setUser();
      toast.success(`Welcome!`);
      this.props.history.push('/');
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

export default WithContext(UserContext, LoginForm);
