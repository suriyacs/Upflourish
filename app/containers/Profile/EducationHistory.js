import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';
import { connect } from 'react-redux';

import { getEducationDetail } from '../../actions/profile';
import { monthList } from '../../globals/AppConstant';

import PencilIcon from '../../../assets/images/pencil.svg';
import AddIcon from '../../../assets/images/plus.svg';

class EducationHistory extends React.Component {
  componentDidMount() {
    this.props.getEducationDetail();
  }

  render() {
    const { educationList } = this.props;
    const locale = this.props.locale.profile;
    return (
      <div className="container-fluid p-0" id="education">
        <div className="row align-items-center">
          <div className="col-8">
            <h3 className="heading m-10px-0px">{locale.educationSection.title}</h3>
          </div>
          <div className="col-4">
            <span
              className="c-pointer edit"
              onClick={() => {
                this.props.openFormPopup({ formName: 'educationDetail', isEdit: false, formObject: {} });
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
                educationList && educationList.length ?
                  <Fragment>
                    {educationList.map((education, index) => (
                      <div key={education.title} className="row">
                        {
                          educationList && educationList.length > 1 &&
                            <div className="col-12 col-sm-1">
                              <div className={educationList.length === index + 1 ? '' : 'section-order-line profile'} />
                              <div className="section-order profile" />
                            </div>
                        }
                        <div className={`${educationList.length > 1 ? 'col-10 p-0' : 'col-11'}`}>
                          <div className="d-flex flex-row my-2">
                            <div className="col-6 p-0">
                              <div className="common-header-text mb-2">{education.institute}</div>
                              <div className="common-content-text font-size-15 mb-2">{education.title}</div>
                              <div className="common-content-text font-size-15 mb-2">
                                {
                                  `${monthList[education.start_month].name}  ${education.start_year} - `
                                }
                                {
                                  `${education.is_active ? 'Present' :
                                    `${monthList[education.end_month].name}  ${education.end_year}`}`
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <span
                            className="c-pointer edit"
                            onClick={() => {
                              this.props.openFormPopup({
                                formName: 'educationDetail', isEdit: true, formObject: education
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
                    {locale.educationSection.emptyMessage}
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EducationHistory.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  openFormPopup: PropTypes.func.isRequired,
  getEducationDetail: PropTypes.func.isRequired,
  educationList: PropTypes.any.isRequired
};

const mapDispatchToProps = dispatch => ({
  getEducationDetail: () => dispatch(getEducationDetail())
});

const mapStateToProps = state => ({
  educationList: state.profile.get('educationList')
});

export default connect(mapStateToProps, mapDispatchToProps)((translatable(locale => locale))(EducationHistory));
