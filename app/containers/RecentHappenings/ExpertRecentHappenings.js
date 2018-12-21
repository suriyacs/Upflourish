import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translatable } from 'react-multilingual';
import { Modal } from 'reactstrap';

import {
  fetchRecentHappenings,
  fetchMyRecentHappenings,
  createRecentHappening,
  editRecentHappening
} from '../../actions/recentHappenings';
import Loader from '../../components/Loader/Loader';
import ImageURL from '../../components/Image/ImageURL';
import { recentHappeningTabs } from '../../globals/AppConstant';
import Button from '../../components/Button/Button';
import NewRelatedHappening from './NewRelatedHappening';

import NoImage from '../../../assets/images/no-image.svg';
import CloseIcon from '../../../assets/images/close.svg';

import '../../../assets/styles/components/RelatedContent.scss';
import '../../../assets/styles/components/Dashboard.scss';

class ExpertRecentHappenings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      showCreateModal: false,
      formData: '',
      selectedRecentHappening: {}
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    this.props.fetchMyRecentHappenings(userId);
  }

  setActiveTab = index => {
    const { userId } = this.props;
    this.setState({ activeTab: index });
    if (index === 0) {
      this.props.fetchMyRecentHappenings(userId);
    } else if (index === 1) {
      this.props.fetchRecentHappenings();
    }
  }

  getFormData = file => {
    this.setState({ formData: file });
  }

  dateFormater = date => {
    let formatedDate = new Date(date).toUTCString();
    formatedDate = formatedDate.split(' ').slice(1, 4).join(' ');
    return formatedDate;
  }

  toggleCreateModal = action => {
    this.setState({ showCreateModal: action });
    if (action === false) {
      this.setState({ selectedRecentHappening: {} });
    }
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

  editRecentHappening = (e, recentHappening) => {
    e.preventDefault();
    this.setState({ selectedRecentHappening: recentHappening });
    this.toggleCreateModal(true);
  }

  saveRecentHappening = recentHappening => {
    const { formData } = this.state;
    if (recentHappening.id) {
      this.props.editRecentHappening(recentHappening, formData, this.toggleCreateModal);
    } else {
      this.props.createRecentHappening(recentHappening.category_id, recentHappening, formData, this.toggleCreateModal);
    }
  }

  renderRecentHappenings = recentHappening => {
    const { recentHappenings } = this.props.locale;
    const { activeTab } = this.state;
    return (
      <a
        key={recentHappening.id}
        className="link-card col-sm-6 col-md-6 col-lg-3 py-3 px-2"
        href={recentHappening.link}
        target="_blank"
      >
        <div
          className="learner-learning-path min-h-90 zoomIn m-0"
          role="presentation"
        >
          <div className="card-view text-left zoomIn c-pointer">
            <div className="path-card text-truncate">
              <img
                className="zoomingImg"
                src={ImageURL('LatestHappenings', recentHappening.id)}
                // src={recentHappening.thumbnail}
                alt="learningPath"
                onError={event => { event.target.src = NoImage; }}
              />
            </div>
            <div className={`card-detail ${activeTab === 0 ? 'h-160-px' : 'h-100-px'}`}>
              <div className={`${activeTab === 0 ? 'h-50' : 'h-30'}`}>
                <div className="title">{recentHappening.title}</div>
                {
                  recentHappening.expire_at &&
                  <div className="description pt-1">
                    {recentHappenings.expireAt} {this.dateFormater(recentHappening.expire_at)}
                  </div>
                }
              </div>
              {
                activeTab === 0 &&
                <div className="h-25">
                  <div className="row justify-content-center learning-path-btns">
                    <div className="col">
                      <button
                        className="btn learning-path-action-btn"
                        onClick={e => this.editRecentHappening(e, recentHappening)}
                      >
                        {recentHappenings.edit}
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </a>
    );
  }

  renderTabs = () => {
    const { activeTab } = this.state;
    const locale = this.props.locale.recentHappenings;
    return (
      <div className="expert-course-tabs nav nav-tabs w-100 mb-3 h-100">
        {recentHappeningTabs.map((tab, index) => (
          <li
            className={`nav-item ${activeTab === index ? 'active-tab' : ''}`}
            onClick={() => this.setActiveTab(index)}
            role="presentation"
            key={tab}
          >
            <div className="nav-link c-pointer">{locale.recentHappeningTabs[index]}</div>
          </li>
        ))}
      </div>
    );
  }

  render() {
    const { recentHappenings, loading } = this.props;
    const locale = this.props.locale.recentHappenings;
    const { showCreateModal, activeTab, selectedRecentHappening } = this.state;
    return (
      <div className="container-fluid">
        <Loader loading={loading} />
        {this.renderTabs()}
        {
          activeTab === 0 &&
          <div className="row justify-content-end">
            <div className="col-2">
              <Button
                htmlFor="newPath"
                className="new-learning-path"
                role="presentation"
                value={locale.create}
                onClick={() => this.toggleCreateModal(true)}
              />
            </div>
          </div>
        }
        <div className="row">
          {
            recentHappenings.map(recentHappening => this.renderRecentHappenings(recentHappening))
          }
          {
            recentHappenings.length === 0 &&
            <div className="no-learning-path">
              {locale.noRecentHappenings}
            </div>
          }
        </div>

        <Modal
          modalClassName="min-h-100 full-width reactstrab-modal content-add-popup"
          backdropClassName="modal-bg opacity-1"
          isOpen={showCreateModal}
          onClose={() => this.toggleCreateModal(false)}
          centered={showCreateModal}
          external={this.externalCloseButton(this.toggleCreateModal)}
        >
          <NewRelatedHappening
            recentHappeningLocale={locale}
            getFormData={this.getFormData}
            saveRecentHappening={this.saveRecentHappening}
            initialValues={selectedRecentHappening}
          />
        </Modal>
      </div>
    );
  }
}

ExpertRecentHappenings.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  recentHappenings: PropTypes.array,
  fetchRecentHappenings: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  fetchMyRecentHappenings: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  createRecentHappening: PropTypes.func.isRequired,
  editRecentHappening: PropTypes.func.isRequired
};

ExpertRecentHappenings.defaultProps = {
  recentHappenings: []
};

const mapStateToProps = state => ({
  loading: state.recentHappenings.get('loading'),
  recentHappenings: Array.from(state.recentHappenings.get('recentHappeningsList')),
  userId: state.user.get('userId'),
  recentHappening: state.recentHappenings.get('recentHappening')
});

const mapDispatchToProps = dispatch => ({
  fetchRecentHappenings: () => dispatch(fetchRecentHappenings()),
  fetchMyRecentHappenings: userId => dispatch(fetchMyRecentHappenings(userId)),
  createRecentHappening: (categoryId, data, file, fn) => dispatch(createRecentHappening(categoryId, data, file, fn)),
  editRecentHappening: (categoryId, data, file, fn) => dispatch(editRecentHappening(categoryId, data, file, fn))
});

export default connect(mapStateToProps, mapDispatchToProps)((translatable(locale => locale))(ExpertRecentHappenings));
