/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import cn from 'classnames';

function Pagination({ itemsCount, pageSize, currentPage, onPageChange }) {
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {_.range(1, pagesCount + 1).map(pageNum => {
          const classes = cn('page-item', {
            active: pageNum === currentPage,
          });

          return (
            <li className={classes} key={pageNum}>
              <button
                type="button"
                className="page-link"
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
