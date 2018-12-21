import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Card from '../../components/CardView/Card';
import { getAllLearningPathMaterials } from '../../actions/learningPath';
import ImageURL from '../../components/Image/ImageURL';
import { thumnailCourseType } from '../../globals/AppConstant';

import '../../../assets/styles/components/Catalog.scss';

class Catalog extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.scrollFunction);
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
    const { activeSubCategory, allLearningPathMaterials, checkIfEnrolled } = this.props;
    const locale = this.props.locale.catalog;
    return (
      <Fragment>
        <div className="unscrolled-header catalog-category pt-2 pb-2 px-4">
          {activeSubCategory &&
          <Fragment>
            <div className="title">{activeSubCategory.name}</div>
            <p className="description multiline-ellipsis">
              {activeSubCategory.description}
            </p>
          </Fragment>
          }
        </div>
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
                onClick={() => checkIfEnrolled(careerTrack.id, careerTrack.courseType)}
                role="presentation"
              >
                <Card
                  title={careerTrack.name}
                  updatedTime={careerTrack.modified_at}
                  imageURL={ImageURL(thumnailCourseType[careerTrack.display_name] ?
                    thumnailCourseType[careerTrack.display_name].url : '', careerTrack.id)}
                  isLabelEnabled
                  labelName={locale.careerTrack}
                  learnerCount={careerTrack.learnerCount}
                />
              </div>
            ))}
            {allLearningPathMaterials.skillTrack && allLearningPathMaterials.skillTrack.map(skillTrack => (
              <div
                key={skillTrack.id}
                className="col-12 col-md-6 col-lg-4 py-2 px-2"
                onClick={() => checkIfEnrolled(skillTrack.id, skillTrack.courseType)}
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
            {allLearningPathMaterials.microLearning && allLearningPathMaterials.microLearning.map(microLearning => (
              <div
                key={microLearning.id}
                className="col-12 col-md-6 col-lg-4 py-2 px-2"
                onClick={() => this.props.goToMicroLearningPage(microLearning)}
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
      </Fragment>
    );
  }
}

Catalog.propTypes = {
  activeSubCategory: PropTypes.object.isRequired,
  allLearningPathMaterials: PropTypes.object.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  goToMicroLearningPage: PropTypes.func,
  checkIfEnrolled: PropTypes.func.isRequired
};

Catalog.defaultProps = {
  goToMicroLearningPage: null
};

const mapStateToProps = state => ({
  loading: state.learningPath.get('loading'),
  allLearningPathMaterials: state.learningPath.get('allLearningPathMaterials')
});

const mapDispatchToProps = dispatch => ({
  getAllLearningPathMaterials: subCategoryId => dispatch(getAllLearningPathMaterials(subCategoryId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Catalog));
