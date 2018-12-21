import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { translatable } from 'react-multilingual';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import SelectList from '../../components/FormComponents/MultiSelect';
import Loader from '../../components/Loader/Loader';
import TextField from '../../components/FormComponents/TextField';
import { fetchAllCategories } from '../../actions/learningPath';
import { inviteExpert } from '../../actions/admin';
import { required, email } from '../../utils/Validations';

import '../../../assets/styles/components/HomePage.scss';

import LeftArrow from '../../../assets/images/left-arrow.svg';
import KeyboardArrow from '../../../assets/images/arrow-point-to-right.svg';
import Admin from '../../../assets/images/admin.svg';
import Expert from '../../../assets/images/expert.svg';
import EmptyCircle from '../../../assets/images/empty-circle.svg';
import ActiveCircle from '../../../assets/images/circle-with-check-symbol.svg';

const mapStateToProps = state => ({
  categories: Array.from(state.learningPath.get('categories')),
  inviteResponse: state.admin.get('inviteResponse'),
  loading: state.admin.get('loading')
});

const mapDispatchToProps = dispatch => ({
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  inviteExpert: data => dispatch(inviteExpert(data))
});

class InviteUser extends Component {
  constructor() {
    super();
    this.state = {
      showCategorySection: false,
      isAdminSelected: false,
      isExpertSelected: true,
      showRoleErrorMessage: false
    };
  }

