import React, { Fragment, PureComponent } from 'react';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import { required } from '../../utils/Validations';
import TextField from '../../components/FormComponents/TextField';
import SelectList from '../../components/FormComponents/Select';
import Button from '../../components/Button/Button';
import '../../../assets/styles/components/ExpertContent.scss';

class ContentTypeModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contentTypes: [
        { value: 'Article', label: 'Article' },
        { value: 'Assessment', label: 'Assessment' }
      ]
    };
  }

  handleSubmit = content => {
    this.props.onSubmit({ ...content, content_type: content.content_type.value });
  }

  render() {
    const { contentTypes } = this.state;
    const { toggle, locale, handleSubmit } = this.props;
    return (
      <Fragment>
        <ModalHeader className="header-section" toggle={toggle}>
          Select Content Type
        </ModalHeader>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <ModalBody>
            <div className="body d-flex flex-column mr-2 ml-2 mb-2">
              <div className="category-section">
                <SelectList
                  isLableRequired
                  htmlFor="Content Type"
                  labelName={locale.contentType}
                  name="content_type"
                  options={contentTypes}
                  placeholder={locale.contentType}
                  validate={[required]}
                  labelKey="label"
                  valueKey="value"
                />
                <TextField
                  name="title"
                  isLableRequired
                  htmlFor="Title"
                  labelName={locale.title}
                  type="text"
                  className="form-control"
                  validate={[required]}
                />
                <TextField
                  name="description"
                  isLableRequired
                  htmlFor="Description"
                  labelName={locale.description}
                  type="textArea"
                  className="form-control input-textArea"
                  validate={[required]}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="footer">
            <Button value={locale.cancel} className="cancel-btn" onClick={toggle} />
            <Button value={locale.create} className="create-btn" type="submit" />
          </ModalFooter>
        </form>
      </Fragment>
    );
  }
}

ContentTypeModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'ContentTypeModal'
})(ContentTypeModal);
