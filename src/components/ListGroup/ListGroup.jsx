/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */

import React from 'react';

import cn from 'classnames';

import './styles.css';

function ListGroup({
  items,
  selectedItem,
  onItemSelect,
  idProperty = '_id',
  valueProperty = 'name',
}) {
  return (
    <ul className="list-group">
      {items.map(item => {
        const id = item[idProperty];
        const value = item[valueProperty];

        const itemClasses = cn('list-group-item', {
          active: selectedItem && id === selectedItem[idProperty],
        });

        return (
          <li
            className={itemClasses}
            onClick={() => onItemSelect(item)}
            key={id}
          >
            {value}
          </li>
        );
      })}
    </ul>
  );
}

export default ListGroup;
