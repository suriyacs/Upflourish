import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import '../../../assets/styles/components/LearningPath.scss';

import EditIcon from '../../../assets/images/edit.svg';
import DeleteIcon from '../../../assets/images/delete.svg';
import ClockIcon from '../../../assets/images/clock.svg';

const SortableItem = SortableElement(({
  value,
  onClickDeletedSection,
  onClickEditSection,
  onClickViewSection,
  locale,
  order
}) => (
  <div className="row m-25 m-r-0 section-content" id={value.id}>
    <div id="outer-box" className="col-12 col-sm-12 learner-section-detail">
      <div className="row">
        <div className="col-12 col-sm-2 col-md-1 pb-4 section-count">
          {order + 1 < 10 ? `0${order + 1}` : order + 1}
        </div>
        <div className="col-12 col-sm-10 col-md-11 col-lg-11 container-fluid">
          <div className="row">
            <div className="col-11 col-md-12">
              <div className="row align-items-center">
                <div className="col-8">
                  <div className="one-row-ellipsis px-2 section-detail-title">{value.name}</div>
                </div>
                <div className="col-4 hours-section pr-sm-4">
                  <span className="d-flex flex-row justify-content-end align-items-center">
                    <img className="profile-common-icon assessment" src={ClockIcon} alt="time" />
                    <span className="info pl-2">
                      {parseInt(value.minutes, 10)}
                      <span> mins</span>
                    </span>
                    <span className="info pl-2">
                      <span className="pr-1">{value.points ? parseInt(value.points, 10) : 0}</span>
                      <span>{locale.points}</span>
                    </span>
                  </span>
                </div>
              </div>
              <div
                className="col-12 mb-3 section-detail-content three-row-ellipsis"
                data-toggle="tooltip"
                data-placement="top"
                title={value.description}
              >
                {value.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="inner-box" className="col-12 py-2 px-5 py-sm-4 py-md-5 editView-section">
        <div className="row">
          <button
            className="btn btn-primary col-5 col-sm-5 col-md-3 col-lg-2"
            onClick={() => onClickViewSection(value.id)}
          >{locale.viewSection}
          </button>
          <button className="btn col-5 col-sm-4 col-md-2" onClick={() => onClickEditSection(value)}>
            <img className="icon" src={EditIcon} alt="edit" />
            {locale.edit}
          </button>
          <button className="btn col-5 col-sm-4 col-md-2" onClick={() => onClickDeletedSection(value)}>
            <img className="icon" src={DeleteIcon} alt="delete" />
            {locale.delete}
          </button>
        </div>
      </div>
    </div>
  </div>
));

const setItemsInSection = (
  sections,
  onClickDeletedSection,
  onClickEditSection,
  onClickViewSection,
  locale,
  ownerId,
  userId
) => sections.map((value, index) => (
  <SortableItem
    key={value.id}
    distance={1}
    order={index}
    index={index}
    value={value}
    onClickDeletedSection={onClickDeletedSection}
    onClickEditSection={onClickEditSection}
    onClickViewSection={onClickViewSection}
    length={sections.length}
    locale={locale}
    disabled={ownerId !== userId}
  />
));

const SortableSectionList = SortableContainer(({
  sections,
  onClickDeletedSection,
  onClickEditSection,
  onClickViewSection,
  locale,
  ownerId,
  userId
}) => (
  <div className="sortableContainer" >
    {setItemsInSection(
      sections,
      onClickDeletedSection,
      onClickEditSection,
      onClickViewSection,
      locale,
      ownerId,
      userId
    )}
  </div>
));

export default SortableSectionList;
