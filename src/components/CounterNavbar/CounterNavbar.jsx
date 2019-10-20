/* eslint-disable react/prop-types */
import React from 'react';

import './styles.css';

function CounterNavbar({ totalCounters }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand">Navbar</span>
      <span className="badge badge-pill badge-secondary">{totalCounters}</span>
    </nav>
  );
}

export default CounterNavbar;
