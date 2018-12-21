import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { reduxForm } from 'redux-form';
import { translatable } from 'react-multilingual';

import AdminActions from '../../actions/admin';
import Loader from '../Loader/Loader';
import SearchBar from '../SearchBar/SearchBar';
import InviteUser from '../../containers/Admin/InviteUser';
import UpdateCategory from '../../containers/Admin/UpdateCategory';
import Pagination from '../../containers/Pagination/Pagination';
import EmptyView from './EmptyView';

import '../../../assets/styles/components/CustomGrid.scss';

import ProfilePng from '../../../assets/images/man.svg';

class CustomGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteUserPopup: false,
      searchTerm: '',
      expertId: '',
      currentUserId: '',
      limit: 10,
      offset: 0,
      activePage: 1,
      activeGrid: props.status,
      isEdit: false
    };
  }

  componentDidMount() {
    const {
      limit, offset, searchTerm
    } = this.state;
    this.props.getExperts({
      status: this.props.status,
      searchTerm,
      limit,
      offset
    });
  }

  openInviteUserPopup = () => {
    this.setState({ inviteUserPopup: true, isEdit: false });
  }

  updateInviteUserPopup = expertId => {
    this.props.getUserCategory(expertId);
    this.setState({ inviteUserPopup: true, isEdit: true, currentUserId: expertId });
  }

  closeInviteUserPopup = () => {
    this.setState({ inviteUserPopup: false });
  }

  togglePage = pageNumber => {
    const { limit, searchTerm } = this.state;
    this.props.getExperts({
      status: this.props.status,
      limit,
      searchTerm,
      offset: limit * (pageNumber - 1)
    });
    this.setState({
      activePage: pageNumber
    });
  }

  searchSections = value => {
    let { searchTerm } = this.state;
    value = value.trim();
    this.setState({ searchTerm: value }, null);
    searchTerm = value;
    this.props.getExperts({
      status: this.props.status,
      searchTerm,
      limit: this.state.limit,
      offset: this.state.offset
    });
  }

  deleteExpert = (expertId, activeGrid) => {
    this.setState({
      expertId,
      activeGrid
    });
  }

  removeExpert = expert => {
    expert.gridName = this.state.activeGrid;
    this.props.deleteExpert(expert);
  }

  renderCategories = expert => {
    let categoryArray = [];
    let category = 'No categories mapped';
    let showCount = false;
    const locale = this.props.locale.manageUsers;
    let categoryCount = 0;
    if (expert.categories) {
      categoryArray = expert.categories.split(',');
      categoryCount = categoryArray.length;
      if (categoryCount > 2) {
        category = `${categoryArray[0]}, ${categoryArray[1]},`;
        showCount = true;
      } else {
        category = expert.categories;
      }
    }
    return (
      <div
        className="col-lg-5 col-md-5 col-sm-12 content p-l-r-0 align-self-center text-center"
      >
        {category}
        {
          categoryCount === 0 &&
            <div
              role="presentation"
              onClick={() => this.updateInviteUserPopup(expert.expert_id)}
              className="count c-pointer"
            >
              {locale.addUser}
            </div>
        }
        {categoryCount > 0 &&
          <span
            className="count c-pointer"
            role="presentation"
            onClick={() => this.updateInviteUserPopup(expert.expert_id)}
          >
            {showCount &&
              ` +${categoryCount - 2} ${locale.others}`
            }
            <i className="fa fa-edit m-l-5" />
          </span>
        }
      </div>
    );
  }

  renderGrid = locale => {
    const {
      expertId,
      limit,
      activePage,
      searchTerm
    } = this.state;
    const { experts, status, expertCount } = this.props;
    return (
      <Fragment>
        <div className="custom-grid">
          <div className="row m-l-r-0">
            <div className="col-lg-12 m-b-20">
              <div className="row">
                <div className="col-lg-12 align-self-center p-l-r-0">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row plr-15">
                        <div className="col-md-6 row">
                          <span className="align-self-center">{expertCount} {locale.expert}</span>
                          <span className="separator" />
                          <SearchBar onChange={this.searchSections} />
                        </div>
                        {
                          status === locale.active &&
                          <div className="col-md-6 text-right p-l-r-0">
                            <button
                              className="inviteButton p-10 c-pointer"
                              onClick={this.openInviteUserPopup}
                            >
                              {locale.inviteButtonName}
                            </button>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {searchTerm.length > 0 && expertCount === 0 ?
            <EmptyView
              locale={locale}
              inviteUsers={this.openInviteUserPopup}
              isSearchActive
              searchKey={searchTerm}
            />
            :
            <div className="row m-l-r-0">
              {experts && expertCount > 0 &&
                experts.map(expert => (
                  <div key={expert.id} className="col-lg-12 cardView p-10">
                    <div className="row m-l-r-0">
                      <div className="col-lg-4 col-md-4 col-sm-12 user p-l-r-0">
                        <img width="50px" height="50px" src={ProfilePng} alt="user" />
                        <span className="name">
                          {expert.first_name} {expert.last_name}
                          <div className="email">{expert.email}</div>
                        </span>
                      </div>
                      {this.renderCategories(expert)}
                      {/* <div className="col-lg-2 col-md-6 col-sm-6 p-l-r-0 align-self-center d-none">
                        {expert.role === 1 ? (
                          <div className="Select-control adminRole text-center">Admin</div>
                        ) : (
                          <SelectList
                            isLableRequired={false}
                            htmlFor="title"
                            name="Admin"
                            options={users}
                            labelKey="title"
                            valueKey="title"
                            placeholder=""
                            labelName=""
                          />
                        )}
                      </div>*/}
                      {(status === 'ACTIVE' || status === 'PENDING' || status === 'DELETED') &&
                        <div
                          className="col-lg-3 col-md-3 col-sm-12 action p-l-r-0 align-self-center text-center"
                        >
                          {status === 'ACTIVE' &&
                            <i
                              className="fa fa-trash c-pointer"
                              onClick={() => this.deleteExpert(expert.id, status)}
                              role="presentation"
                            />
                          }
                          {status === 'PENDING' &&
                            <div className="actionButton">
                              <span
                                className="revoke c-pointer"
                                onClick={() => this.deleteExpert(expert.id, status)}
                                role="presentation"
                              >
                                {locale.revoke}
                              </span>
                              <span
                                className="c-pointer"
                                onClick={() => this.props.resendInvite(expert)}
                                role="presentation"
                              >
                                {locale.resend}
                              </span>
                            </div>
                          }
                          {status === 'DELETED' &&
                            <div className="actionButton">
                              <span
                                className="c-pointer"
                              >{locale.reActive}
                              </span>
                            </div>
                          }
                        </div>
                      }
                      <div
                        id="innerContent"
                        className={`col-12 ${(expert.id === expertId) ? 'isDelete' : ''}`}
                      >
                        <p className="mt-1 mb-0">
                          {status === 'ACTIVE' && locale.confirmDeleteInfo.replace('{user}', expert.email)}
                          {status === 'PENDING' && locale.confirmRevokeInfo.replace('{user}', expert.email)}
                        </p>
                        <div className="text-right mt-1">
                          <button className="btn confirm-btn mr-2" onClick={() => this.removeExpert(expert)}>
                            {locale.confirmButton}
                          </button>
                          <button className="btn cancel-btn" onClick={() => this.setState({ expertId: '' })}>
                            {locale.cancelButton}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          }
        </div>
        {expertCount > 0 &&
          <div className="pagination-div w-100 text-right">
            <span className="pagination-details">
              {(limit * (activePage - 1)) + 1}-
              {
                limit * activePage > expertCount ?
                  expertCount :
                  limit * activePage
              } {locale.of} {expertCount} {locale.items}
            </span>
            <Pagination
              togglePage={this.togglePage}
              activePage={activePage}
              numberOfPages={Math.ceil(expertCount / limit)}
            />
          </div>
        }
      </Fragment>
    );
  }

  render() {
    const {
      inviteUserPopup,
      searchTerm,
      isEdit,
      currentUserId,
      activeGrid
    } = this.state;
    const locale = this.props.locale.manageUsers;
    const {
      expertCount,
      loading,
      userCategories,
      getUserCategory
    } = this.props;
    return (
      <Fragment>
        <Modal
          isOpen={inviteUserPopup}
          centered
          external={
            <button className="styles_closeButton__20ID4 pop-up-close-button" onClick={this.closeInviteUserPopup}>
              <span className="close-icon">
              &times;
              </span>
            </button>
          }
          modalClassName="reactstrab-modal"
          backdropClassName="modal-bg d-flex overlay-opacity"
        >
          {isEdit &&
            <UpdateCategory
              userId={currentUserId}
              activeGrid={activeGrid}
              onPopupClose={this.closeInviteUserPopup}
              userCategories={userCategories}
              getUserCategory={getUserCategory}
            />
          }
          {!isEdit &&
            <InviteUser
              onPopupClose={this.closeInviteUserPopup}
            />
          }
        </Modal>
        {searchTerm === '' && expertCount === 0 ?
          <EmptyView
            locale={locale}
            inviteUsers={this.openInviteUserPopup}
            isSearchActive={false}
          />
          : this.renderGrid(locale)
        }
        <Loader loading={loading} />
      </Fragment>
    );
  }
}

CustomGrid.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  experts: PropTypes.any.isRequired,
  getExperts: PropTypes.func.isRequired,
  getUserCategory: PropTypes.func.isRequired,
  deleteExpert: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  expertCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  resendInvite: PropTypes.func.isRequired,
  userCategories: PropTypes.any.isRequired
};

const mapStateToProps = state => ({
  userCategories: state.admin.get('userCategories'),
  experts: state.admin.get('experts'),
  expertCount: state.admin.get('expertCount'),
  loading: state.admin.get('loading')
});

const mapDispatchToProps = dispatch => ({
  getUserCategory: expertId => dispatch(AdminActions.fetchUserCategory(expertId)),
  getExperts: data => dispatch(AdminActions.fetchExperts(data)),
  deleteExpert: expert => dispatch(AdminActions.deleteExpert(expert)),
  resendInvite: expert => dispatch(AdminActions.expertResendInvite(expert))
});

const Grid = connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(CustomGrid));

export default reduxForm({
  form: 'users'
})(Grid);
