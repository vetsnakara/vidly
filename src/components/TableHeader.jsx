/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class TableHeader extends Component {
  raiseSort(path) {
    const { sortColumn, onSort } = this.props;

    const newSortColumn = { path };

    if (path === sortColumn.path) {
      newSortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      newSortColumn.order = 'asc';
    }

    onSort(newSortColumn);
  }

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map(({ path, label, key }) => (
            <th onClick={() => this.raiseSort(path)} key={path || key}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
