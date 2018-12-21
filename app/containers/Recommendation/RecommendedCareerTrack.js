import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Carousel from '../../components/Carousel/Carousel';
import Card from '../../components/CardView/Card';
import { thumnailCourseType } from '../../globals/AppConstant';
import ImageURL from '../../components/Image/ImageURL';

const RecommendedCareerTrack = props => {
  const locale = props.locale.recommendations.recommendedCareerTrack;
  const { allLearningPathMaterials, checkIfEnrolled } = props;
  return (
    <div>
      {allLearningPathMaterials && allLearningPathMaterials.size !== 0 &&
      allLearningPathMaterials.careerTrack && allLearningPathMaterials.careerTrack.length > 0 &&
        <div className="row m-0 pt-4 recommended-career-track">
          <div className="title col-12 p-0">{locale.title}</div>
          <p>{locale.description}</p>
          <div className="col-12 p-0">
            {allLearningPathMaterials.size !== 0 &&
              <Carousel
                customWidth={allLearningPathMaterials.careerTrack.length < 3}
              >
                {allLearningPathMaterials.careerTrack.map(path => (
                  <div
                    key={path.id}
                    className="col-12 p-0"
                    onClick={() => { checkIfEnrolled(path.id, path.courseType); }}
                    role="presentation"
                  >
                    <Card
                      title={path.name}
                      updatedTime={path.modified_at}
                      imageURL={ImageURL(thumnailCourseType[path.display_name] ?
                        thumnailCourseType[path.display_name].url : '', path.id)}
                      learnerCount={path.learnerCount}
                    />
                  </div>
                ))}
              </Carousel>
            }
          </div>
        </div>
      }
    </div>
  );
};

RecommendedCareerTrack.propTypes = {
  checkIfEnrolled: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  allLearningPathMaterials: PropTypes.object.isRequired
};

export default withRouter(RecommendedCareerTrack);
