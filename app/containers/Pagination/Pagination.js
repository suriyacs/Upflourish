import React from 'react';
import PropTypes from 'prop-types';

import '../../../assets/styles/components/Pagination.scss';

const Pagination = props => {
  const { togglePage, numberOfPages, activePage } = props;
  return (
    <div className="pagination-container">
      <div
        className={`pagination-button first-page ${activePage === 1 ? 'disabled' : ''}`}
        onClick={activePage !== 1 ? () => togglePage(1) : null}
        role="presentation"
      >
        <i className="fa fa-caret-left" /><i className="fa fa-caret-left" />
      </div>
      <div
        className={`pagination-button previous-page ${activePage === 1 ? 'disabled' : ''}`}
        onClick={activePage !== 1 ? () => togglePage(activePage - 1) : null}
        role="presentation"
      >
        <i className="fa fa-caret-left" />
      </div>
      <div className="pagination-button current-page">{activePage}</div>
      <div
        className={`pagination-button next-page ${!numberOfPages || numberOfPages === activePage ? 'disabled' : ''}`}
        onClick={numberOfPages && numberOfPages !== activePage ? () => togglePage(activePage + 1) : null}
        role="presentation"
      >
        <i className="fa fa-caret-right" />
      </div>
      <div
        className={`pagination-button last-page ${!numberOfPages || numberOfPages === activePage ? 'disabled' : ''}`}
        onClick={numberOfPages && numberOfPages !== activePage ? () => togglePage(numberOfPages) : null}
        role="presentation"
      >
        <i className="fa fa-caret-right" /><i className="fa fa-caret-right" />
      </div>
    </div>
  );
};

Pagination.propTypes = {
  togglePage: PropTypes.func.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired
};

export default Pagination;
