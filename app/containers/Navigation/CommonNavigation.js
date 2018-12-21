import React from 'react';
import PropTypes from 'prop-types';

class CommonNavigation extends React.Component {
  componentDidMount() {
    this.elemHeight = this.elemHeight.clientHeight;
  }

  handleSelect = (e, selectedTab) => {
    this.props.handleSelect(e, selectedTab);
  }

  render() {
    const { tabHeaderList, isProfile, activeSection } = this.props;
    return (
      <div
        className={`custom-nav-tab ${isProfile ? 'profile-tab' : ''} mb-1`}
        id="profile-nav-tab"
        ref={elem => { this.elemHeight = elem; }}
      >
        <ul className="nav nav-tabs tab-ul" id="myTab" role="tablist">
          {tabHeaderList.map(header => (
            <li
              key={header}
              onClick={e => this.handleSelect(e, header)}
              className={`nav-item pt-1 ${header === 'skills' ? 'custom-size' : ''}`}
              role="presentation"
            >
              <a
                className={`nav-link tab-content c-pointer ${activeSection === header
                  ? 'active' : ''}`}
                id={`${header}-tab`}
                href={`#${header}`}
              > {header}
              </a>
            </li>))}
        </ul>
      </div>
    );
  }
}

CommonNavigation.defaultProps = {
  isProfile: false
};

CommonNavigation.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  tabHeaderList: PropTypes.array.isRequired,
  isProfile: PropTypes.bool,
  activeSection: PropTypes.string.isRequired
};
export default CommonNavigation;
