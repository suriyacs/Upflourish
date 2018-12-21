import React from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';

class Certificate extends React.Component {
  constructor() {
    super();
    this.state = {
      courseHistory: [
        {
          name: 'Docker in-depth Training Course',
          timePeriod: '2nd Feb 2017',
          place: 'Udacity'
        },
        {
          name: 'Cloud Architect (AWS & Azure)',
          timePeriod: '3rd March 2016',
          place: 'Simplilearn | Masters Program'
        },
        {
          name: 'DevOps Certification Training Course',
          timePeriod: '3rd Feb 2016',
          place: 'Udacity'
        }
      ]
    };
  }
  render() {
    const { courseHistory } = this.state;
    const locale = this.props.locale.profile;
    return (
      <div className="container-fluid p-0 opacity-04" id="certificates">
        <div className="row align-items-center">
          <div className="col-12">
            <h3 className="heading m-10px-0px">{locale.certificateSection.title}</h3>
          </div>
          {/* <div className="col-4">
            <span
              className="c-pointer edit"
              onClick={() => { this.props.openFormPopup({ formName: 'certificationform', isEdit: false }); }}
              role="presentation"
            >
              <img className="icon pencil-icon" src={AddIcon} alt="edit" />
            </span>
          </div> */}
        </div>
        <div className="profile-common-container course-section">
          <div className="d-flex flex-row justify-content-between">
            <div className="col-12 p-0 container-fluid">
              { courseHistory.map(course => (
                <div
                  key={course.name}
                  className="row m-4 justify-content-between"
                >
                  <div className="col-10 col-lg-12 container-fluid p-0 mx-1">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-12 col-sm-9">
                        <div className="common-header-text mb-2">{course.name}</div>
                        <div className="common-content-text font-size-15 mb-2">{course.place}</div>
                        <div className="common-content-text font-size-15 mb-2">{course.timePeriod}</div>
                      </div>
                      <div className="col-12 col-sm-3">
                        <button className="btn btn-primary certificate-button">
                          {locale.certificateSection.view}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-2 col-lg-1 pl-4">
                    <div className="d-flex flex-column">
                      <span
                        className="c-pointer edit"
                        onClick={() => { this.props.openFormPopup({ formName: 'certificationform', isEdit: true }); }}
                        role="presentation"
                      >
                        <img className="icon pencil-icon" src={PencilIcon} alt="edit" />
                      </span>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Certificate.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default (translatable(locale => locale))(Certificate);
