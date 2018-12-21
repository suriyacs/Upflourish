import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import _ from 'lodash';
import { translatable } from 'react-multilingual';

import {
  fetchCourseList,
  createCourse,
  fetchMyCourses,
  fetchAllCategories
} from '../../actions/learningPath';
import { searchCourse, getExpertSearchedCourse } from '../../actions/course';
import LearningPath from '../LearningPath/LearningPathForm';
import SelectList from '../../components/FormComponents/Select';
import ImageURL from '../../components/Image/ImageURL';
import {
  expertDashboardTabs,
  thumnailCourseType,
  courseDropdownList
} from '../../globals/AppConstant';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import NoDataFound from '../../components/NoDataFound/NoDataFound';

import '../../../assets/styles/components/Dashboard.scss';

import NoImage from '../../../assets/images/no-image.svg';
import LearningPathIcon from '../../../assets/images/new-path.svg';
import CloseIcon from '../../../assets/images/close.svg';
import Star from '../../../assets/images/star.svg';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLearningPathOpen: false,
      activeTab: 0
    };
    this.closeOnEsc = true;
  }

  componentDidMount() {
    this.props.fetchCourseList('');
    this.props.fetchAllCategories();
  }

  onClickCreateOrCloseLearningPath = () => {
    this.setState(({ isLearningPathOpen }) => ({
      isLearningPathOpen: !isLearningPathOpen
    }));
  }

  onClickLearningPath = course => {
    this.props.history.push(`/${_.lowerCase(course.display_name.replace(/ /g, ''))}/${course.id}`);
  }

  /* // To change the language in reducer
  changeLanguage = (event, langCode) => {
    event.preventDefault();
    // Language code like en, fr, ta, etc.,
    this.props.changeLocale(langCode);
  }; */

  setActiveTab = index => {
    const { userId } = this.props;
    this.setState({ activeTab: index });
    if (index === 0) {
      this.props.fetchCourseList('');
    } else if (index === 1) {
      this.props.fetchMyCourses(userId);
    }
  }

  getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

  handleSearchChange = searchTerm => {
    if (searchTerm) {
      this.props.searchCourse(searchTerm);
    }
  }

  handleSelect = searchTerm => {
    this.setState({ searchTerm });
    if (searchTerm) {
      this.props.getExpertSearchedCourse({ searchTerm });
    }
  }

  handleEnterEvent = event => {
    const searchTerm = event.target.value;
    if (event.keyCode === 13 && searchTerm) {
      this.props.getExpertSearchedCourse({ searchTerm: decodeURI(searchTerm) });
    }
  }

  handleFilterSelect = (value, key) => {
    const { filterValues = {} } = this.props;
    const { searchTerm } = this.state;
    filterValues[key] = value;
    this.props.getExpertSearchedCourse({
      searchTerm,
      ...filterValues
    });
  }

  afterCreateLearningPath = () => {
    this.setState({ isLearningPathOpen: false });
  }

  dateFormater = date => {
    let formatedDate = new Date(date).toUTCString();
    formatedDate = formatedDate.split(' ').slice(1, 4).join(' ');
    return formatedDate;
  }

  searchLearningPath = value => {
    this.props.fetchCourseList(value);
  }

  closeOnEscape = () => {
    this.closeOnEsc = !this.closeOnEsc;
  }

  handleCreate = courseDetail => {
    this.props.createCourse(courseDetail, this.afterCreateLearningPath);
  }

  externalCloseButton = functionName => (
    <div className="common-close-icon">
      <img
        role="presentation"
        src={CloseIcon}
        alt="close"
        className="icon close-icon c-pointer"
        onClick={functionName}
      />
    </div>
  );

  renderLearningPath = learningPath => {
    const locale = this.props.locale.dashboard;
    const { ratingCount, starRating } = this.props;
    const randomRatingCount = (ratingCount === 0) ? this.getRandomInt(1000) : ratingCount;
    let randomStarRating = (starRating === 0.0) ? this.getRandomInt(5) : starRating;
    randomStarRating += 0.5;
    return (
      <div key={learningPath.id} className="col-sm-6 col-md-6 col-lg-3 py-3 px-2">
        <div
          className="learner-learning-path min-h-90 zoomIn m-0"
          role="presentation"
          onClick={() => this.onClickLearningPath(learningPath)}
        >
          <div className="card-view text-left zoomIn c-pointer">
            <div className="path-card text-truncate">
              <img
                className="zoomingImg"
                src={ImageURL(thumnailCourseType[learningPath.display_name] ?
                  thumnailCourseType[learningPath.display_name].url : '', learningPath.id)}
                alt="learningPath"
                onError={event => { event.target.src = NoImage; }}
              />
            </div>
            <div className="card-detail">
              <div className="h-75">
                <div className="title">{learningPath.name}</div>
                <div className="description pt-1">
                  {locale.lastUpdateText} {this.dateFormater(learningPath.modified_at)}
                </div>
              </div>
              <div className="h-25">
                <div className="row description">
                  <div className="col-1 star-count">{randomStarRating}</div>
                  <img className="star-img p-0" src={Star} alt="rating" />
                  <div className="col-4 p-0">({randomRatingCount} {locale.ratings})</div>
                  <div className="col-5 p-l-0 text-right">{learningPath.learner_count} {locale.learners}</div>
                </div>
              </div>
            </div>
            <label
              className="card-label text-center"
              htmlFor={learningPath.display_name}
            >
              {learningPath.display_name}
            </label>
            {!learningPath.is_published &&
              <label className="unpublished-label text-center" htmlFor="unpublished-label">
                {locale.unPublished}
              </label>
            }
          </div>
        </div>
      </div>
    );
  }

  renderTabs = () => {
    const { activeTab } = this.state;
    const locale = this.props.locale.expertDashboardTabs;
    return (
      <div className="expert-course-tabs nav nav-tabs w-100 mb-3 h-100">
        {expertDashboardTabs.map((tab, index) => (
          <li
            className={`nav-item ${activeTab === index ? 'active-tab' : ''}`}
            onClick={() => this.setActiveTab(index)}
            role="presentation"
            key={tab}
          >
            <div className="nav-link c-pointer">{locale[index]}</div>
          </li>
        ))}
      </div>
    );
  }

  renderCount = () => {
    const { activeTab } = this.state;
    const { courseList, myCourses } = this.props;
    if (activeTab === 0) {
      return courseList ? courseList.length : 0;
    } else if (activeTab === 1) {
      return myCourses ? myCourses.length : 0;
    }
  }

  render() {
    const { isLearningPathOpen, activeTab } = this.state;
    const {
      courseList, myCourses, loading, categories, searchCourseList
    } = this.props;
    const locale = this.props.locale.dashboard;
    return (
      <div className="container-fluid">
        <Loader loading={loading} />
        <div className="row">
          {this.renderTabs()}
          <div className="col-12 learning-path-container">
            {(((courseList.size > 0 || courseList.length > 0) && activeTab === 0) ||
              ((myCourses.size > 0 || myCourses.length > 0) && activeTab === 1)) &&
              <div className="row learning-path-total expert-screen">
                <div className="col-9 count-and-search">
                  <form className="row">
                    <div className="col-3 learning-path-count">
                      <span className="text-nowrap">
                        {this.renderCount()} {locale.countLabel}
                      </span>
                    </div>
                    <div className="col-3">
                      <SelectList
                        htmlFor="Search"
                        labelName="Search"
                        name="searchTerm"
                        options={searchCourseList}
                        onInputChange={this.handleSearchChange}
                        handleChange={(e, value) => this.handleSelect(value)}
                        labelKey="name"
                        valueKey="name"
                        placeholder="Search for course"
                        simpleValue
                      />
                    </div>
                    <div className="col-3">
                      <SelectList
                        htmlFor="Course type"
                        name="courseType"
                        labelName="Course type"
                        options={courseDropdownList}
                        placeholder="Course type"
                        labelKey="name"
                        valueKey="name"
                        handleChange={(e, value) => this.handleFilterSelect(value, 'courseType')}
                        simpleValue
                      />
                    </div>
                    <div className="col-3">
                      <SelectList
                        htmlFor="Category"
                        name="category_id"
                        labelName="Category"
                        options={categories}
                        placeholder="Category"
                        labelKey="name"
                        valueKey="id"
                        handleChange={(e, value) => this.handleFilterSelect(value, 'category_id')}
                        simpleValue
                      />
                    </div>
                  </form>
                </div>
                <div className="col-3 p-0">
                  <Button
                    htmlFor="newPath"
                    className="new-learning-path"
                    role="presentation"
                    value={locale.createNew}
                    onClick={this.onClickCreateOrCloseLearningPath}
                  />
                </div>
              </div>
            }
            <div className="container-fluid">
              <div className="row">
                {(((courseList.size > 0 || courseList.length > 0) && activeTab === 0) ||
                  ((myCourses.size > 0 || myCourses.length > 0) && activeTab === 1)) &&
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3 learning-path py-3 px-2"
                    role="presentation"
                    onClick={this.onClickCreateOrCloseLearningPath}
                  >
                    <div className="learningPaths new-path h-100">
                      <div className="col-12 new-learningpath">
                        {locale.addLearningPathLabel}
                      </div>
                      <div className="p-30">
                        <img
                          src={LearningPathIcon}
                          alt="learningPath"
                        />
                      </div>
                    </div>
                  </div>
                }
                {
                  activeTab === 0 &&
                  courseList.map(learningPath => (
                    this.renderLearningPath(learningPath)
                  ))
                }
                {
                  activeTab === 1 &&
                  myCourses.map(learningPath => (
                    this.renderLearningPath(learningPath)
                  ))
                }
              </div>
              {(((courseList.size <= 0 || courseList.length <= 0) && activeTab === 0) ||
                ((myCourses.size <= 0 || myCourses.length <= 0) && activeTab === 1)) && loading === false &&
                <NoDataFound
                  buttonText={locale.addLearningPathLabel}
                  onClick={this.onClickCreateOrCloseLearningPath}
                  description={locale.noDataDescription}
                />
              }
            </div>
          </div>
        </div>
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg opacity-1"
          isOpen={isLearningPathOpen}
          onClose={this.afterCreateLearningPath}
          centered={isLearningPathOpen}
          external={this.externalCloseButton(this.afterCreateLearningPath)}
          className="custom-modal-dialog"
        >
          <LearningPath
            onClose={this.afterCreateLearningPath}
            courseId=""
            closeOnEscape={this.closeOnEscape}
            handleCreate={this.handleCreate}
            titleLabel={locale.careerCreateLabel}
          />
        </Modal>
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
  fetchCourseList: PropTypes.func.isRequired,
  courseList: PropTypes.array.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  createCourse: PropTypes.func.isRequired,
  fetchMyCourses: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  myCourses: PropTypes.array.isRequired,
  ratingCount: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  starRating: PropTypes.number,
  searchCourse: PropTypes.func.isRequired,
  searchCourseList: PropTypes.array.isRequired,
  getExpertSearchedCourse: PropTypes.func.isRequired,
  filterValues: PropTypes.object.isRequired
};

Dashboard.defaultProps = {
  ratingCount: 0,
  starRating: 4
};

const mapStateToProps = state => ({
  loading: state.learningPath.get('loading'),
  courseList: Array.from(state.learningPath.get('learningPaths')),
  myCourses: Array.from(state.learningPath.get('myCourses')),
  categories: Array.from(state.learningPath.get('categories')),
  searchCourseList: Array.from(state.course.get('searchCourseList')),
  userId: state.user.get('userId'),
  filterValues: getFormValues('SearchCourse')(state) || {}
});

const mapDispatchToProps = dispatch => ({
  fetchCourseList: searchKey => dispatch(fetchCourseList(searchKey)),
  createCourse: (course, cb) => dispatch(createCourse(course, cb)),
  fetchMyCourses: id => dispatch(fetchMyCourses(id)),
  searchCourse: searchTerm => dispatch(searchCourse(searchTerm)),
  getExpertSearchedCourse: searchTerm => dispatch(getExpertSearchedCourse(searchTerm)),
  fetchAllCategories: () => dispatch(fetchAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)((reduxForm({
  form: 'SearchCourse'
})(Dashboard))));
