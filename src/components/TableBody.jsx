/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */

import _ from 'lodash';

import React from 'react';

function TableBody({ items, columns }) {
  const renderCell = (item, column) => {
    const { path, content, key } = column;
    const cellContent = content ? content(item) : _.get(item, path);
    return <td key={path || key}>{cellContent}</td>;
  };

  return (
    <tbody>
      {items.map(item => (
        <tr key={item._id}>
          {columns.map(column => renderCell(item, column))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
