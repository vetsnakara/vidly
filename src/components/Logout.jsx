/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React from 'react';

import { toast } from 'react-toastify';

import UserContext from '../context/user';
import WithContext from './hoc/WithContext';

import authService from '../services/authService';

class Logout extends React.Component {
  componentDidMount() {
    const { context, history } = this.props;

    const user = authService.getCurrentUser();

    if (!user) {
      toast.info('You are not logged in!');
      history.goBack();
      return;
    }

    toast.success(`See you, ${user.name}!`);
    authService.logout();
    context.unsetUser();

    history.push('/');
  }

  render() {
    return null;
  }
}

export default WithContext(UserContext, Logout);
