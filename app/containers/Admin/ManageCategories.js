import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';

import { fetchAllCategories } from '../../actions/learningPath';
import AddCategory from './AddCategory';
import { clearCreateAndUpdatedCategory } from '../../actions/admin';
import '../../../assets/styles/components/Profile.scss';
import Button from '../../components/Button/Button';

import CloseIcon from '../../../assets/images/close.svg';

class ManageCategories extends Component {
  constructor() {
    super();
    this.state = {
      isAddCategory: false,
      editCategoryDetails: {}
    };
  }

  componentDidMount() {
    this.props.fetchAllCategories();
  }

  onClickAddCategory = () => {
    this.setState({
      isAddCategory: true,
      editCategoryDetails: {}
    });
  }

  onClickEditCategory = editCategoryDetails => {
    this.setState({
      isAddCategory: true,
      editCategoryDetails
    });
  }

  onCloseAddCategory = () => {
    this.setState({
      isAddCategory: false
    });
    this.props.fetchAllCategories();
    this.props.clearCreateAndUpdatedCategory();
  }

  externalCloseButton = functionName => (
    <div className="common-close-icon">
      <img
        role="presentation"
        src={CloseIcon}
        alt="close"
        className="icon close-icon c-pointer"
        onClick={functionName}
      />
    </div>
  );

  render() {
    const { isAddCategory, editCategoryDetails } = this.state;
    const { locale, categories } = this.props;
    return (
      <div className="admin-categories-container h-100 px-5 py-4">
        <div className="add-category pb-4">
          <div className="category-header">
            {locale.manageCategory}
          </div>
          <Button className="m-0 col-2" onClick={this.onClickAddCategory} value={locale.addCategory} />
        </div>
        <div className="row m-0 py-2 title-section">
          <div className="col-4">
            {locale.name}
          </div>
          <div className="col-5">
            {locale.description}
          </div>
          <div className="col-3 text-center">
            {locale.action}
          </div>
        </div>
        <div className="category-scroll">
          {categories.map(category => (
            <div className="row m-0 py-2 data-section one-row-ellipsis" key={category.id}>
              <div className="col-4">
                {category.name}
              </div>
              <div className="col-5 one-row-ellipsis" title={category.description}>
                {category.description}
              </div>
              <div className="col-3 action-btn text-center">
                <i
                  className="fa fa-edit edit c-pointer"
                  onClick={() => this.onClickEditCategory(category)}
                  role="presentation"
                />
              </div>
            </div>
          ))}
        </div>
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg d-flex overlay-opacity"
          isOpen={isAddCategory}
          onClose={this.onCloseAddCategory}
          centered={isAddCategory}
          toggle={this.onCloseAddCategory}
          external={this.externalCloseButton(this.onCloseAddCategory)}
        >
          <AddCategory
            locale={locale}
            categoryDetails={editCategoryDetails}
            onCancel={this.onCloseAddCategory}
          />
        </Modal>
      </div>
    );
  }
}

ManageCategories.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  categories: PropTypes.array.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  clearCreateAndUpdatedCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userDetails: state.user.get('userDetails'),
  categories: Array.from(state.learningPath.get('categories'))
});

const mapDispatchToProps = dispatch => ({
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  clearCreateAndUpdatedCategory: () => dispatch(clearCreateAndUpdatedCategory())
});

const ManageCategoriesComponent = connect(mapStateToProps, mapDispatchToProps)(ManageCategories);

export default reduxForm({
  form: 'ManageCategoriesComponent'
})(ManageCategoriesComponent);
