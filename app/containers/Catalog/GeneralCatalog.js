import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translatable } from 'react-multilingual';

import Card from '../../components/CardView/Card';
import { getAllLearningPathMaterials } from '../../actions/learningPath';
import ImageURL from '../../components/Image/ImageURL';
import { routeConstant, thumnailCourseType } from '../../globals/AppConstant';

import '../../../assets/styles/components/Catalog.scss';
import CategorySideMenu from '../SideMenu/CategorySideMenu';
import GeneralHeader from '../LandingPage/GeneralHeader';

class Catalog extends Component {
  constructor() {
    super();
    this.state = {
      activeSubCategory: null
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.scrollFunction);
    this.props.getAllLearningPathMaterials('');
  }

  onClickGeneralContent = (courseId, courseType) => {
    this.props.history.push({
      pathname: `/${courseType}/${courseId}`
    });
  }

  handleClickSubCategory = activeSubCategory => {
    this.setState({
      activeSubCategory
    });
    this.props.getAllLearningPathMaterials(activeSubCategory.id);
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
    const { activeSubCategory } = this.state;
    const { allLearningPathMaterials } = this.props;
    const locale = this.props.locale.catalog;
    return (
      <Fragment>
        <GeneralHeader />
        <div className="container">
          <div className="row body-section">
            <CategorySideMenu
              handleClickSubCategory={this.handleClickSubCategory}
              locale={this.props.locale}
              isGeneral
            />
            <main className="col-9 pb-4 px-0 content-view">
              {activeSubCategory &&
                <div className="unscrolled-header catalog-category pt-2 pb-2 px-4">
                  <Fragment>
                    <div className="title">{activeSubCategory.name}</div>
                    <p className="description multiline-ellipsis">
                      {activeSubCategory.description}
                    </p>
                  </Fragment>
                </div>
              }
              { activeSubCategory &&
                <div className="scrolled-header py-2 px-4 d-none">
                  <div className="title">{activeSubCategory.name}</div>
                  <span className="count">{allLearningPathMaterials.totalCount} {locale.learningOptions}</span>
                </div>
              }
              <div className="px-5 py-4 myCatalog">
                <div className="row">
                  {allLearningPathMaterials.careerTrack && allLearningPathMaterials.careerTrack.map(careerTrack => (
                    <div
                      key={careerTrack.id}
                      className="col-12 col-md-6 col-lg-4 py-2 px-2"
                      onClick={() => this.onClickGeneralContent(careerTrack.id, routeConstant.CAREER_TRACK)}
                      role="presentation"
                    >
                      <Card
                        title={careerTrack.name}
                        updatedTime={careerTrack.modified_at}
                        imageURL={ImageURL(thumnailCourseType[careerTrack.display_name] ?
                          thumnailCourseType[careerTrack.display_name].url : '', careerTrack.id)}
                        isLabelEnabled
                        learnerCount={careerTrack.learnerCount}
                        labelName={locale.careerTrack}
                      />
                    </div>
                  ))}
                  {allLearningPathMaterials.skillTrack && allLearningPathMaterials.skillTrack.map(skillTrack => (
                    <div
                      key={skillTrack.id}
                      className="col-12 col-md-6 col-lg-4 py-2 px-2"
                      onClick={() => this.onClickGeneralContent(skillTrack.id, routeConstant.SKILL_TRACK)}
                      role="presentation"
                    >
                      <Card
                        title={skillTrack.name}
                        updatedTime={skillTrack.modified_at}
                        imageURL={ImageURL(thumnailCourseType[skillTrack.display_name] ?
                          thumnailCourseType[skillTrack.display_name].url : '', skillTrack.id)}
                        isLabelEnabled
                        learnerCount={skillTrack.learnerCount}
                        labelName={locale.skillTrack}
                      />
                    </div>
                  ))}
                  {allLearningPathMaterials.microLearning &&
                  allLearningPathMaterials.microLearning.map(microLearning => (
                    <div
                      key={microLearning.id}
                      className="col-12 col-md-6 col-lg-4 py-2 px-2"
                      onClick={() => this.onClickGeneralContent(microLearning.id, routeConstant.MICRO_LEARNING)}
                      role="presentation"
                    >
                      <Card
                        title={microLearning.name}
                        updatedTime={microLearning.modified_at}
                        imageURL={ImageURL(thumnailCourseType[microLearning.display_name] ?
                          thumnailCourseType[microLearning.display_name].url : '', microLearning.id)}
                        isLabelEnabled
                        learnerCount={microLearning.learnerCount}
                        labelName={locale.learningNugget}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </Fragment>
    );
  }
}

Catalog.propTypes = {
  allLearningPathMaterials: PropTypes.object.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  getAllLearningPathMaterials: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loading: state.learningPath.get('loading'),
  allLearningPathMaterials: state.learningPath.get('allLearningPathMaterials')
});

const mapDispatchToProps = dispatch => ({
  getAllLearningPathMaterials: subCategoryId => dispatch(getAllLearningPathMaterials(subCategoryId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(Catalog)));
