/* eslint-disable react/state-in-constructor */

import React from 'react';

class LoginForm extends React.Component {
  state = {
    account: {
      username: '',
      password: '',
    },
  };

  username = React.createRef();

  password = React.createRef();

  componentDidMount() {
    this.username.current.focus();
  }

  handleSubmit = e => {
    e.preventDefault();
    // const username = this.username.current.value;
    // const password = this.password.current.value;
  };

  handleChange = ({ target: input }) => {
    const { name, value } = input;
    this.setState(({ account }) => ({
      account: {
        ...account,
        [name]: value,
      },
    }));
  };

  render() {
    const { account } = this.state;
    const { username, password } = account;

    return (
      <div>
        <h1 className="mb-3">Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Username
              <input
                id="username"
                name="username"
                type="text"
                className="form-control"
                ref={this.username}
                onChange={this.handleChange}
                value={username}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password
              <input
                id="password"
                name="password"
                type="text"
                className="form-control"
                onChange={this.handleChange}
                value={password}
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
