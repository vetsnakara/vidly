/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

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

  renderSortIcon(column) {
    const { sortColumn } = this.props;
    if (sortColumn.path !== column.path) return null;
    if (sortColumn.order === 'asc') {
      return <FaSortUp />;
    }
    return <FaSortDown />;
  }

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map(column => {
            const { path, label, key } = column;
            return (
              <th
                className="clickable"
                onClick={() => this.raiseSort(path)}
                key={path || key}
              >
                {label}
                {this.renderSortIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
