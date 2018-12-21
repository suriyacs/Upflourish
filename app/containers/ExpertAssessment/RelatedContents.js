import React, { Component, Fragment } from 'react';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

class RelatedContents extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedContentId &&
      nextProps.selectedContentId !== prevState.selectedContentId) {
      return {
        selectedContentId: nextProps.selectedContentId
      };
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedContentId: null
    };
  }

  handleSelect = content => {
    this.setState({ selectedContentId: content.id });
  }

  addContent = () => {
    const { selectedContentId } = this.state;
    this.props.handleContentSelect(selectedContentId);
  }

  render() {
    const {
      closeRelatedContent,
      locale,
      contentList
    } = this.props;
    const { selectedContentId } = this.state;
    return (
      <Fragment>
        <ModalHeader
          toggle={closeRelatedContent}
          className="custom-header"
        >
          {locale.linkRelatedContent}
        </ModalHeader>
        <ModalBody className="content-modal-bg">
          <ul className="related-contents">
            {
              contentList.map(content => {
                if (content.content_type === 'Assessment') {
                  return null;
                }
                return (
                  <li
                    key={content.id}
                    className={`content ${selectedContentId === content.id ? 'selected-content' : ''}`}
                    role="presentation"
                    onClick={() => this.handleSelect(content)}
                  >
                    {
                      selectedContentId === content.id ?
                        <i className="fa fa-check-circle" aria-hidden="true" /> :
                        <i className="fa fa-circle-thin" aria-hidden="true" />
                    }
                    {content.title}
                  </li>
                );
              })
            }
          </ul>
        </ModalBody>
        <ModalFooter>
          <button
            className="edit-btn"
            onClick={this.props.closeRelatedContent}
          >
            {locale.cancel}
          </button>
          <button
            className={`save-content ${!selectedContentId ? 'disabled' : ''}`}
            disabled={!selectedContentId}
            onClick={this.addContent}
          >
            {locale.relatedContent}
          </button>
        </ModalFooter>
      </Fragment>
    );
  }
}

RelatedContents.propTypes = {
  closeRelatedContent: PropTypes.func.isRequired,
  contentList: PropTypes.array.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  handleContentSelect: PropTypes.func.isRequired
};

export default RelatedContents;
