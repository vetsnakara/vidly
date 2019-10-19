/* eslint-env browser */
/* eslint-disable react/jsx-filename-extension */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';

// import Counter from './components/Counter';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';

// ReactDOM.render(<Counter />, document.querySelector('#root'));

ReactDOM.render(<App />, document.querySelector('#root'));

if (process.env.NODE_ENV === 'development') module.hot.accept();
