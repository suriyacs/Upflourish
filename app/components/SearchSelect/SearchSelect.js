import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';

import 'react-select/dist/react-select.css';

import { searchCourse, getSearchedCourse } from '../../actions/course';
import '../../../assets/styles/components/SelectSearch.scss';

import WhiteSearchIcon from '../../../assets/images/search-white.svg';

class SearchSelect extends Component {
  filterOptions = options => options

  handleSearchChange = searchTerm => {
    if (searchTerm) {
      this.props.searchCourse(searchTerm);
    }
  }

  handleSelect = selectedValue => {
    const { setSelectedValue, history } = this.props;
    setSelectedValue(selectedValue);
    if (selectedValue) {
      this.props.getSearchedCourse({ searchTerm: decodeURI(selectedValue) });
      history.push(`/courses/search/${encodeURI(selectedValue)}`);
    }
  }

  handleEnterEvent = event => {
    const searchTerm = event.target.value;
    if (event.keyCode === 13 && searchTerm) {
      this.props.getSearchedCourse({ searchTerm: decodeURI(searchTerm) });
      this.props.history.push(`/courses/search/${encodeURI(searchTerm)}`);
    }
  }

  render() {
    const { searchCourseList, selectedValue } = this.props;
    return (
      <div className="select-wrapper">
        <img
          className="search-icon c-pointer"
          src={WhiteSearchIcon}
          alt="search"
        />
        <Select
          options={searchCourseList}
          value={selectedValue}
          autosize={false}
          placeholder="Search for course"
          simpleValue
          labelKey="name"
          valueKey="name"
          matchProp="label"
          onInputChange={this.handleSearchChange}
          onChange={this.handleSelect}
          onInputKeyDown={this.handleEnterEvent}
          onCloseResetsInput={false}
          onBlurResetsInput={false}
          arrowRenderer={null}
          filterOptions={this.filterOptions}
          noResultsText={null}
        />
      </div>
    );
  }
}

SearchSelect.propTypes = {
  searchCourse: PropTypes.func.isRequired,
  searchCourseList: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  selectedValue: PropTypes.string,
  getSearchedCourse: PropTypes.func.isRequired,
  setSelectedValue: PropTypes.func.isRequired
};

SearchSelect.defaultProps = {
  selectedValue: ''
};

const mapStateToProps = state => ({
  searchCourseList: Array.from(state.course.get('searchCourseList'))
});

const mapDispatchToProps = dispatch => ({
  searchCourse: searchTerm => dispatch(searchCourse(searchTerm)),
  getSearchedCourse: searchTerm => dispatch(getSearchedCourse(searchTerm))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchSelect));
