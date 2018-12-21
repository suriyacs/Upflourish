import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import { translatable } from 'react-multilingual';

import LearningPath from './LearningPathForm';
import SortableSectionList from './SortableSectionList';
import SectionForm from '../ExpertSection/SectionForm';
import {
  fetchLearningPathDetails,
  fetchLearningPathSections,
  updateSectionOrder
} from '../../actions/learningPath';
import SearchBar from '../../components/SearchBar/SearchBar';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import storage from '../../globals/localStorage';
import DeleteSection from '../ExpertSection/DeleteSection';

import '../../../assets/styles/components/LearningPath.scss';

import EditIcon from '../../../assets/images/edit.svg';
import PaperPlane from '../../../assets/images/paper-plane.svg';
import AddWhite from '../../../assets/images/add_white.svg';
import AddGray from '../../../assets/images/add_gray.svg';

class LearningPathDetails extends Component {
  constructor() {
    super();
    this.state = {
      isCourseTabOpen: true,
      isContentTabOpen: false,
      isCreateSectionOpen: false,
      isDeleteSection: false,
      sectionId: '',
      isOnsearch: false,
      isEditLearningPath: false
    };
    this.closeOnEsc = true;
    this.expandableLimit = 270;
  }

  componentDidMount() {
    this.props.fetchLearningPathDetails(this.props.match.params.pathId);
    this.props.fetchLearningPathSections(this.props.match.params.pathId, '');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.learningPathDetails.id !== this.props.learningPathDetails.id) {
      storage.setItem('breadCrumb', JSON.stringify({ learningpathName: this.props.learningPathDetails.new_name }));
    }
  }

  onClickCourseStructure = () => {
    this.setState({
      isContentTabOpen: false,
      isCourseTabOpen: true
    });
  }

  onClickContentAnalysis = () => {
    this.setState({
      isCourseTabOpen: false,
      isContentTabOpen: true,
      isCreateSectionOpen: false
    });
  }

  onClickCreateNewSection = () => {
    this.setState({ isCreateSectionOpen: true });
  }

  onCloseCreateNewSection = () => {
    this.setState({ isCreateSectionOpen: false, sectionId: '' });
  }

  onClickDeletedSection = sectionIdToDelete => {
    this.setState({
      isDeleteSection: true,
      sectionId: sectionIdToDelete
    });
  }

  onClickEditSection = sectionIdToEdit => {
    this.setState({
      sectionId: sectionIdToEdit,
      isCreateSectionOpen: true
    });
  }

  onClickViewSection = sectionIdToView => {
    this.setState({
      sectionId: sectionIdToView
    });
    this.props.history.push(`/learningPath/${this.props.match.params.pathId}/section/${sectionIdToView}`);
  }

  onCloseDeleteSection = () => {
    this.setState({ isDeleteSection: false });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const sectionOrder = {};
    const newSections = arrayMove(this.props.learningPathSections, oldIndex, newIndex);
    newSections.forEach((section, index) => {
      if (newIndex > oldIndex && oldIndex <= index && newIndex >= index) {
        section.order = index + 1;
        sectionOrder[section.id] = section.order;
      } else if (oldIndex > newIndex && newIndex <= index && oldIndex >= index) {
        section.order = index + 1;
        sectionOrder[section.id] = section.order;
      }
    });
    if (oldIndex !== newIndex) {
      this.props.updateSectionOrder(this.props.match.params.pathId, sectionOrder);
    }
  }

  getSectionsAfterCreateOrDeleteSection = () => {
    this.props.fetchLearningPathSections(this.props.match.params.pathId, '');
  }

  editLearningPath = () => {
    this.setState(({ isEditLearningPath }) => ({
      isEditLearningPath: !isEditLearningPath
    }));
  }

  afterEditLearningPath = () => {
    this.setState({ isEditLearningPath: false });
  }

  searchSections = value => {
    if (value) {
      this.setState({ isOnsearch: true });
    } else {
      this.setState({ isOnsearch: false });
    }
    this.props.fetchLearningPathSections(this.props.match.params.pathId, value);
  }

  publishAllChanges = () => {
    if (this.props.unpublishedCount > 0) {
      // this.props.publishChanges(this.props.match.params.pathId);
    }
  }

  closeOnEscape = () => {
    this.closeOnEsc = !this.closeOnEsc;
  }

  render() {
    const {
      isContentTabOpen,
      isCourseTabOpen,
      isCreateSectionOpen,
      isDeleteSection,
      sectionId,
      isOnsearch,
      isEditLearningPath
    } = this.state;
    const { learningPathDetails, learningPathSections, unpublishedCount } = this.props;
    const learningPathId = this.props.match.params.pathId;
    const locale = this.props.locale.learningPathDetails;
    return (
      <div className="container-fluid">
        <div className="row learning-path-details-head">
          <div className="col-12 col-md-7 col-lg-9">
            <BreadCrumb learningPathName={learningPathDetails.new_name} />
            <div className="path-detail-title">{learningPathDetails.new_name}</div>
            <div id="expandableContent" className="learning-path-detail-expandable">
              <p id="detail" className="collapse col-lg-12 padding-0 path-detail" aria-expanded="false">
                {learningPathDetails.new_description}
              </p>
              {learningPathDetails && learningPathDetails.new_description
                && learningPathDetails.new_description.length > this.expandableLimit &&
                <span className="expand collapsed" data-toggle="collapse" href="#detail" aria-expanded="false" />
              }
            </div>
          </div>
          <div className="col-10 offset-1 col-sm-6 offset-sm-3 col-md-5 offset-md-0 col-lg-3 publish">
            <button
              className="btn edit-learning-path-btn"
              onClick={this.editLearningPath}
            >
              <img className="icon" src={EditIcon} alt="edit" />{locale.editButton}
            </button>
            <button className="btn publish-btn" onClick={this.publishAllChanges}>
              <img src={PaperPlane} alt="Publish" className="icon" />
              {locale.publishButton}
            </button>
            <span className="unpublished">{unpublishedCount} {locale.unpublishCount}</span>
          </div>
        </div>
        <div className="row course-structure" hidden={!isCourseTabOpen}>
          <div className="col-12 col-md-7 col-lg-6 p-10 count-and-search">
            <span className="learning-path-count">
              <b>{locale.sectionTitle} </b>
              <span className="text-nowrap">
                ({learningPathSections.length ? learningPathSections.length : 0} {locale.sectionCount})
              </span>
            </span>
            <div className="splitter" />
            <div className="d-inline-block learningpath-search">
              <SearchBar onChange={this.searchSections} />
            </div>
          </div>
          <div className="col-10 offset-1 col-sm-6 sm-offset-0 col-md-4 col-lg-3 offset-lg-3 offset-md-1 offset-sm-3">
            <button
              className="btn add-new-section-btn"
              onClick={this.onClickCreateNewSection}
            >
              <img src={AddWhite} alt="Add" className="icon" />
              {locale.addNewButton}
            </button>
          </div>
          <div className="col-12">
            <SortableSectionList
              axis="xy"
              distance={1}
              sections={learningPathSections}
              onSortEnd={option => this.onSortEnd(option)}
              onClickDeletedSection={this.onClickDeletedSection}
              onClickEditSection={this.onClickEditSection}
              onClickViewSection={this.onClickViewSection}
              useDragHandle={(learningPathSections.length && learningPathSections.length === 1) ? true : isOnsearch}
              locale={locale}
            />
            {(learningPathSections && learningPathSections.length <= 0) &&
              <div className="no-learning-path"> {locale.noData}</div>
            }
          </div>
          <div className="col-12">
            <div className="row p-20">
              <div
                className="col-12 add-new-section-div"
                onClick={this.onClickCreateNewSection}
                role="presentation"
              >
                <img src={AddGray} alt="Add" className="icon" />{locale.addNewSection}
              </div>
            </div>
          </div>
        </div>
        <div className="row content-analysis" hidden={!isContentTabOpen} />
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg d-flex overlay-opacity"
          isOpen={isCreateSectionOpen}
          onClose={this.onCloseCreateNewSection}
          centered={isCreateSectionOpen}
          toggle={this.onCloseCreateNewSection}
        >
          { isCreateSectionOpen &&
            <SectionForm
              onClose={this.onCloseCreateNewSection}
              learningPathId={learningPathId}
              showSections={this.getSectionsAfterCreateOrDeleteSection}
              sectionId={sectionId}
            />
          }
        </Modal>
        <Modal open={isDeleteSection} onClose={this.onCloseDeleteSection}>
          <DeleteSection
            onCloseDeleteSection={this.onCloseDeleteSection}
            sectionId={sectionId}
            learningPathId={learningPathId}
            onDeleteSection={this.getSectionsAfterCreateOrDeleteSection}
            locale={locale}
          />
        </Modal>
        <Modal
          open={isEditLearningPath}
          onClose={this.afterEditLearningPath}
          closeOnEsc={this.closeOnEsc}
        >
          <LearningPath
            onClose={this.afterEditLearningPath}
            learningPathId={learningPathId}
            closeOnEscape={this.closeOnEscape}
          />
        </Modal>
      </div>
    );
  }
}

LearningPathDetails.propTypes = {
  match: PropTypes.object.isRequired,
  fetchLearningPathDetails: PropTypes.func.isRequired,
  fetchLearningPathSections: PropTypes.func.isRequired,
  learningPathDetails: PropTypes.object.isRequired,
  learningPathSections: PropTypes.array.isRequired,
  unpublishedCount: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  updateSectionOrder: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  loading: state.learningPath.get('loading'),
  learningPathDetails: state.learningPath.get('learningPathDetails'),
  learningPathSections: Array.from(state.learningPath.get('learningPathSections')),
  unpublishedCount: state.learningPath.get('unpublishedCount')
});

const mapDispatchToProps = dispatch => ({
  fetchLearningPathDetails: learningPathId => dispatch(fetchLearningPathDetails(learningPathId)),
  fetchLearningPathSections: (learningPathId, searchTerm) =>
    dispatch(fetchLearningPathSections(learningPathId, searchTerm)),
  updateSectionOrder: (learningPathId, sectionOrder) => dispatch(updateSectionOrder(learningPathId, sectionOrder))
});

export default connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(LearningPathDetails));
