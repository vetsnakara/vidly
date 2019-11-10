/* eslint-disable no-undef */

function get() {
  return localStorage.getItem('token');
}

function set(token) {
  localStorage.setItem('token', token);
}

function remove() {
  localStorage.removeItem('token');
}

export default { get, set, remove };
