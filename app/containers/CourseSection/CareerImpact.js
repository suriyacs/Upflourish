import React from 'react';
import PropTypes from 'prop-types';

import Carousel from '../../components/Carousel/Carousel';
import { courseSection } from '../../globals/AppConstant';
import BarChart from './BarChart';

import '../../../assets/styles/components/Course.scss';

import ProfilePng from '../../../assets/images/man.svg';

const CareerImpact = ({ locale }) => {
  const { careerImpact: { barChartData, reviewList } } = courseSection;
  return (
    <div className="container-fluid career-impact-section" id="career-impact">
      <div className="row">
        <div className="col-12 offset-lg-4 col-lg-8 offset-xl-3 col-xl-9">
          <div className="row chart-section pb-4">
            <div className="col-12 mt-4 col-sm-5 heading-section">
              <div className="heading mb-2">
                {locale.careerImpact.title}
              </div>
              <div className="desc">
                {locale.careerImpact.description}
              </div>
            </div>
            <div className="col-12 col-sm-6 mb-3 chart-body">
              <BarChart barChartData={barChartData} />
            </div>
            <div className="col-12 col-sm-11 carousel-section mb-4">
              <div className="title mb-3">
                {locale.careerImpact.transition}
              </div>
              <div className="slider-section">
                <Carousel>
                  {
                    reviewList.map(slide => (
                      <div key={slide.name} className="slide-common">
                        <div className="slide-content col p-0">
                          <div className="d-flex flex-row header-section p-3">
                            <span>
                              <img
                                src={ProfilePng}
                                className="profile-image"
                                alt="profile"
                              />
                            </span>
                            <span className="d-flex flex-column pl-2">
                              <span className="name">
                                {slide.name}
                              </span>
                              <span className="completed-time">
                                {locale.careerImpact.completion}
                              </span>
                            </span>
                          </div>
                          <div className="d-flex flex-row work-section current p-3">
                            <div className="d-flex flex-column label-section">
                              <span className="label mb-2">
                                {locale.careerImpact.currenty}
                              </span>
                              <span className="company-name">
                                {slide.current}
                              </span>
                            </div>
                            <span className="icon-section">
                              <img
                                className="company-icon"
                                src={`https://logo.clearbit.com/${slide.url}`}
                                onError={event => { event.target.src = ProfilePng; }}
                                alt="logo"
                              />
                            </span>
                          </div>
                          <div className="d-flex work-section flex-row p-3">
                            <div className="d-flex flex-column label-section">
                              <span className="label mb-2">
                                {locale.careerImpact.previously}
                              </span>
                              <span className="company-name">
                                {slide.prev}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CareerImpact.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default CareerImpact;
