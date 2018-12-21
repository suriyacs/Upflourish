import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { routeConstant, smallCourseTypes } from '../../globals/AppConstant';
import Card from '../../components/CardView/Card';
import { getAllLearningPathMaterialsByCategory } from '../../actions/learningPath';

class TopLearningPaths extends Component {
  constructor() {
    super();
    this.state = {
      activeCategoryName: 'All'
    };
  }

  componentDidMount() {
    this.props.getAllLearningPathMaterialsByCategory('');
  }

  setActiveCategory = category => {
    this.setState({
      activeCategoryName: category.name
    });
    if (category.name === 'All') {
      this.props.getAllLearningPathMaterialsByCategory('');
    } else if (category.id) {
      this.props.getAllLearningPathMaterialsByCategory(category.id);
    }
  }

  dateFormater = date => {
    let formatedDate = new Date(date).toUTCString();
    formatedDate = formatedDate.split(' ').slice(1, 4).join(' ');
    return formatedDate;
  }

  renderPaths = (path, labelName) => (
    <Card
      title={path.name}
      updatedTime={path.modified_at}
      imageURL={path.thumbnail || 'http://foreignpolicyblogs.com/wp-content/uploads/technology.jpg'}
      isLabelEnabled
      labelName={labelName}
    />
  );

  render() {
    const { activeCategoryName } = this.state;
    const locale = this.props.landingLocale.topLearningPaths;
    const { categories, categoryLearningPathMaterials, onClickCourse } = this.props;
    return (
      <div className="container top-learningpaths">
        <div className="col-12 text-center pb-2">
          <div
            className="header-title pb-4"
          >
            {locale.title}
          </div>
          <nav className="justify-content-center navbar navbar-expand-md py-0 px-0 pb-2">
            <ul className="navbar-nav">
              <li
                className={`${activeCategoryName === 'All' ? 'active' : ''} c-pointer`}
                onClick={() => this.setActiveCategory({ name: 'All' })}
                role="presentation"
              >
                {locale.trending}
              </li>
              {
                categories.map(category => (
                  <li
                    className={`${activeCategoryName === category.name ? 'active' : ''} c-pointer`}
                    onClick={() => this.setActiveCategory(category)}
                    role="presentation"
                    key={category.name}
                  >
                    {category.name}
                  </li>))
              }
            </ul>
          </nav>
        </div>
        <div className="col-12 text-center">
          <div className="row">
            {categoryLearningPathMaterials && categoryLearningPathMaterials.size !== 0 &&
              <Fragment>
                {categoryLearningPathMaterials.careerTrack.map(path => (
                  <div
                    key={path.id}
                    className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 p-3"
                    onClick={() => { onClickCourse(path.id, smallCourseTypes['Career track']); }}
                    role="presentation"
                  >
                    {this.renderPaths(path, locale.careerTrack)}
                  </div>
                ))}
                {categoryLearningPathMaterials.skillTrack.map(path => (
                  <div
                    key={path.id}
                    className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 p-3"
                    onClick={() => { onClickCourse(path.id, smallCourseTypes['Skill track']); }}
                    role="presentation"
                  >
                    {this.renderPaths(path, locale.skillTrack)}
                  </div>
                ))}
                {categoryLearningPathMaterials.microLearning.map(path => (
                  <div
                    key={path.id}
                    className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 p-3"
                    onClick={() => { onClickCourse(path.id, smallCourseTypes['Micro learning']); }}
                    role="presentation"
                  >
                    {this.renderPaths(path, locale.learningNuggets)}
                  </div>
                ))}
              </Fragment>
            }
          </div>
          <NavLink exact to={`${routeConstant.COURSES}`}>
            <button className="btn explore-all mt-3 mb-3">{locale.exploreAll}</button>
          </NavLink>
        </div>
      </div>
    );
  }
}

TopLearningPaths.propTypes = {
  landingLocale: PropTypes.objectOf(PropTypes.any).isRequired,
  categories: PropTypes.array.isRequired,
  getAllLearningPathMaterialsByCategory: PropTypes.func.isRequired,
  categoryLearningPathMaterials: PropTypes.object.isRequired,
  onClickCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  categories: Array.from(state.learningPath.get('categories')),
  loading: state.learningPath.get('loading'),
  categoryLearningPathMaterials: state.learningPath.get('categoryLearningPathMaterials')
});

const mapDispatchToProps = dispatch => ({
  getAllLearningPathMaterialsByCategory: categoryId => dispatch(getAllLearningPathMaterialsByCategory(categoryId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopLearningPaths);
