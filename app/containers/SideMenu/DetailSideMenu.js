import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';
import { routeConstant, constantValues } from '../../globals/AppConstant';
import ImageURL from '../../components/Image/ImageURL';

import '../../../assets/styles/components/Sidemenu.scss';

import ProfilePng from '../../../assets/images/man.svg';
import EditIcon from '../../../assets/images/white-edit.svg';

class DetailSideMenu extends Component {
  onClickEdit = () => {
    const { courseDetails, userId, locale } = this.props;
    if (courseDetails.owner_id === userId) {
      this.props.onEdit();
    } else {
      toast.error(locale.detailSideMenu.notAuthorized);
    }
  }

  goBack = () => {
    this.props.history.push(this.props.routeUrl);
  }

  render() {
    const {
      name,
      description,
      user,
      routeUrl,
      courseId,
      courseType,
      showEditIcon
    } = this.props;
    const locale = this.props.locale.detailSideMenu;
    return (
      <div className="col-12 col-lg-4 learner-section-side-nav">
        <div
          className="row back-button align-items-center c-pointer"
          onClick={this.goBack}
          role="presentation"
        >
          <i className="fa fa-angle-left left-angle" />
          <span className="back-btn-text">
            {routeUrl === routeConstant.DASHBOARD ?
              locale.home :
              locale.back
            }
          </span>
        </div>
        <div className="header my-3 mx-4">
          <div className="row">
            <div className={`title mb-2 ${showEditIcon ? 'col-10' : 'col-12'}`}>
              {name}
            </div>
            {
              showEditIcon &&
              <div className="col-2 p-0">
                <img
                  src={EditIcon}
                  className="icon white-pencil c-pointer float-right"
                  alt="edit"
                  role="presentation"
                  onClick={() => { this.onClickEdit(); }}
                />
              </div>
            }
          </div>
          <div
            className="side-menu-description description"
            data-toggle="tooltip"
            data-placement="top"
            title={description}
          >
            <p
              id="detail"
              className={`${description.length > constantValues.expandableLimit ?
                'collapse' : ''} col-lg-12 padding-0 path-detail`}
              aria-expanded="false"
            >
              {description}
            </p>
            {description &&
              description.length > constantValues.expandableLimit &&
              <span className="expand collapsed" data-toggle="collapse" href="#detail" aria-expanded="false" />
            }
          </div>
          <div className="pt-3">
            {
              courseId && courseType &&
              <Link to={{
                pathname: `${courseType}/${courseId}`
              }}
              >
                <button className="btn btn-outline-primary synopsis-btn">
                  {locale.viewSynopsis}
                </button>
              </Link>
            }
          </div>
        </div>
        <div className="author-section px-4">
          <div className="title mb-2">{locale.author}</div>
          <div className="d-flex flex-row">
            <div className="d-flex flex-column p-2">
              <img
                className="image"
                src={
                  user.id ?
                    ImageURL('Users', user.id) :
                    ProfilePng
                }
                alt="Profile"
                onError={event => { event.target.src = ProfilePng; }}
              />
            </div>
            <div className="p-2">
              <div className="common-header-text mb-1">
                {user ?
                  user.first_name : ''}
              </div>
              <div className="common-content-text f-s-15 mb-1">Chief Data Scientist</div>
              <div className="common-content-text f-s-15 mb-1">Ideas2IT Technologies</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DetailSideMenu.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  user: PropTypes.object,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  routeUrl: PropTypes.string,
  history: PropTypes.object.isRequired,
  courseId: PropTypes.string.isRequired,
  courseType: PropTypes.string.isRequired,
  showEditIcon: PropTypes.bool,
  onEdit: PropTypes.func,
  userId: PropTypes.string.isRequired,
  courseDetails: PropTypes.object
};

DetailSideMenu.defaultProps = {
  name: '',
  description: '',
  user: {},
  routeUrl: routeConstant.DASHBOARD,
  showEditIcon: false,
  onEdit: null,
  courseDetails: {}
};

export default (translatable(locale => locale)(DetailSideMenu));
