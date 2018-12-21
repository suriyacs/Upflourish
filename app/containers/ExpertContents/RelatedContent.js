import React, { Component } from 'react';
import { translatable } from 'react-multilingual';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import RelatedContentAction from './RelatedContentAction';
import DeleteContent from '../Content/DeleteContent';
import ImageURL from '../../components/Image/ImageURL';
import { getRelatedContentReady, deleteRelatedContent } from '../../actions/content';

import CloseIcon from '../../../assets/images/close.svg';

import '../../../assets/styles/components/ExpertContent.scss';

class RelatedContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openRelatedContentAction: false,
      showDeleteModal: false,
      relatedContentToDelete: ''
    };
  }

  componentDidMount() {
    this.props.getRelatedContentReady(this.props.selectedContent.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedContent.id !== this.props.selectedContent.id) {
      this.props.getRelatedContentReady(this.props.selectedContent.id);
    }
  }

  setRelatedContentId = relatedContentId => {
    this.setState({ relatedContentToDelete: relatedContentId });
    this.openConfirmationModal();
  }

  getUnauthorizeErrorMessage = () => {
    const { locale } = this.props;
    return locale.learningPathDetails.notAuthorized;
  }

  checkOwnerPermission = () => {
    const { selectedContent, userId } = this.props;
    return selectedContent.owner_id === userId;
  }

  toggleRelatedContentActionModal = action => {
    if (this.checkOwnerPermission()) {
      this.setState({ openRelatedContentAction: action });
    } else {
      toast.error(this.getUnauthorizeErrorMessage());
    }
  }

  openConfirmationModal = () => {
    if (this.checkOwnerPermission()) {
      this.setState({ showDeleteModal: true });
    } else {
      toast.error(this.getUnauthorizeErrorMessage());
    }
  }

  closeConfirmationModal = () => {
    this.setState({ showDeleteModal: false, relatedContentToDelete: '' });
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

  deleteRelatedContent = () => {
    const { selectedContent } = this.props;
    const { relatedContentToDelete } = this.state;
    this.props.deleteRelatedContent(selectedContent.id, relatedContentToDelete);
    this.closeConfirmationModal();
  }

  renderRelatedContents = () => {
    const { relatedContent } = this.props.locale;
    const { relatedContents } = this.props;

    if (relatedContents.length === 0) {
      return (
        <li className="no-related-content">{relatedContent.noRelatedContent}</li>
      );
    }
    return relatedContents.map(content => (
      <li key={content.id}>
        <div className="content row align-items-center">
          <div className="col-3">
            <img
              src={ImageURL('Contents', content.id)}
              alt="content"
              className="content-img"
            />
          </div>
          <div className="col-7">
            <span className="content-title">{content.title}</span>
          </div>
          <div className="col-2">
            <i
              className="trash fa fa-trash"
              aria-hidden="true"
              onClick={() => this.setRelatedContentId(content.id)}
            />
          </div>
        </div>
      </li>
    ));
  }

  render() {
    const { relatedContent } = this.props.locale;
    const { openRelatedContentAction, showDeleteModal } = this.state;
    const { selectedContent, relatedContents } = this.props;
    return (
      <div className="row related-contents-container">
        <div className="col-8">
          <div className="title">{relatedContent.relatedContents}</div>
        </div>
        {
          relatedContents.length < 3 &&
          <div className="col-4">
            <button
              className="complete-btn float-right col-md-2 padding-0"
              onClick={() => this.toggleRelatedContentActionModal(true)}
            >
              <i className="fa fa-plus" aria-hidden="true" /> {relatedContent.add}
            </button>
          </div>
        }
        <div className="col-12">
          <ul className="related-contents">
            {this.renderRelatedContents()}
          </ul>
        </div>

        <Modal
          modalClassName="min-h-100 reactstrab-modal full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={openRelatedContentAction}
          onClose={() => this.toggleRelatedContentActionModal(false)}
          centered={openRelatedContentAction}
          external={this.externalCloseButton(this.toggleRelatedContentActionModal)}
        >
          <RelatedContentAction
            closeRelatedContentActionModal={this.toggleRelatedContentActionModal}
            contentId={selectedContent.id}
          />
        </Modal>

        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg opacity-1"
          isOpen={showDeleteModal}
          onClose={this.closeConfirmationModal}
          centered={showDeleteModal}
          external={this.externalCloseButton(this.closeConfirmationModal)}
        >
          <DeleteContent
            deleteSectionContent={this.deleteRelatedContent}
            onCloseDeleteContent={this.closeConfirmationModal}
            locale={relatedContent}
          />
        </Modal>
      </div>
    );
  }
}

RelatedContent.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedContent: PropTypes.object.isRequired,
  relatedContents: PropTypes.array,
  getRelatedContentReady: PropTypes.func.isRequired,
  deleteRelatedContent: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

RelatedContent.defaultProps = {
  relatedContents: []
};

const mapStateToProps = state => ({
  relatedContents: Array.from(state.content.get('relatedContent')),
  userId: state.user.get('userId')
});

const mapDispatchToProps = dispatch => ({
  getRelatedContentReady: contentId => dispatch(getRelatedContentReady(contentId)),
  deleteRelatedContent: (contentId, relatedContentId) => dispatch(deleteRelatedContent(contentId, relatedContentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(RelatedContent));
