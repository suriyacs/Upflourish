import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';

import { courseSection } from '../../globals/AppConstant';

import FiveStar from '../../../assets/images/five-stars.svg';
import OneStar from '../../../assets/images/one-star.svg';
import ProfilePng from '../../../assets/images/man.svg';

const StudentReview = ({ locale }) => {
  const {
    ratingsCount,
    commentList,
    starCount,
    currentRating,
    total
  } = courseSection;
  return (
    <div className="container-fluid student-review-section pt-4" id="review">
      <div className="row">
        <div className="col-12 col-lg-8 offset-lg-4 offset-xl-3 col-xl-8 pt-3">
          <div className="heading pb-4">
            {locale.studentReview.heading}
          </div>
          <div className="row rating-section">
            <div className="col-12 col-lg-3 col-xl-2">
              <div className="ml-3 rating-number">
                {currentRating}
              </div>
              <div className="d-flex flex-row align-items-center mb-2">
                <span>
                  <img className="start-image" src={FiveStar} alt="Five-star" />
                </span>
                <span className="ml-2 over-all-stars">
                  {total}
                </span>
              </div>
              <div className="ml-3 avg-rating-label">
                {locale.studentReview.avgRating}
              </div>
            </div>
            <div className="col-12 col-sm-9 col-lg-8 mt-2">
              {
                ratingsCount.map(value => (
                  <div key={value.rating} className="row mt-2  progress-bar-section align-items-center">
                    <div className="col col-sm-3 ratings d-flex flex-row">
                      {
                        starCount.map(count => (
                          count <= value.rating ?
                            <span key={count}>
                              <img className="star-image" src={OneStar} alt="Five-star" />
                            </span> :
                            <span key={count}>
                              <img className="star-image hide-star" src={OneStar} alt="Five-star" />
                            </span>
                        ))
                      }
                    </div>
                    <div className="col col-sm-6 mt-1 rating-progress-bar">
                      <Progress value={value.percentage} />
                    </div>
                    <div className="col p-0 col-sm-2 mt-1 percentage">
                      {value.percentage}%
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="review-section mt-5">
            {
              commentList.map((review, index) => (
                <div
                  key={review.name}
                  className={`
                  col-12 col-lg-11 user-detail mb-4 ${commentList.length !== (index + 1) ? 'show-border' : ''}
                `}
                >
                  <div className={`row ${commentList.length === (index + 1) ? 'last-review' : ''}`}>
                    <div className="col-3 col-md-2 col-xl-1 profile">
                      <span>
                        <img
                          src={ProfilePng}
                          className="profile-image"
                          alt="profile"
                        />
                      </span>
                    </div>
                    <div className="col-5 col-md-2 col-xl-2 pl-2">
                      <div className="name">
                        {review.name}
                      </div>
                      <div className="user-rating-start">
                        <img className="start-image" src={FiveStar} alt="Five-star" />
                      </div>
                    </div>
                    <div className="col-12 col-md-8 col-xl-9 pl-2">
                      <div className="review">
                        {review.comment}
                      </div>
                    </div>
                  </div>
                  {
                    commentList.length !== (index + 1) &&
                    <div className="d-flex flex-row mb-1 mt-4">
                      <span className="flex-column pr-3 date">
                        {review.day}
                      </span>
                      <span className="flex-column c-pointer pl-3 report">
                        {locale.studentReview.report}
                      </span>
                    </div>
                  }
                  {
                    commentList.length === (index + 1) &&
                    <div className="row view-all-review-section align-items-center">
                      <div className="col-5 p-0 left-border" />
                      <div className="col-2 p-0 c-pointer view-all">
                        {locale.studentReview.allReviews}
                      </div>
                      <div className="col-5 p-0 right-border" />
                    </div>
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

StudentReview.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default StudentReview;
