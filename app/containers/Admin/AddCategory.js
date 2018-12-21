import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, isDirty } from 'redux-form';
import { connect } from 'react-redux';

import { required } from '../../utils/Validations';
import TextField from '../../components/FormComponents/TextField';
import Button from '../../components/Button/Button';
import { createCategory, updateCategory } from '../../actions/admin';

let isCategoryInitialized = false;
class AddCategory extends Component {
  static getDerivedStateFromProps(nextProps) {
    const { categoryDetails } = nextProps;
    if (categoryDetails && categoryDetails.id && !isCategoryInitialized) {
      nextProps.initialize({
        name: categoryDetails.name,
        description: categoryDetails.description
      });
      isCategoryInitialized = true;
    }
    const { createCategoryRes, updateCategoryRes } = nextProps;
    if (createCategoryRes.id || updateCategoryRes.id) {
      nextProps.onCancel();
    }
    return null;
  }
  componentWillUnmount() {
    isCategoryInitialized = false;
  }
  handleFormSubmit = category => {
    const { categoryDetails } = this.props;
    if (!categoryDetails.id) {
      this.props.createNewCategory(category);
    } else if (categoryDetails.id) {
      category.id = categoryDetails.id;
      this.props.updateMyCategory(category);
    }
  }
  render() {
    const {
      locale,
      categoryDetails,
      handleSubmit,
      reduxState
    } = this.props;
    return (
      <div className="add-category-section">
        <div className="title text-center">
          {!categoryDetails.id &&
            locale.addCategoryTitle
          }
          {categoryDetails.id &&
            locale.editCategoryTitle
          }
        </div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <TextField
            name="name"
            isLableRequired
            htmlFor={locale.categoryName}
            labelName={locale.categoryName}
            type="text"
            validate={[required]}
          />
          <TextField
            name="description"
            isLableRequired
            htmlFor={locale.categoryDesc}
            labelName={locale.categoryDesc}
            type="textArea"
            className="form-control input-textArea"
            validate={[required]}
          />
          {!categoryDetails.id &&
            <Button type="submit" value={locale.createButton} />
          }
          {categoryDetails.id &&
            <div className="row m-0 py-4 justify-content-center">
              <button
                className="col-4 btn btn-edit mr-4"
                type="submit"
                disabled={!isDirty('AddCategoryComponent')(reduxState)}
              >{locale.saveButton}
              </button>
              <button
                className="col-4 btn btn-cancel ml-4"
                onClick={this.props.onCancel}
                type="button"
              >{locale.cancelButton}
              </button>
            </div>
          }
        </form>
      </div>
    );
  }
}

AddCategory.propTypes = {
  categoryDetails: PropTypes.object,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  createNewCategory: PropTypes.func.isRequired,
  updateMyCategory: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  reduxState: PropTypes.objectOf(PropTypes.any).isRequired
};

AddCategory.defaultProps = {
  categoryDetails: ''
};

const mapStateToProps = state => ({
  loading: state.admin.get('loading'),
  createCategoryRes: state.admin.get('createCategory'),
  updateCategoryRes: state.admin.get('updateCategory'),
  reduxState: state
});

const mapDispatchToProps = dispatch => ({
  createNewCategory: category => dispatch(createCategory(category)),
  updateMyCategory: category => dispatch(updateCategory(category))
});

export default (reduxForm({
  form: 'AddCategoryComponent'
})(connect(mapStateToProps, mapDispatchToProps)(AddCategory)));
