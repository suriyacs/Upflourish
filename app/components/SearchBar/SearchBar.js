import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../../assets/styles/components/SearchBar.scss';

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      showSearchBar: false,
      searchString: ''
    };
    this.searchBar = React.createRef();
  }

  toggleSearchBar = () => {
    this.setState(previousState => {
      if (previousState.searchString !== '') this.props.onChange('');
      if (!previousState.showSearchBar) this.searchBar.current.focus();
      return ({
        showSearchBar: !previousState.showSearchBar,
        searchString: ''
      });
    });
  }

  handleChange = e => {
    const { value } = e.target;
    if (value || value === '') {
      this.setState({ searchString: value });
      this.props.onChange(value);
    }
  }

  render() {
    const { showSearchBar, searchString } = this.state;
    const { dark, alwaysOpen, maxTextLength } = this.props;
    return (
      <div className={`align-self-center search ${dark ? 'dark' : 'light'}`}>
        <input
          className={`search-box ${alwaysOpen || showSearchBar ? 'show-icon' : 'hide-icon'}`}
          placeholder="Search"
          type="text"
          value={searchString}
          ref={this.searchBar}
          onChange={this.handleChange}
          maxLength={maxTextLength}
        />
        {(showSearchBar || alwaysOpen) ?
          <i className="fa fa-times close-icon" role="presentation" onClick={this.toggleSearchBar} /> :
          <i className="fa fa-search search-icon" role="presentation" onClick={this.toggleSearchBar} />
        }
      </div>
    );
  }
}

Searchbar.propTypes = {
  onChange: PropTypes.func.isRequired,
  dark: PropTypes.bool,
  alwaysOpen: PropTypes.bool,
  maxTextLength: PropTypes.string
};

Searchbar.defaultProps = {
  dark: false,
  alwaysOpen: false,
  maxTextLength: '100'
};

export default Searchbar;
