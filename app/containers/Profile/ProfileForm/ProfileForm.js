import React, { Component, Fragment } from 'react';
import { reduxForm, isDirty } from 'redux-form';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { ModalBody, ModalFooter } from 'reactstrap';
import { translatable } from 'react-multilingual';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import DeleteIcon from '../../../../assets/images/delete-photo.svg';
import DragIcon from '../../../../assets/images/move.svg';

import { ProfileFormInfo } from '../../../globals/AppConstant';
import ImageURL from '../../../components/Image/ImageURL';
import {
  updatePersonalDetail,
  updateEmploymentHistory,
  addEmploymentHistory,
  deleteEmploymentHistory,
  addEducationDetail,
  updateEducationDetail,
  deleteEducationDetail,
  addSelectedSkill,
  getMasterSkillList,
  clearMasterSkillList,
  createIntrestedCategories
} from '../../../actions/profile';
import { fetchAllCategories } from '../../../actions/learningPath';
import Loader from '../../../components/Loader/Loader';

import CloseIcon from '../../../../assets/images/close_grey.svg';
import ProfilePng from '../../../../assets/images/man.svg';

let formData = new FormData();
let isNewCategoryInitialized = false;
const SortableSkillList = SortableElement(({ value, deleteSkill }) => (
  <div className="row actual-skill p-3">
    <div className="col-8 p-0 name">
      {value.name}
    </div>
    <div className="col-4 p-0">
      <div className="d-flex flex-row justify-content-end">
        <span className="col-2 c-pointer">
          <img
            src={DeleteIcon}
            role="presentation"
            alt="profile"
            className="icon"
            onClick={() => { deleteSkill(value); }}
          />
        </span>
        <span className="col-2 c-pointer">
          <img src={DragIcon} alt="profile" className="icon" />
        </span>
      </div>
    </div>
  </div>
));

const EditSkillSection = SortableContainer(props => (
  <div className="sortable-skill-list container-fluid p-0">
    <div className="col-12 p-0">
      {props.skillList.map((value, index) => (
        <div key={`item-${value.skill_id}`} className="container-fluid">
          <SortableSkillList
            index={index}
            value={value}
            style={{ 'z-index': 100000 }}
            deleteSkill={props.deleteSkill}
            disabled
          />
        </div>
      ))}
    </div>
  </div>
));

const mapDispatchToProps = dispatch => ({
  personalDetailUpdate: personalDetail => dispatch(updatePersonalDetail(personalDetail)),
  employmentDetailUpdate: employmentDetail => dispatch(updateEmploymentHistory(employmentDetail)),
  employmentDetailAdd: employmentDetail => dispatch(addEmploymentHistory(employmentDetail)),
  employmentDetailDelete: id => dispatch(deleteEmploymentHistory(id)),
  educationDetailAdd: educationDetail => dispatch(addEducationDetail(educationDetail)),
  educationDetailUpdate: educationDetail => dispatch(updateEducationDetail(educationDetail)),
  educationDetailDelete: id => dispatch(deleteEducationDetail(id)),
  skillDetailAdd: skillDetail => dispatch(addSelectedSkill(skillDetail)),
  getMasterSkillList: searchTerm => dispatch(getMasterSkillList(searchTerm)),
  clearMasterSkillList: () => dispatch(clearMasterSkillList()),
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  interestedCategoriesAdd: data => dispatch(createIntrestedCategories(data.updatedInfo))
});

const mapStateToProps = state => ({
  userId: state.user.get('userId'),
  personalDetail: state.profile.get('personalDetail'),
  employmentDetail: state.profile.get('employmentDetail'),
  educationDetail: state.profile.get('educationDetail'),
  skillDetail: state.profile.get('skillDetail'),
  loading: state.profile.get('loading'),
  options: state.profile.get('masterSkillList'),
  reduxState: state,
  categories: Array.from(state.learningPath.get('categories'))
});

