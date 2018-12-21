import React from 'react';
import PropTypes from 'prop-types';

import { courseSection } from '../../globals/AppConstant';

import '../../../assets/styles/components/Course.scss';

import ProfilePng from '../../../assets/images/testimonial-slide.png';
import QuoteLeft from '../../../assets/images/quote-left.svg';

const Testimonial = ({ locale }) => {
  const { testimonialsCount } = courseSection;
  return (
    <div className="container-fluid testimonial-section" id="testimonial">
      <div className="row">
        <div className="col-12 col-lg-8 offset-lg-4 offset-xl-3 col-xl-9 pt-4">
          <div className="header-section mb-5">
            {locale.testimonial.title}
          </div>
          <div id="carouselExampleIndicators" className="row carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
              <li data-target="#carouselExampleIndicators" data-slide-to="1" />
              <li data-target="#carouselExampleIndicators" data-slide-to="2" />
            </ol>
            <div className="carousel-inner">
              {
                testimonialsCount.map(slide => (
                  <div key={slide} className={`carousel-item ${slide === 1 ? 'active' : ''}`}>
                    <div className="row body">
                      <div className="col-4 image-section">
                        <img className="d-block w-100" src={ProfilePng} alt="First slide" />
                      </div>
                      <div className="col-8 comment-section">
                        <div className="row mb-5">
                          <div className="col-1">
                            <img className="quote-image" src={QuoteLeft} alt="Quote" />
                          </div>
                          <div className="col-10 comment">
                            {locale.testimonial.comment}
                          </div>
                        </div>
                        <div className="ml-5 name">
                          {locale.testimonial.manager}
                        </div>
                        <div className="ml-5 company-name">
                          {locale.testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true">
                <i className="fa fa-angle-left slide-icon" />
              </span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true">
                <i className="fa fa-angle-right slide-icon" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

Testimonial.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Testimonial;
