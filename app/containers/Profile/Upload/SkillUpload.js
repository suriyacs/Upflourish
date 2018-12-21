import React, { Component, Fragment } from 'react';
import { translatable } from 'react-multilingual';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';

import SelectList from '../../../components/FormComponents/Select';
import Loader from '../../../components/Loader/Loader';
import {
  getMasterSkillList,
  getLearnerSpecificSkill,
  addSelectedSkill,
  clearMasterSkillList
} from '../../../actions/profile';
import { routeConstant } from '../../../globals/AppConstant';

import DeleteSvg from '../../../../assets/images/delete-photo.svg';

class SkillUpload extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.selectedSkillList.length) {
      return {
        selectedSkillList: nextProps.learnerSkillList
      };
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selectedSkillList: [],
      showError: false
    };
    this.deletedSkills = [];
  }

  componentDidMount() {
    this.props.getLearnerSpecificSkill();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.skillDetail, prevProps.skillDetail)) {
      this.props.history.push(routeConstant.CATALOG);
    }
  }

  handleChange = value => {
    if (value) {
      this.setState({
        showError: false
      });
      this.props.getMasterSkillList(value);
    }
  };

  handleSelect = value => {
    if (value.id) {
      const tempList = this.state.selectedSkillList.slice();
      if (!_.find(tempList, { id: value.id }) && !_.find(tempList, { skill_id: value.id })) {
        tempList.push(value);
        this.setState({
          selectedSkillList: tempList,
          showError: false
        });
      } else {
        this.setState({
          showError: true
        });
      }
    } else {
      this.setState({
        showError: false
      });
      this.props.clearMasterSkillList();
    }
  };
  updateSkill = () => {
    const { selectedSkillList } = this.state;
    const requestJson = [];
    _.forEach(selectedSkillList, skill => {
      if (skill.skill_id) {
        requestJson.push({ id: skill.id, skill_id: skill.skill_id });
      } else {
        requestJson.push({ skill_id: skill.id });
      }
    });
    this.props.addSelectedSkill({
      updatedInfo: {
        skills: requestJson,
        deletedSkills: this.deletedSkills || []
      }
    });
  };

  deleteSkill = skill => {
    let tempList = this.state.selectedSkillList.slice();
    tempList = _.reject(tempList, { id: skill.id });
    if (skill.skill_id) {
      this.deletedSkills.push(skill.id);
    }
    this.setState({
      selectedSkillList: tempList
    });
  }

  render() {
    const locale = this.props.locale.uploadResume;
    const { options, loading } = this.props;
    const { value, selectedSkillList, showError } = this.state;
    return (
      <div className="skill-section">
        <Loader loading={loading} />
        <div className="container-fluid">
          <div className="row align-items-center my-3">
            <div className="col-12 col-md-8 col-lg-9">
              <div className="upload-resume-title mb-2">
                {locale.uploadSkillTitle}
              </div>
              <div className="upload-resume-description">
                {locale.uploadSkillSubTitle}
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-3">
              <div className="d-flex flex-column">
                <button
                  disabled={selectedSkillList.length < 3}
                  className="btn proceed-btn mt-3 mt-md-0 float-md-right"
                  onClick={() => { this.updateSkill(); }}
                >
                  <span>
                    {locale.proceed}
                  </span>
                  <span>
                    <i className="fa fa-angle-right ml-2 right-angle" />
                  </span>
                </button>
              </div>
              <div className="d-flex flex-column atleast-font mt-2">
                {locale.addAtleastSkill}
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mb-4">
          <div className="row my-3 mx-2">
            <div className="col-12 col-lg-8 col-xl-6 skill-search-section">
              <form>
                <SelectList
                  htmlFor="Correct Answer"
                  value={value}
                  labelName="Correct Answer"
                  name="searchskill"
                  onInputChange={this.handleChange}
                  options={_.isArray(options) ? options : []}
                  handleChange={this.handleSelect}
                  labelKey="name"
                  valueKey="id"
                  className="search-box"
                  placeholder="Start typing to add skills (ex: Data Analysis)"
                />
                {
                  showError &&
                  <div className="col-12 text-left error-message">
                    {locale.error}
                  </div>
                }
              </form>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-3 mb-4 skill-list">
          <div className="col-12">
            <div className="title mx-2 mb-2 text-left">
              {locale.skills}
            </div>
            <div className="row my-3 mx-2 skill-contents">
              {
                selectedSkillList && selectedSkillList.length ?
                  <div className="col-11">
                    {
                      selectedSkillList.map(skill => (
                        <div key={skill.id} className="badge badge-secondary individual-skill mr-3 mb-3">
                          <span className="align-items-center m-2">
                            <span className="skill-name mr-3">
                              {skill.name}
                            </span>
                            <span>
                              <img
                                src={DeleteSvg}
                                alt="delete"
                                className="delete-svg c-pointer"
                                role="presentation"
                                onClick={() => { this.deleteSkill(skill); }}
                              />
                            </span>
                          </span>
                        </div>
                      ))
                    }
                  </div>
                  :
                  <Fragment>
                    <span className="col-12 col-md-6 text-center empty-skill-error">
                      {locale.emptySkill}
                    </span>
                  </Fragment>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SkillUpload.propTypes = {
  locale: PropTypes.object.isRequired,
  options: PropTypes.any.isRequired,
  getMasterSkillList: PropTypes.func.isRequired,
  getLearnerSpecificSkill: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  addSelectedSkill: PropTypes.func.isRequired,
  skillDetail: PropTypes.any.isRequired,
  history: PropTypes.object.isRequired,
  clearMasterSkillList: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getMasterSkillList: searchTerm => dispatch(getMasterSkillList(searchTerm)),
  getLearnerSpecificSkill: () => dispatch(getLearnerSpecificSkill()),
  addSelectedSkill: skillList => dispatch(addSelectedSkill(skillList)),
  clearMasterSkillList: () => dispatch(clearMasterSkillList())
});

const mapStateToProps = state => ({
  options: state.profile.get('masterSkillList'),
  learnerSkillList: state.profile.get('learnerSkillList'),
  loading: state.profile.get('loading'),
  skillDetail: state.profile.get('skillDetail')
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)((translatable(locale => locale)((reduxForm({
  form: 'SearchSkill'
})(SkillUpload))))));
