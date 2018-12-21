import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';
import { connect } from 'react-redux';

import { getEmploymentHistory } from '../../actions/profile';
import { monthList } from '../../globals/AppConstant';

import PencilIcon from '../../../assets/images/pencil.svg';
import ProfilePng from '../../../assets/images/man.svg';
import AddIcon from '../../../assets/images/plus.svg';

class EmployementHistory extends React.Component {
  componentDidMount() {
    this.props.getEmployementHistory();
  }

  render() {
    const locale = this.props.locale.profile;
    const { employmentList } = this.props;
    return (
      <div className="container-fluid p-0" id="employment">
        <div className="row align-items-center">
          <div className="col-8">
            <h3 className="heading m-10px-0px">{locale.employmentHistory.title}</h3>
          </div>
          <div className="col-4">
            <span
              className="c-pointer edit"
              onClick={() => {
                this.props.openFormPopup({ formName: 'employmentDetail', isEdit: false, formObject: {} });
              }}
              role="presentation"
            >
              <img className="icon pencil-icon" src={AddIcon} alt="edit" />
            </span>
          </div>
        </div>
        <div className="profile-common-container experience-section">
          <div className="d-flex flex-row justify-content-between m-4">
            <div className="col-12 p-0">
              {
                employmentList && employmentList.length ?
                  <Fragment>
                    {
                      employmentList.map((experience, index) => (
                        <div key={`${experience.title}-${experience.employer}`} className="row">
                          {
                            employmentList && employmentList.length > 1 &&
                            <div className="col-12 col-sm-1">
                              <div
                                className={employmentList.length === index + 1 ? '' : 'section-order-line profile'}
                              />
                              <div className="section-order profile" />
                            </div>
                          }
                          <div className={`${employmentList.length > 1 ? 'col-10 p-0' : 'col-11'}`}>
                            <div className="d-flex flex-row my-2">
                              <div className="col-2 image-container p-2">
                                <img
                                  className="profile-common-icon company"
                                  src={`https://logo.clearbit.com/${experience.employer_url}`}
                                  onError={event => { event.target.src = ProfilePng; }}
                                  alt="logo"
                                />
                              </div>
                              <div className="col-6 p-0">
                                <div className="common-header-text mb-2">{experience.title}</div>
                                <div className="common-content-text font-size-15 mb-2">{experience.employer}</div>
                                <div className="common-content-text font-size-15 mb-2">
                                  {
                                    `${monthList[experience.start_month].name}  ${experience.start_year} - `
                                  }
                                  {
                                    `${experience.is_active ? 'Present' :
                                      `${monthList[experience.end_month].name}  ${experience.end_year}`}`
                                  }
                                </div>
                                <div className="common-content-text font-size-15 mb-2">{experience.city}</div>
                              </div>
                            </div>
                          </div>
                          <div className="col-1">
                            <span
                              className="c-pointer edit"
                              onClick={() => {
                                this.props.openFormPopup({
                                  formName: 'employmentDetail', isEdit: true, formObject: experience
                                });
                              }}
                              role="presentation"
                            >
                              <img className="icon pencil-icon" src={PencilIcon} alt="edit" />
                            </span>
                          </div>
                        </div>
                      ))}
                  </Fragment>
                  :
                  <div className="col-12 heading text-center">
                    {locale.employmentHistory.emptyMessage}
                  </div>
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmployementHistory.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  openFormPopup: PropTypes.func.isRequired,
  getEmployementHistory: PropTypes.func.isRequired,
  employmentList: PropTypes.any.isRequired
};

const mapDispatchToProps = dispatch => ({
  getEmployementHistory: () => dispatch(getEmploymentHistory())
});

const mapStateToProps = state => ({
  employmentList: state.profile.get('employmentList')
});

export default connect(mapStateToProps, mapDispatchToProps)((translatable(locale => locale))(EmployementHistory));
