/* eslint-disable react/prop-types */
import React from 'react';
import Input from './Input';

function Search({ searchTerm, onSearch }) {
  const handleSearch = ({ target: input }) => onSearch(input.value);

  return (
    <Input
      name="search"
      placeholder="Search ..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}

export default Search;
