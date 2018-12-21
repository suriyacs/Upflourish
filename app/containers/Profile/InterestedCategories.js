import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';
import { connect } from 'react-redux';

import { fetchIntrestedCategories } from '../../actions/profile';

import PencilIcon from '../../../assets/images/pencil.svg';
import AddIcon from '../../../assets/images/plus.svg';

class InterestedCategories extends Component {
  componentDidMount() {
    this.props.getLearnerInterestedCategories();
  }

  render() {
    const { interestedCategories } = this.props;
    const locale = this.props.locale.profile.intrestedCategories;
    return (
      <div className="interest-categories" id="interested categories">
        <div className="row align-items-center">
          <div className="col-8">
            <h3 className="heading m-10px-0px">
              {locale.headerTitle}
            </h3>
          </div>
          <div className="col-4">
            <span
              className="c-pointer edit"
              onClick={() => {
                this.props.openFormPopup({
                  formName: 'interestedCategories', isEdit: false, formObject: { interestedCategories }
                });
              }}
              role="presentation"
            >
              <img
                className="icon pencil-icon"
                src={interestedCategories.length === 0 ? AddIcon : PencilIcon}
                alt="add or edit"
              />
            </span>
          </div>
        </div>
        <div className="profile-common-container p-4">
          <div className="row m-0">
            <div className="col-12 pl-0 skill-section">
              {interestedCategories.length === 0 &&
                <div className="col-12 heading text-center">
                  {locale.noDataFound}
                </div>
              }
              {interestedCategories.map(interestedCategory => (
                <div className="badge badge-secondary skil-set" key={interestedCategory.id}>
                  <div className="skill-set-font my-0">
                    {interestedCategory.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InterestedCategories.propTypes = {
  openFormPopup: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  getLearnerInterestedCategories: PropTypes.func.isRequired,
  interestedCategories: PropTypes.any.isRequired
};

const mapDispatchToProps = dispatch => ({
  getLearnerInterestedCategories: () => dispatch(fetchIntrestedCategories())
});

const mapStateToProps = state => ({
  interestedCategories: state.profile.get('interestedCategories')
});

export default connect(mapStateToProps, mapDispatchToProps)((translatable(locale => locale))(InterestedCategories));
