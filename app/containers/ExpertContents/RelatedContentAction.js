import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { translatable } from 'react-multilingual';

import NewContent from '../Content/NewContent';

import '../../../assets/styles/components/HomePage.scss';

import CreateIcon from '../../../assets/images/add_gray.svg';
import SearchIcon from '../../../assets/images/search.svg';
import CloseIcon from '../../../assets/images/close.svg';

class RelatedContentAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateModal: false
    };
  }

  toggleCreateModal = action => {
    this.setState({ showCreateModal: action });
  }

  closeContentModal = () => {
    this.toggleCreateModal(false);
    this.props.closeRelatedContentActionModal(false);
  }

  externalCloseButton = functionName => (
    <div className="common-close-icon">
      <img
        role="presentation"
        src={CloseIcon}
        alt="close"
        className="icon close-icon c-pointer"
        onClick={() => functionName(false)}
      />
    </div>
  );

  render() {
    const { relatedContent } = this.props.locale;
    const { showCreateModal } = this.state;
    const { contentId } = this.props;
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-8 col-sm-10 col-md-10 col-lg-10 home">
              <div className="home-title">
                {relatedContent.createModalTitle}
              </div>
              <div className="col-12">
                <div
                  role="presentation"
                  className="col-3 home-container"
                  onClick={() => this.toggleCreateModal(true)}
                >
                  <div className="content-border">
                    <img src={CreateIcon} alt="Create" />
                  </div>
                  <span>{relatedContent.createTitle}</span>
                  <div className="content-desc">
                    {relatedContent.createDescription}
                  </div>
                </div>
                <div
                  role="presentation"
                  className="col-3 home-container"
                >
                  <div className="content-border">
                    <img src={SearchIcon} alt="Search" />
                  </div>
                  <span>{relatedContent.searchTitle}</span>
                  <div className="content-desc">
                    {relatedContent.searchDescription}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          modalClassName="min-h-100 reactstrab-modal full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={showCreateModal}
          onClose={() => this.closeCreateModal(false)}
          centered={showCreateModal}
          external={this.externalCloseButton(this.toggleCreateModal)}
        >
          <NewContent
            closeContentModal={this.closeContentModal}
            isRelatedContent
            contentId={contentId}
          />
        </Modal>
      </Fragment>
    );
  }
}

RelatedContentAction.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  closeRelatedContentActionModal: PropTypes.func.isRequired,
  contentId: PropTypes.string.isRequired
};

export default translatable(locale => locale)(RelatedContentAction);
