import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { programBenefits } from '../../globals/AppConstant';

import '../../../assets/styles/components/CourseOverview.scss';

const ProgramBenefit = ({ locale }) => (
  <div className="container-fluid program-benefit-section" id="program-benefit">
    <div className="col-12 offset-lg-4 col-lg-8 offset-xl-3 col-xl-9 content">
      <div className="col-12 col-sm-8 heading mb-4">
        {locale.programBenefit.title}
      </div>
      <div className="col-12 col-sm-10 col-sm-8 description mb-4">
        {locale.programBenefit.desc}
      </div>
      <div className="col-12 content-list pl-5">
        <div className="container-fluid">
          <div className="row">
            {
              programBenefits.map((benefit, index) => (
                <Fragment key={benefit.name}>
                  <div key={benefit.name} className="col-12 col-md-8 col-lg-8 col-xl-5 section-detail p-4 mr-5 mb-5">
                    <div className="row">
                      <div className="col-4 col-sm-3">
                        <img src={benefit.imageComponent} className="benefit-icon" alt="Measure" />
                      </div>
                      <div className="col-8 col-sm-9">
                        <div className="title">
                          {benefit.name}
                        </div>
                        <div className="description">
                          {benefit.desc}
                        </div>
                      </div>
                      {index + 1 !== programBenefits.length &&
                        <Fragment>
                          <div className={`line ${(index === 0 || index === 2) ? '' : 'd-xl-none'}`} />
                          <div className={`point-right-arrow ${index === 0 ? '' : 'd-xl-none'}`} />
                        </Fragment>
                      }
                      {index === 1 &&
                        <div className="curve-right-arrow d-none d-xl-block">
                          <div className="right-curve" />
                          <div className="right-point" />
                        </div>
                      }
                      {index === 2 &&
                        <Fragment>
                          <div className="curve-left-arrow d-none d-xl-block">
                            <div className="left-curve" />
                            <div className="left-point" />
                          </div>
                          <div className={`point-left-arrow ${index === 2 ? '' : 'd-lg-none'}`} />
                        </Fragment>
                      }
                    </div>
                  </div>
                </Fragment>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  </div>
);

ProgramBenefit.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default ProgramBenefit;
