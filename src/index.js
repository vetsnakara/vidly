/* eslint-env browser */
/* eslint-disable react/jsx-filename-extension */

import 'babel-polyfill';

// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import logger from './services/logService';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

logger.init();

ReactDOM.render(<App />, document.querySelector('#root'));

if (process.env.NODE_ENV === 'development') module.hot.accept();
