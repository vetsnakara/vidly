/* eslint-disable no-underscore-dangle */

export function byGenre(selected) {
  return ({ genre }) => genre._id === selected._id;
}

export function byTitle(searchTerm) {
  return ({ title }) =>
    title.toLowerCase().includes(searchTerm.toLowerCase().trim());
}
