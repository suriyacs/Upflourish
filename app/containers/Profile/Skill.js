import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';
import { connect } from 'react-redux';

import { getLearnerSpecificSkill } from '../../actions/profile';

import PencilIcon from '../../../assets/images/pencil.svg';
import AddIcon from '../../../assets/images/plus.svg';

class Skill extends React.Component {
  componentDidMount() {
    this.props.getLearnerSpecificSkill();
  }

  render() {
    const { learnerSkillList } = this.props;
    const locale = this.props.locale.profile;
    return (
      <div className="container-fluid p-0" id="skills">
        <div className="row align-items-center">
          <div className="col-8">
            <h3 className="heading m-10px-0px">{locale.skillSection.title}</h3>
          </div>
          <div className="col-4">
            <span
              className="c-pointer edit"
              onClick={() => {
                this.props.openFormPopup({
                  formName: 'skillDetail', isEdit: false, formObject: { learnerSkillList }
                });
              }}
              role="presentation"
            >
              <img className="icon pencil-icon" src={AddIcon} alt="edit" />
            </span>
          </div>
        </div>
        <div className="profile-common-container">
          <div className="row m-4">
            {
              learnerSkillList && learnerSkillList.length ?
                <Fragment>
                  <div className="col-11 pl-0">
                    <div className="col-11 skill-section">
                      {learnerSkillList.map(selectedSkill => (
                        <span key={selectedSkill.skill_id} className="badge badge-secondary skil-set">
                          <span className="skill-set-font">{selectedSkill ? selectedSkill.name : ''}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-1 pr-0">
                    <span
                      className="c-pointer edit"
                      onClick={() => {
                        this.props.openFormPopup({
                          formName: 'skillDetail', isEdit: true, formObject: { learnerSkillList }
                        });
                      }}
                      role="presentation"
                    >
                      <img className="icon pencil-icon" src={PencilIcon} alt="edit" />
                    </span>
                  </div>
                </Fragment>
                :
                <div className="col-12 heading text-center">
                  {locale.skillSection.emptyMessage}
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Skill.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  openFormPopup: PropTypes.func.isRequired,
  getLearnerSpecificSkill: PropTypes.func.isRequired,
  learnerSkillList: PropTypes.any.isRequired
};

const mapDispatchToProps = dispatch => ({
  getLearnerSpecificSkill: () => dispatch(getLearnerSpecificSkill())
});

const mapStateToProps = state => ({
  userId: state.user.get('userId'),
  learnerSkillList: state.profile.get('learnerSkillList'),
  skillList: state.profile.get('masterSkillList')
});

export default connect(mapStateToProps, mapDispatchToProps)((translatable(locale => locale))(Skill));
