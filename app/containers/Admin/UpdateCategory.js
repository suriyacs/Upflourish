import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import SelectList from '../../components/FormComponents/MultiSelect';
import Loader from '../../components/Loader/Loader';
import { fetchAllCategories } from '../../actions/learningPath';
import { updateUserCategory } from '../../actions/admin';
import { required } from '../../utils/Validations';

import '../../../assets/styles/components/HomePage.scss';

import KeyboardArrow from '../../../assets/images/arrow-point-to-right.svg';

class UpdateCategory extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { initialize, userCategories } = nextProps;
    if (userCategories.length > 0 && !prevState.initialized) {
      initialize({ categories: userCategories });
      return {
        initialized: true
      };
    }
    return null;
  }
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line
      initialized: false
    };
  }

  componentDidMount() {
    this.props.fetchAllCategories();
  }

  componentWillUnmount() {
    this.props.initialize({});
    this.props.getUserCategory();
  }

  handleSubmit = values => {
    const { userId, activeGrid } = this.props;
    const data = {
      userId,
      values,
      activeGrid
    };
    this.props.updateUserCategory(data);
    this.props.onPopupClose();
  }

  render() {
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
                <div className="flex-column" />
                <div className="flex-column">
                  <span className="title">
                    {
                      locale.inviteUser.editCategories
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ModalHeader>
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
                  isLableRequired
                  labelName={locale.inviteUser.category}
                  options={categories}
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
                {locale.inviteUser.updateCategoriesButton}
              </span>
              <span className="keyboard-right-arrow">
                <img className="icon pencil-icon" src={KeyboardArrow} alt="edit" />
              </span>
            </button>
          </ModalFooter>
        </form>
      </div>
    );
  }
}

UpdateCategory.propTypes = {
  onPopupClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  categories: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
  updateUserCategory: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  getUserCategory: PropTypes.func.isRequired,
  activeGrid: PropTypes.string.isRequired,
  fetchAllCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  categories: Array.from(state.learningPath.get('categories')),
  inviteResponse: state.admin.get('inviteResponse'),
  userCategoryUpdatedResponse: state.admin.get('userCategoryUpdatedResponse'),
  loading: state.admin.get('loading')
});

const mapDispatchToProps = dispatch => ({
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  updateUserCategory: data => dispatch(updateUserCategory(data))
});

const UpdateUserCategory = connect(mapStateToProps, mapDispatchToProps)(UpdateCategory);

export default translatable(locale => locale)(reduxForm({
  form: 'updateCategory',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(UpdateUserCategory));
