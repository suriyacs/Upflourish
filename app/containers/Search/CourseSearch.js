import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translatable } from 'react-multilingual';
import { reduxForm, getFormValues } from 'redux-form';

import Card from '../../components/CardView/Card';
import SelectList from '../../components/FormComponents/Select';
import { fetchAllCategories } from '../../actions/learningPath';
import { getSearchedCourse } from '../../actions/course';
import ImageURL from '../../components/Image/ImageURL';
import { smallCourseTypes, thumnailCourseType, courseDropdownList } from '../../globals/AppConstant';
import storage from '../../globals/localStorage';

import '../../../assets/styles/components/Catalog.scss';
import GeneralHeader from '../LandingPage/GeneralHeader';
import userImg from '../../../assets/images/user_emptystate.svg';

class CourseSearch extends Component {
  componentDidMount() {
    const { searchParam } = this.props.match.params;
    window.addEventListener('scroll', this.scrollFunction);
    this.props.getSearchedCourse({ searchTerm: decodeURI(searchParam) });
    this.props.fetchAllCategories();
  }

  onClickGeneralContent = (courseId, courseType) => {
    this.props.history.push({
      pathname: `/${courseType}/${courseId}`
    });
  }

  handleSelect = (value, key) => {
    const { filterValues = {} } = this.props;
    const { searchParam } = this.props.match.params;
    filterValues[key] = value;
    this.props.getSearchedCourse({
      searchTerm: decodeURI(searchParam),
      ...filterValues
    });
  }

  scrollFunction = () => {
    if ((document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) &&
      document.getElementsByClassName('unscrolled-header')[0] &&
      document.getElementsByClassName('scrolled-header')[0]) {
      document.getElementsByClassName('unscrolled-header')[0].classList.add('d-none');
      document.getElementsByClassName('scrolled-header')[0].classList.remove('d-none');
    } else if (document.getElementsByClassName('unscrolled-header')[0] &&
      document.getElementsByClassName('scrolled-header')[0]) {
      document.getElementsByClassName('unscrolled-header')[0].classList.remove('d-none');
      document.getElementsByClassName('scrolled-header')[0].classList.add('d-none');
    }
  }

  render() {
    const { searchCourseData, categories } = this.props;
    const locale = this.props.locale.catalog;
    const userData = storage.getItem('user');
    const { searchParam } = this.props.match.params;
    return (
      <Fragment>
        {!userData &&
          <GeneralHeader />
        }
        <div className={userData ? '' : 'container'}>
          <div className={`row ${userData ? '' : 'body-section'}`}>
            <div className="filter-section">
              <form>
                <div className="head-line">
                  Filter
                </div>
                <SelectList
                  isLableRequired
                  htmlFor="Course type"
                  labelName="Course type"
                  name="courseType"
                  options={courseDropdownList}
                  placeholder="Course type"
                  className="mb-4"
                  labelKey="name"
                  valueKey="name"
                  simpleValue
                  handleChange={(e, value) => this.handleSelect(value, 'courseType')}
                />
                <SelectList
                  isLableRequired
                  htmlFor="Category"
                  labelName="Category"
                  name="category_id"
                  options={categories}
                  placeholder="Category"
                  className="mb-4"
                  labelKey="name"
                  valueKey="id"
                  simpleValue
                  handleChange={(e, value) => this.handleSelect(value, 'category_id')}
                />
              </form>
            </div>
            {searchCourseData && searchCourseData.length > 0 ?
              <main className="col-9 pb-4 px-0 content-view">
                {searchCourseData.length &&
                  <div className="scrolled-header py-2 px-4">
                    <div className="title">{decodeURI(searchParam)}</div>
                    <span className="count">{searchCourseData.length} {locale.learningOptions}</span>
                  </div>
                }
                <div className="px-5 py-4 myCatalog">
                  <div className="row">
                    {searchCourseData.map(course => (
                      <div
                        key={course.id}
                        className="col-12 col-md-6 col-lg-4 py-2 px-2"
                        onClick={() => this.onClickGeneralContent(course.id, smallCourseTypes[course.display_name])}
                        role="presentation"
                      >
                        <Card
                          title={course.name}
                          updatedTime={course.modified_at}
                          imageURL={ImageURL(thumnailCourseType[course.display_name] ?
                            thumnailCourseType[course.display_name].url : '', course.id)}
                          isLabelEnabled
                          learnerCount={course.learnerCount}
                          labelName={course.display_name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </main>
              :
              <div className="col-sm-9 col-xs-9 mt-2 text-center d-flex flex-column justify-content-center">
                <img
                  className="img-fluid"
                  src={userImg}
                  alt="No Courses Found"
                />
                <h4>
                  No Courses Found
                </h4>
              </div>}
          </div>
        </div>
      </Fragment>
    );
  }
}

CourseSearch.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  filterValues: PropTypes.object.isRequired,
  getSearchedCourse: PropTypes.func.isRequired,
  searchCourseData: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loading: state.learningPath.get('loading'),
  searchCourseData: Array.from(state.course.get('searchCourseData')),
  categories: Array.from(state.learningPath.get('categories')),
  filterValues: getFormValues('courseFilter')(state) || {}
});

const mapDispatchToProps = dispatch => ({
  getSearchedCourse: searchTerm => dispatch(getSearchedCourse(searchTerm)),
  fetchAllCategories: () => dispatch(fetchAllCategories())
});

export default withRouter(translatable(locale => locale)(reduxForm({
  form: 'courseFilter'
})(connect(mapStateToProps, mapDispatchToProps)(CourseSearch))));