class ProfileForm extends Component {
  static getDerivedStateFromProps(props, prevState) {
    if (props.categories.length !== 0 && props.selectedComponent.formObject.interestedCategories &&
        prevState.newCategories.length === 0 && !isNewCategoryInitialized) {
      const comparingValue = ['id', 'name'];
      const newCategories = props.categories.filter(category => (
        !props.selectedComponent.formObject.interestedCategories.some(interestedCategory => (
          category.id === interestedCategory.id
        ))
      )).map(category => (
        comparingValue.reduce((newCategory, name) => {
          newCategory[name] = category[name];
          return newCategory;
        }, {})
      ));
      isNewCategoryInitialized = true;
      return { newCategories };
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      uploadProfile: this.props.selectedComponent.isEdit ?
        ImageURL('Users', this.props.selectedComponent.formObject.id) :
        ProfilePng,
      currentlyActive: this.props.selectedComponent.formObject.is_active ?
        this.props.selectedComponent.formObject.is_active : false,
      selectedSkillList: this.props.selectedComponent.formObject.learnerSkillList || [],
      showError: false,
      isFormChanged: false,
      interestedCategories: props.selectedComponent.formObject.interestedCategories || [],
      newCategories: []
    };
    this.yearList = [];
    this.isProfileChanged = false;
    this.deletedSkils = [];
  }

  componentDidMount() {
    this.props.fetchAllCategories();
    const max = new Date().getFullYear();
    _.each(_.range(max, max - 50), value => {
      this.yearList.push({ id: value, year: value });
    });
    const initialFormValues = {};
    if (this.props.selectedComponent.formName && this.props.selectedComponent.formObject) {
      _.each(ProfileFormInfo[this.props.selectedComponent.formName].fields, field => {
        initialFormValues[field] = this.props.selectedComponent.formObject[field];
      });
      this.props.initialize(initialFormValues);
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedComponent } = this.props;
    if (!this.props.loading &&
      !_.isEqual(this.props[selectedComponent.formName], prevProps[selectedComponent.formName])) {
      this.deletedSkils.splice(0);
      this.props.closeFormPopup();
    }
  }