  componentDidMount() {
    this.props.fetchAllCategories();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.inviteResponse, this.props.inviteResponse)) {
      this.props.onPopupClose();
    }
  }

  componentWillUnmount() {
    this.props.initialize({});
  }

  handleSubmit = values => {
    values.email = values.email.toLowerCase().trim();
    values.role = this.state.isAdminSelected ? 'ADMIN' : 'EXPERT';
    this.props.inviteExpert(values);
  }

  toggleInviteUserSection = () => {
    if (this.state.isAdminSelected || this.state.isExpertSelected) {
      this.setState(({ showCategorySection }) => ({
        showCategorySection: !showCategorySection
      }));
    } else {
      this.setState({ showRoleErrorMessage: true });
    }
  }

  selectRole = selectedRole => {
    if (selectedRole === 'admin') {
      this.setState(({ isAdminSelected }) => ({
        isAdminSelected: !isAdminSelected,
        showRoleErrorMessage: false,
        isExpertSelected: false
      }));
    } else {
      this.setState(({ isExpertSelected }) => ({
        isExpertSelected: !isExpertSelected,
        showRoleErrorMessage: false,
        isAdminSelected: false
      }));
    }
  }

  render() {
    const {
      showCategorySection,
      isAdminSelected,
      isExpertSelected,
      showRoleErrorMessage
    } = this.state;
    const {
      handleSubmit,
      locale,
      categories,
      loading
    } = this.props;
    return (
      <div className="invite-user">
        <ModalHeader className="header-section">
          <div className="container-fluid mr-2 ml-2">
            <div className="row">
              <div className="col-7 d-flex flex-row justify-content-between p-0">
                <div className="flex-column">
                  { showCategorySection &&
                    <span
                      className="c-pointer"
                      onClick={this.toggleInviteUserSection}
                      role="presentation"
                    >
                      <img className="icon left-arrow" src={LeftArrow} alt="edit" />
                    </span>
                  }
                </div>
                <div className="flex-column">
                  <span className="title">
                    {locale.inviteUser.title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ModalHeader>
        {
          !showCategorySection &&
          <form className="multi-select-form" onSubmit={handleSubmit(this.toggleInviteUserSection)}>
            <ModalBody>
              <div className="body d-flex flex-column mr-2 ml-2">
                <div className="category-section">
                  <p className="body-text">
                    {locale.inviteUser.emailDesc}
                  </p>
                  <div className="row">
                    <div className="col">
                      <TextField
                        name="firstName"
                        htmlFor="First Name"
                        labelName={locale.inviteUser.firstName}
                        isLableRequired
                        type="text"
                        className="form-control"
                        placeholder={locale.inviteUser.firstName}
                        validate={[required]}
                      />
                    </div>
                    <div className="col">
                      <TextField
                        name="lastName"
                        htmlFor="Last Name"
                        labelName={locale.inviteUser.lastName}
                        isLableRequired
                        type="text"
                        className="form-control"
                        placeholder={locale.inviteUser.lastName}
                        validate={[required]}
                      />
                    </div>
                  </div>
                  <TextField
                    name="email"
                    htmlFor="Email"
                    labelName={locale.inviteUser.emailLabel}
                    isLableRequired
                    type="text"
                    className="form-control"
                    placeholder={locale.inviteUser.emailPlaceholder}
                    validate={[required, email]}
                  />
                  <div className="select-role">
                    <div className="input-field">
                      <label htmlFor="Select a role">{locale.inviteUser.selectARole}</label>
                      <span className="required-field">*</span>
                    </div>
                    <div className="row">
                      <div
                        className={`col check-box-section p-0 c-pointer ${isAdminSelected ? 'active' : ''}`}
                        onClick={() => { this.selectRole('admin'); }}
                        role="presentation"
                      >
                        <div className="row m-3">
                          <div className="col-2 p-0">
                            {
                              isAdminSelected &&
                              <span className="admin">
                                <img src={ActiveCircle} alt="profile" className="icon" />
                              </span>
                            }
                            {
                              !isAdminSelected &&
                              <span className="admin">
                                <img src={EmptyCircle} alt="profile" className="icon" />
                              </span>
                            }
                          </div>
                          <div className="col-8 p-0">
                            <span className="mb-3">
                              <img src={Admin} alt="profile" className="image" />
                            </span>
                          </div>
                        </div>
                        <div className="heading mb-3">
                          {locale.inviteUser.administrator}
                        </div>
                        <div className="body-text role-body-text">
                          {locale.inviteUser.adminDesc}
                        </div>
                      </div>
                      <div
                        className={`col check-box-section p-0 c-pointer ${isExpertSelected ? 'active' : ''}`}
                        onClick={() => { this.selectRole(); }}
                        role="presentation"
                      >
                        <div className="row m-3">
                          <div className="col-2 p-0">
                            {
                              isExpertSelected &&
                              <span className="admin">
                                <img src={ActiveCircle} alt="profile" className="icon" />
                              </span>
                            }
                            {
                              !isExpertSelected &&
                              <span className="admin">
                                <img src={EmptyCircle} alt="profile" className="icon" />
                              </span>
                            }
                          </div>
                          <div className="col-8 p-0">
                            <span className="mb-3">
                              <img src={Expert} alt="profile" className="image" />
                            </span>
                          </div>
                        </div>
                        <div className="heading mb-3">
                          {locale.inviteUser.expert}
                        </div>
                        <div className="body-text role-body-text">
                          {locale.inviteUser.expertDesc}
                        </div>
                      </div>
                    </div>
                  </div>
                  {
                    showRoleErrorMessage &&
                    <div className="error-message">
                      {locale.inviteUser.roleErrorMessage}
                    </div>
                  }
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="footer">
              <button
                className="btn c-pointer footer-button justify-content-center mr-2 ml-2"
                type="submit"
              >
                <span className="footer-text">
                  {locale.inviteUser.continue}
                </span>
                <span className="keyboard-right-arrow">
                  <img className="icon pencil-icon" src={KeyboardArrow} alt="edit" />
                </span>
              </button>
            </ModalFooter>
          </form>
        }
        {
          showCategorySection &&
          <form className="multi-select-form" onSubmit={handleSubmit(this.handleSubmit)}>
            <Loader loading={loading} />
            <ModalBody>
              <div className="body d-flex flex-column mr-2 ml-2 mb-2">
                <div className="category-section">
                  <p className="body-text mb-4">
                    {locale.inviteUser.categoryDesc}
                  </p>
                  <SelectList
                    htmlFor="Category"
                    name="categories"
                    labelName={locale.inviteUser.category}
                    options={categories}
                    isLableRequired
                    placeholder={locale.inviteUser.searchCategoryPlaceholder}
                    labelKey="name"
                    valueKey="id"
                    isMultiSelect
                    validate={[required]}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="footer">
              <button className="btn c-pointer footer-button justify-content-center mr-2 ml-2" type="submit">
                <span className="footer-text">
                  {locale.inviteUser.inviteUserButton}
                </span>
                <span className="keyboard-right-arrow">
                  <img className="icon pencil-icon" src={KeyboardArrow} alt="edit" />
                </span>
              </button>
            </ModalFooter>
          </form>
        }
      </div>
    );
  }
}

InviteUser.propTypes = {
  onPopupClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  inviteExpert: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  inviteResponse: PropTypes.object.isRequired
};

const InviteExpert = connect(mapStateToProps, mapDispatchToProps)(InviteUser);

export default translatable(locale => locale)(reduxForm({
  form: 'inviteUser',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(InviteExpert));
