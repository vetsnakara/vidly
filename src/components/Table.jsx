/* eslint-disable react/prop-types */
import React from 'react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

function Table({ items, columns, onSort, sortColumn }) {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} items={items} />
    </table>
  );
}

export default Table;
