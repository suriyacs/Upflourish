import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import userImg from '../../../assets/images/user_emptystate.svg';

const EmptyView = ({
  locale,
  inviteUsers,
  isSearchActive,
  searchKey
}) => (
  <div className="col-sm-12 col-xs-12 mt-2 text-center">
    <img
      className="img-fluid"
      src={userImg}
      alt={locale.inviteUsers}
    />
    <p className="empty-state-header">
      {
        isSearchActive
          ?
          locale.searchHeader
          :
          locale.emptyStateHeader
      }
    </p>
    <p className="col-md-7 empty-state-subheader">
      {
        isSearchActive
          ?
          `${locale.searchSubHeader} "${searchKey}"`
          :
          locale.emptyStateSubHeader
      }
    </p>
    {
      !isSearchActive ?
        <div className="col-md-5 mx-auto">
          <Button type="submit" value={locale.inviteUsers} className="" onClick={() => inviteUsers()} />
        </div>
        :
        null
    }
  </div>
);

EmptyView.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  inviteUsers: PropTypes.func.isRequired,
  isSearchActive: PropTypes.bool.isRequired,
  searchKey: PropTypes.string
};

EmptyView.defaultProps = {
  searchKey: null
};

export default EmptyView;
