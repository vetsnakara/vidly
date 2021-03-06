/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */

import Joi from 'joi-browser';

import React from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import Form from './Form';

import authService from '../services/authService';

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
    try {
      const {
        context,
        location: { state },
      } = this.props;
      const { username: email, password } = this.state.data;

      const user = await authService.login(email, password);
      toast.success(`Welcome, ${user.name}!`);
      context.setUser(user);

      const url = state ? state.referrer : '/';
      this.props.history.push(url);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState(({ errors }) => ({
          errors: { ...errors, username: ex.response.data },
        }));
      }
    }
  }

  // todo: show toast on redirect
  // componentDidMount() {
  // eslint-disable-next-line no-alert
  // alert('cdm');
  //   const { user } = this.props.context;
  //   if (user) toast.info("You're Currently logged in");
  // }

  render() {
    const { user } = this.props.context;
    if (user) return <Redirect to="/" />;

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
