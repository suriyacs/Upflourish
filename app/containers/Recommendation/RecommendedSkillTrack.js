import React from 'react';
import PropTypes from 'prop-types';

import Carousel from '../../components/Carousel/Carousel';
import Card from '../../components/CardView/Card';
import { thumnailCourseType } from '../../globals/AppConstant';
import ImageURL from '../../components/Image/ImageURL';

const RecommendedSkillTrack = props => {
  const locale = props.locale.recommendations.recommendedSkillTrack;
  const { allLearningPathMaterials, checkIfEnrolled } = props;
  return (
    <div>
      {allLearningPathMaterials && allLearningPathMaterials.size !== 0 &&
        allLearningPathMaterials.skillTrack && allLearningPathMaterials.skillTrack.length > 0 &&
        <div className="row m-0 pt-4 recommended-skill-track">
          <div className="title col-12 p-0">{locale.title}</div>
          <p>{locale.description}</p>
          <div className="col-12 p-0">
            {allLearningPathMaterials.size !== 0 &&
              <Carousel
                customWidth={allLearningPathMaterials.skillTrack.length < 3}
              >
                {allLearningPathMaterials && allLearningPathMaterials.skillTrack.map(path => (
                  <div
                    key={path.id}
                    className="col-12 px-0 c-pointer"
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

RecommendedSkillTrack.propTypes = {
  checkIfEnrolled: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  allLearningPathMaterials: PropTypes.object.isRequired
};

export default RecommendedSkillTrack;
