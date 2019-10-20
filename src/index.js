/* eslint-env browser */
/* eslint-disable react/jsx-filename-extension */

import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(<App />, document.querySelector('#root'));

if (process.env.NODE_ENV === 'development') module.hot.accept();