  componentWillUnmount() {
    isNewCategoryInitialized = false;
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      let { selectedSkillList } = this.state;
      let order = 1;
      selectedSkillList = arrayMove(selectedSkillList, oldIndex, newIndex);
      _.each(selectedSkillList, selectedSkill => {
        selectedSkill.order = order;
        order += 1;
      });
      this.setState({
        selectedSkillList
      });
    }
  };

  handleDropImage = acceptedFiles => {
    this.setState({ isFormChanged: true });
    if (acceptedFiles[0].type.indexOf('image') === 0) {
      this.setState({ uploadProfile: acceptedFiles[0].preview });
    }
    formData = new FormData();
    this.isProfileChanged = true;
    acceptedFiles.forEach(file => {
      formData.append('file', file, file.name);
    });
  }

  deleteSkill = value => {
    const tempSelectedSkill = this.state.selectedSkillList;
    _.remove(tempSelectedSkill, selectedSkill => selectedSkill.id === value.id);
    // _.each(tempSelectedSkill, selectedSkill => {
    //   if (selectedSkill.order > value.order) {
    //     selectedSkill.order -= 1;
    //   }
    // });
    if (value.skill_id) {
      this.deletedSkils.push(value.id);
    }
    this.setState({
      selectedSkillList: tempSelectedSkill,
      isFormChanged: true
    });
  };

  updateSkill = () => {
    this.props.skillDetailAdd({
      updatedInfo: {
        skills: this.state.selectedSkillList,
        deletedSkills: this.deletedSkils
      }
    });
  };

  handleSubmit = values => {
    const { selectedComponent } = this.props;
    if (this.state.currentlyActive) {
      values.is_active = this.state.currentlyActive;
      delete values.end_month;
      delete values.end_year;
    }
    if (selectedComponent.formName === 'skillDetail') {
      const { selectedSkillList } = this.state;
      const requestJson = [];
      _.each(selectedSkillList, skill => {
        if (skill.skill_id) {
          requestJson.push({ id: skill.id, skill_id: skill.skill_id });
        } else {
          requestJson.push({ skill_id: skill.id });
        }
      });
      values = { skills: requestJson, deletedSkills: this.deletedSkils || [] };
    } else if (selectedComponent.formName === 'interestedCategories') {
      const { interestedCategories } = this.state;
      values = interestedCategories;
      this.props.closeFormPopup();
    }
    if (selectedComponent.isEdit) {
      this.props[`${selectedComponent.formName}Update`]({
        updatedInfo: values,
        userId: this.props.userId,
        id: selectedComponent.formObject.id,
        profileImage: this.isProfileChanged ? formData : ''
      });
    } else {
      this.props[`${selectedComponent.formName}Add`]({
        updatedInfo: values,
        userId: this.props.userId,
        id: selectedComponent.formObject.id,
        profileImage: this.isProfileChanged ? formData : ''
      });
    }
  };

  changeCurrentStatus = () => {
    this.setState(({ currentlyActive }) => ({
      currentlyActive: !currentlyActive
    }));
  }

  deleteHistory = () => {
    const { selectedComponent } = this.props;
    this.props[`${selectedComponent.formName}Delete`](selectedComponent.formObject.id);
  }

  handleChange = value => {
    if (value) {
      if (this.state.showError) {
        this.setState({
          showError: false
        });
      }
      this.props.getMasterSkillList(value);
    }
  };

  handleSelect = value => {
    if (value.id) {
      const selectedSkillList = this.state.selectedSkillList.slice();
      if (!_.find(selectedSkillList, ['skill_id', value.id]) &&
        !_.find(selectedSkillList, ['id', value.id])) {
        selectedSkillList.push(value);
        this.setState({
          selectedSkillList,
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
  }

  closeFormPopup = () => {
    if (this.props.selectedComponent.formName === 'skillDetail') {
      this.props.clearMasterSkillList();
    }
    this.props.closeFormPopup();
  }

  handleChangeInterestedCategory = category => {
    const { newCategories } = this.state;
    const updatedCategories = newCategories.filter(newCategory => (
      newCategory.id !== category.id
    ));
    this.setState(state => ({
      interestedCategories: [...state.interestedCategories, category],
      newCategories: updatedCategories
    }));
  }

  removeCategoryFormInterestedCategories = categoryId => {
    const { interestedCategories } = this.state;
    const newInterestedCategories = interestedCategories.filter(interestedCategory => (
      interestedCategory.id !== categoryId
    ));
    const newCategory = interestedCategories.filter(interestedCategory => (
      interestedCategory.id === categoryId
    ));
    this.setState(state => ({
      interestedCategories: newInterestedCategories,
      newCategories: [...state.newCategories, newCategory[0]],
      isFormChanged: true
    }));
  }

  renderEditComponent = () => {
    const {
      selectedSkillList
    } = this.state;
    const locale = this.props.locale.profile;
    return (
      <div className="profile-form">
        <ModalBody className="p-0">
          <EditSkillSection
            skillList={selectedSkillList}
            onSortEnd={this.onSortEnd}
            distance={1}
            helperClass="show-draged-element"
            deleteSkill={this.deleteSkill}
          />
        </ModalBody>
        <ModalFooter>
          <button
            className="btn save-btn"
            type="button"
            onClick={() => { this.updateSkill(); }}
          > {locale.skillSection.save}
          </button>
        </ModalFooter>
      </div>
    );
  }

  render() {
    const {
      FormToRender,
      selectedComponent,
      handleSubmit,
      loading,
      options,
      reduxState,
      locale
    } = this.props;
    const {
      uploadProfile,
      currentlyActive,
      isFormChanged,
      selectedSkillList,
      showError,
      interestedCategories,
      newCategories
    } = this.state;
    return (
      <Fragment>
        <Loader loading={loading} />
        <div className="container-fluid p-0">
          <div className="d-flex flex-row heading align-items-center">
            <div className="col-10 col-md-11 title">
              {selectedComponent.isEdit ? 'Edit ' : 'Create '} {ProfileFormInfo[selectedComponent.formName].title}
            </div>
            <div className="col-1">
              <span className="admin">
                <img
                  role="presentation"
                  src={CloseIcon}
                  alt="close"
                  className="icon profile-popup-close-icon c-pointer"
                  onClick={() => { this.closeFormPopup(); }}
                />
              </span>
            </div>
          </div>
          {
            selectedComponent.formName === 'skillDetail' && selectedComponent.isEdit ?
              this.renderEditComponent()
              :
              <form className="profile-form" onSubmit={handleSubmit(this.handleSubmit)}>
                <ModalBody>
                  {
                    selectedComponent.formName === 'personalDetail' &&
                    <div className="mt-4 profile-photo-container">
                      <Dropzone
                        className="dragAndDropArea"
                        onDropAccepted={this.handleDropImage}
                        accept="image/jpeg,image/jpg,image/png,image/svg+xml"
                        multiple={false}
                      >
                        <img
                          className="uploadedImage"
                          src={uploadProfile}
                          alt="UploadImage"
                          onError={event => { event.target.src = ProfilePng; }}
                        />
                      </Dropzone>
                    </div>
                  }
                  <FormToRender
                    yearList={this.yearList}
                    currentlyActive={currentlyActive}
                    changeCurrentStatus={this.changeCurrentStatus}
                    createSkill={this.createSkill}
                    skillList={options}
                    handleChange={this.handleChange}
                    handleSelect={this.handleSelect}
                    locale={locale.profile.profileForm}
                    categories={newCategories}
                    handleChangeIC={this.handleChangeInterestedCategory}
                  />
                  {
                    showError &&
                    <div className="col-12 text-left error-message">
                      {locale.profile.updateSkill.error}
                    </div>
                  }
                  {
                    selectedComponent.formName === 'skillDetail' &&
                    !selectedComponent.isEdit &&
                    <div className="container-fluid mt-3 mb-4 skill-list">
                      <div className="col-12 p-0">
                        <div className="title mb-2 text-left">
                          {locale.profile.updateSkill.skills}
                        </div>
                        <div className="row my-3 mx-1 skill-contents  skills-in-profile">
                          {
                            selectedSkillList && selectedSkillList.length ?
                              <div className="col-11">
                                {
                                  selectedSkillList.map(skill => (
                                    <div
                                      key={skill.id}
                                      className="badge badge-secondary individual-skill mr-3 mb-3"
                                    >
                                      <span className="align-items-center m-2">
                                        <span className="skill-name mr-3">
                                          {skill.name}
                                        </span>
                                        <span>
                                          <img
                                            src={DeleteIcon}
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
                                  {locale.profile.updateSkill.emptySkillError}
                                </span>
                              </Fragment>
                          }
                        </div>
                      </div>
                    </div>
                  }
                  {
                    selectedComponent.formName === 'interestedCategories' &&
                    !selectedComponent.isEdit &&
                      <Fragment>
                        <div className="col-12 input-field title mb-2 text-left">
                          {locale.profile.intrestedCategories.headerTitle.toUpperCase()}
                        </div>
                        <div className="row m-0">
                          <div className="col-12 my-intrested-categories py-3">
                            {interestedCategories.map(interestedCategory => (
                              interestedCategory.id &&
                              <div key={interestedCategory.id} className="badge mr-3 mb-3">
                                <div className="category align-items-center">
                                  <span className="category-name mr-3">
                                    {interestedCategory.name}
                                  </span>
                                  <span>
                                    <img
                                      src={DeleteIcon}
                                      alt="delete"
                                      className="icon c-pointer p-0"
                                      role="presentation"
                                      onClick={() => this.removeCategoryFormInterestedCategories(interestedCategory.id)}
                                    />
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Fragment>
                  }
                </ModalBody>
                <ModalFooter>
                  <div className="container-fluid">
                    <div className="row">
                      {
                        selectedComponent.isEdit &&
                        selectedComponent.formName !== 'personalDetail' &&
                        <div className="col-6">
                          <button
                            className="btn delete-btn"
                            type="button"
                            onClick={() => { this.deleteHistory(); }}
                          >
                            {locale.profile.updateSkill.delete}
                          </button>
                        </div>
                      }
                      <div
                        className={`${(selectedComponent.isEdit && selectedComponent.formName !== 'personalDetail') ?
                          'col-6' : 'col-12'}`}
                      >
                        <button
                          className="btn save-btn float-right"
                          disabled={!isFormChanged && !isDirty('ProfileForm')(reduxState)}
                        >
                          {locale.profile.updateSkill.save}
                        </button>
                      </div>
                    </div>
                  </div>
                </ModalFooter>
              </form>
          }
        </div>
      </Fragment>
    );
  }
}

ProfileForm.propTypes = {
  FormToRender: PropTypes.any.isRequired,
  closeFormPopup: PropTypes.func.isRequired,
  selectedComponent: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  skillDetailAdd: PropTypes.func.isRequired,
  reduxState: PropTypes.objectOf(PropTypes.any).isRequired,
  getMasterSkillList: PropTypes.func.isRequired,
  options: PropTypes.any.isRequired,
  locale: PropTypes.object.isRequired,
  clearMasterSkillList: PropTypes.func.isRequired,
  fetchAllCategories: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)((translatable(locale => locale)(reduxForm({
  form: 'ProfileForm'
})(ProfileForm))));
