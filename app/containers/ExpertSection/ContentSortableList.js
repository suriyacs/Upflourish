import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import ImageURL from '../../components/Image/ImageURL';
import { getYTVideoId } from '../../utils/Common';

import '../../../assets/styles/components/LearningPath.scss';
import '../../../assets/styles/components/Section.scss';

import NoImage from '../../../assets/images/no-image.svg';
import EditIcon from '../../../assets/images/edit.svg';
import DeleteIcon from '../../../assets/images/delete.svg';
import AssessmentIcon from '../../../assets/images/assessment.png';

const SortableItem = SortableElement(({
  value,
  onClickDeletedSectionContent,
  onClickEditSectionContent,
  onClickViewSectionContent,
  locale,
  forwardButtonLabel
}) => {
  let thumbnailImgUrl;
  if (value.item_type === 'YTVideo' && value.new_link.includes('www.youtube.com')) {
    thumbnailImgUrl = `https://img.youtube.com/vi/${getYTVideoId(value.new_link)}/mqdefault.jpg`;
  }
  return (
    <div className="row m-25 m-r-0" id={value.id}>
      <div className="col-12 col-sm-1 constent-order-div">
        {/* <div className={length === value.order ? 'section-order-line1' : 'section-order-line'} /> */}
        <div className="section-order">{value.new_order}</div>
      </div>
      <div className="col-12 col-sm-2 content-detail-image">
        {thumbnailImgUrl ? (
          <img src={thumbnailImgUrl} alt="Content" />
        ) : (
          <img
            src={value.item_type === 'Assessment' ? AssessmentIcon : ImageURL(`${value.item_type}s`, value.item_id)}
            alt="Content"
            onError={event => { event.target.src = NoImage; }}
          />
        )}
      </div>
      <div id="outer-box" className="col-12 col-sm-6 col-sm-9 content-detail">
        <div className="one-row-ellipsis p-10">{value && value.new_title}</div>
        <div className="col-12 content-detail-content three-row-ellipsis">
          {value.new_description}
        </div>
        <div id="inner-box" className="col-12 py-2 px-5 py-sm-4 py-md-5 editView-section">
          <div className="row">
            <button
              className="btn col-5 col-sm-4 col-md-3"
              onClick={() => onClickEditSectionContent(value.item_id, value.item_type)}
            >
              <img className="icon" src={EditIcon} alt="edit" />{locale.edit}
            </button>
            <button
              className="btn col-5 col-sm-4 col-md-3"
              onClick={() => onClickDeletedSectionContent(value.id)}
            >
              <img className="icon" src={DeleteIcon} alt="delete" />{locale.delete}
            </button>
            <button
              className="btn col-5 col-sm-4 col-md-3"
              onClick={
                (value.item_type === 'Article' || value.item_type === 'Book') ?
                  () => onClickViewSectionContent(value.item_id, value.item_type, value.new_link) :
                  () => onClickViewSectionContent(value.item_id, value.item_type)
              }
            >
              {forwardButtonLabel[value.item_type]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

const setItemsInContent = (
  contents,
  onClickDeletedSectionContent,
  onClickEditSectionContent,
  onClickViewSectionContent,
  locale,
  forwardButtonLabel
) => contents.map((value, index) => (
  <SortableItem
    key={value.id}
    index={index}
    distance={1}
    value={value}
    onClickDeletedSectionContent={onClickDeletedSectionContent}
    onClickEditSectionContent={onClickEditSectionContent}
    onClickViewSectionContent={onClickViewSectionContent}
    length={contents.length}
    locale={locale}
    forwardButtonLabel={forwardButtonLabel}
  />
));

const ContentSortableList = SortableContainer(({
  contents,
  onClickDeletedSectionContent,
  onClickEditSectionContent,
  onClickViewSectionContent,
  locale,
  forwardButtonLabel
}) => (
  <div className="sortableContainer">
    {setItemsInContent(
      contents,
      onClickDeletedSectionContent,
      onClickEditSectionContent,
      onClickViewSectionContent,
      locale,
      forwardButtonLabel
    )}
  </div>
));

export default ContentSortableList;
