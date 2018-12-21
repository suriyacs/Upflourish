import React from 'react';
import PropTypes from 'prop-types';

import { courseSection } from '../../globals/AppConstant';

import '../../../assets/styles/components/LearningPath.scss';

import ProfilePng from '../../../assets/images/man.svg';

const ProgramSyllabus = ({ locale }) => {
  const { syllabusList, verifyPeopleList } = courseSection;
  return (
    <div className="container-fluid program-syllabus" id="syllabus">
      <div className="row program-syllabus-content">
        <div className="col-12 offset-lg-4 col-lg-8 offset-xl-3 col-xl-9">
          <div className="heading mb-4">
            {locale.programSyllabus.title}
          </div>
          <div className="row">
            <div className="col-12 col-md-7">
              {
                syllabusList.map(syllabus => (
                  <div key={syllabus.title} className="row">
                    <div className="col-12 col-sm-2 constent-order-div">
                      <div className={syllabusList.length === syllabus.order ? '' : 'section-order-line syllabus'} />
                      <div className="section-order">{syllabus.order}</div>
                    </div>
                    {
                      syllabusList.length !== syllabus.order &&
                      <div className="col-12 col-sm-9 mb-4 p-4 syllabus-section">
                        <div className="syllabus-title mb-2">
                          {syllabus.title}
                        </div>
                        <div className="description mb-4">
                          {syllabus.desc}
                        </div>
                        <div className="row publisher-detail">
                          <div className="col-2 col-md-2 col-xl-1 profile">
                            <img src={ProfilePng} className="profile-image" alt="Profile" />
                          </div>
                          <div className="col-7 col-lg-10">
                            <div className="name">
                              {syllabus.userName}
                            </div>
                            <div className="row">
                              <div className="col-9 designation">
                                {syllabus.designation}
                              </div>
                              <div className="col-3 pr-0 designation published-at">
                                ~{syllabus.publishedAt}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                    {
                      syllabusList.length === syllabus.order &&
                      <div className="col-12 col-sm-9 p-0 last-element">
                        <div className="first-content">
                          <div
                            className="col-12 mb-4 p-4 syllabus-section"
                          >
                            <div className="syllabus-title mb-2">
                              {syllabus.title}
                            </div>
                            <div className="description mb-4">
                              {syllabus.desc}
                            </div>
                            <div className="row publisher-detail">
                              <div className="col-2 col-md-2 col-xl-1 profile">
                                <img src={ProfilePng} className="profile-image" alt="Profile" />
                              </div>
                              <div className="col-7 col-lg-10">
                                <div className="name">
                                  {syllabus.userName}
                                </div>
                                <div className="row">
                                  <div className="col-9 designation">
                                    {syllabus.designation}
                                  </div>
                                  <div className="col-3 pr-0 designation published-at">
                                    ~{syllabus.publishedAt}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 p-0">
                          <div
                            className="col-12 mb-4 p-4 syllabus-section second-content"
                          >
                            <div className="syllabus-title mb-2">
                              {syllabus.title}
                            </div>
                            <div className="description mb-4">
                              {syllabus.desc}
                            </div>
                            <div className="row publisher-detail">
                              <div className="col-2 col-md-2 col-xl-1 profile">
                                <img src={ProfilePng} className="profile-image" alt="Profile" />
                              </div>
                              <div className="col-7 col-lg-10">
                                <div className="name">
                                  {syllabus.userName}
                                </div>
                                <div className="row">
                                  <div className="col-9 designation">
                                    {syllabus.designation}
                                  </div>
                                  <div className="col-3 pr-0 designation published-at">
                                    ~{syllabus.publishedAt}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-12 mb-4 p-4 syllabus-section third-content"
                          >
                            <div className="syllabus-title mb-2">
                              {syllabus.title}
                            </div>
                            <div className="description mb-4">
                              {syllabus.desc}
                            </div>
                            <div className="row publisher-detail">
                              <div className="col-2 col-md-2 col-xl-1 profile">
                                <img src={ProfilePng} className="profile-image" alt="Profile" />
                              </div>
                              <div className="col-7 col-lg-10">
                                <div className="name">
                                  {syllabus.userName}
                                </div>
                                <div className="row">
                                  <div className="col-9 designation">
                                    {syllabus.designation}
                                  </div>
                                  <div className="col-3 pr-0 designation published-at">
                                    ~{syllabus.publishedAt}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                ))
              }
              <div className="d-flex flex-row justify-content-center view-all mb-4">
                <button className="btn view-all-btn">
                  {locale.programSyllabus.viewButtonLabel}
                </button>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="p-4 verified-section">
                <div className="title mb-4">
                  {locale.programSyllabus.verifyTitle}
                </div>
                {
                  verifyPeopleList.map(verify => (
                    <div key={verify.name} className="row verify-people mb-4">
                      <div className="col-2 col-md-2 col-xl-1 profile">
                        <img src={ProfilePng} className="profile-image" alt="Profile" />
                      </div>
                      <div className="col-7 col-lg-9">
                        <div className="name">
                          {verify.name}
                        </div>
                        <div className="designation">
                          {verify.design}
                        </div>
                      </div>
                    </div>
                  ))
                }
                <div className="c-pointer view-all">
                  {locale.programSyllabus.seeAll}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProgramSyllabus.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default ProgramSyllabus;
