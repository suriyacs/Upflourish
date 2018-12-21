import React from 'react';
import PropTypes from 'prop-types';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import '../../../assets/styles/components/SectionContent.scss';
import ReorderIcon from '../../../assets/images/reorder-option.svg';
import DeleteIcon from '../../../assets/images/delete-content.svg';
import CloseIcon from '../../../assets/images/cancel.svg';
import EditIcon from '../../../assets/images/white-edit.svg';

const SortableItem = SortableElement(({
  content,
  onClickContent,
  iconMap,
  selectedContentId,
  setSideContentVisible
}) => (
  <div
    key={content.id}
    className="content-item"
  >
    <button
      id="content-btn"
      className={`d-flex align-items-center ${selectedContentId === content.id ? 'active-content' : ''}`}
    >
      <div
        className="col-8 p-0"
        role="presentation"
        onClick={() => {
          onClickContent(content.id);
          setSideContentVisible(false);
        }}
      >
        <div className="d-flex align-items-center">
          <img
            src={iconMap[content.content_type]}
            className="content-icon d-flex flex-column col-3 align-items-center"
            alt="content-img"
            id="content-img"
          />
          <div
            className="two-row-ellipsis m-0 content-text col-9 text-left"
            id="content-title"
          >
            {content.title}
          </div>
        </div>
      </div>
      <img
        src={DeleteIcon}
        className="content-icon d-flex flex-column col-2"
        alt="delete-icon"
        id="delete-icon"
        onClick={() => onClickContent(content.id, true)}
        role="presentation"
        title="Remove"
      />
      <img
        src={ReorderIcon}
        className="content-icon d-flex flex-column col-2 drag-icon"
        alt="drag-icon"
        id="drag-icon"
      />
    </button>
  </div>
));

const SortContaniner = SortableContainer(({
  onSelectContent,
  contentList,
  iconMap,
  selectedContentId,
  setSideContentVisible
}) => (
  <div
    className="sortable-container"
  >
    <div className="content-list-expert">
      {contentList.map((content, index) => (
        <SortableItem
          key={`content-${content.title}-${content.content_type}`}
          content={content}
          index={index}
          order={index}
          onClickContent={onSelectContent}
          iconMap={iconMap}
          selectedContentId={selectedContentId}
          setSideContentVisible={setSideContentVisible}
        />
      ))}
    </div>
  </div>
));

SortContaniner.propTypes = {
  onSelectContent: PropTypes.func.isRequired
};

const ContentNavigation = props => (
  <div className={props.showSideContent ? 'sidebar' : 'sidebar close-sidebar'} >
    <div className="content-sidebar-section expert-sidebar p-0">
      <div
        className="back-section-expert"
        role="presentation"
        onClick={props.goBack}
      >
        <i className="fa fa-angle-left left-angle" />
        <span className="back-to">Back</span>
      </div>
      <div className="title-container col-12 d-flex">
        <div className="row title-row align-items-center">
          <div
            className={`two-row-ellipsis m-0 content-text text-left section-title ${props.showEditIcon ?
              'col-10' : 'col-11'}`}
          >
            {props.courseDetails.name}
          </div>
          {
            props.showEditIcon &&
            <div className="col-1 pl-0">
              <img
                src={EditIcon}
                className="icon white-pencil c-pointer float-right"
                alt="edit"
                role="presentation"
                onClick={() => { props.editMicrolearning(); }}
              />
            </div>
          }
          <i className="fa fa-plus add mt-0 c-pointer" role="presentation" onClick={props.addContentType} />
        </div>
      </div>
      {!props.isMicroLearning &&
        <div className="px-3">
          <button
            className="btn publish-section-btn"
            onClick={() => props.onClickPublish(props.courseDetails.is_published)}
            disabled={props.iPublishedCalled || props.courseDetails.is_published}
          >
            {props.locale.publishButton}
          </button>
        </div>
      }
      <SortContaniner
        contentList={props.contentList}
        onSelectContent={props.onSelectContent}
        selectedContentId={props.selectedContentId}
        iconMap={props.iconMap}
        shouldCancelStart={props.shouldCancelStart}
        onSortEnd={props.onSortEnd}
        setSideContentVisible={props.setSideContentVisible}
      />
    </div>
    <div className="sidebar-sidecontent">
      <span className="close-sidebar">
        <img
          src={CloseIcon}
          role="presentation"
          alt="close"
          title="Close SideBar"
          onClick={() => props.setSideContentVisible(false)}
        />
      </span>
    </div>
  </div>
);

ContentNavigation.propTypes = {
  goBack: PropTypes.func.isRequired,
  addContentType: PropTypes.func.isRequired,
  onSelectContent: PropTypes.func.isRequired,
  contentList: PropTypes.array,
  selectedContentId: PropTypes.string.isRequired,
  iconMap: PropTypes.object.isRequired,
  shouldCancelStart: PropTypes.func.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  courseDetails: PropTypes.object.isRequired,
  setSideContentVisible: PropTypes.func.isRequired,
  showSideContent: PropTypes.bool.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  onClickPublish: PropTypes.func.isRequired,
  isMicroLearning: PropTypes.string,
  iPublishedCalled: PropTypes.bool,
  showEditIcon: PropTypes.bool,
  editMicrolearning: PropTypes.func
};

ContentNavigation.defaultProps = {
  contentList: [],
  isMicroLearning: '',
  iPublishedCalled: false,
  showEditIcon: false,
  editMicrolearning: null
};

export default ContentNavigation;
