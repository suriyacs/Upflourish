import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TextField from '../../../components/FormComponents/TextField';
import DateTimePicker from '../../../components/FormComponents/DatePicker';
import SelectList from '../../../components/FormComponents/Select';
import EmptyCircle from '../../../../assets/images/empty-circle.svg';
import ActiveCircle from '../../../../assets/images/circle-with-check-symbol.svg';
import { monthList } from '../../../globals/AppConstant';
import { required, email, validateMonth, validateEndMonth, validateEndYear } from '../../../utils/Validations';

const startMonth = (value, allValues) =>
  validateMonth(value, allValues, { name: 'start' });

const endMonth = (value, allValues) =>
  validateMonth(value, allValues, { name: 'end' });

const endMonthValidation = (value, allValues) =>
  validateEndMonth(value, allValues, { name: 'end', opName: 'start' });

const endYearValidation = (value, allValues) =>
  validateEndYear(value, allValues, { name: 'end', opName: 'start' });

const PersonalDetailForm = ({ locale }) => (
  <div className="col-12 container-fluid">
    <div className="row">
      <div className="col-12 col-sm-6">
        <TextField
          name="first_name"
          isLableRequired
          htmlFor="First Name"
          labelName={locale.firstName}
          type="text"
          className="form-control profile-form-text-box"
          validate={[required]}
        />
      </div>
      <div className="col-12 col-sm-6">
        <TextField
          name="last_name"
          isLableRequired
          htmlFor="Last Name"
          labelName={locale.lastName}
          type="text"
          className="form-control profile-form-text-box"
          validate={[required]}
        />
      </div>
      <div className="col-12 col-sm-6">
        <TextField
          name="mobile_number"
          isLableRequired
          htmlFor="Phone Number"
          labelName={locale.phoneNumber}
          type="number"
          className="form-control profile-form-text-box"
          validate={[]}
        />
      </div>
      <div className="col-12 col-sm-6">
        <TextField
          name="email"
          isLableRequired
          htmlFor="Email"
          labelName={locale.email}
          type="text"
          className="form-control profile-form-text-box"
          validate={[required, email]}
          readOnly
        />
      </div>
      <div className="col-12 col-sm-6">
        <TextField
          name="place_of_birth"
          isLableRequired
          htmlFor="Place Of Birth"
          labelName={locale.POB}
          type="text"
          className="form-control profile-form-text-box"
          validate={[]}
        />
      </div>
      <div className="col-12 col-sm-6">
        <DateTimePicker
          name="date_of_birth"
          isLableRequired
          htmlFor="Date Of Birth"
          labelName={locale.DOB}
          type="text"
          className="form-control profile-form-text-box"
          validate={[]}
        />
      </div>
      <div className="col-12 col-sm-6">
        <TextField
          name="city"
          isLableRequired
          htmlFor="City"
          labelName={locale.city}
          type="text"
          className="form-control profile-form-text-box"
          validate={[]}
        />
      </div>
      <div className="col-12">
        <TextField
          name="address"
          isLableRequired
          htmlFor="Address"
          labelName={locale.address}
          type="textArea"
          className="form-control profile-form-text-box"
          validate={[]}
        />
      </div>
      <div className="col-12">
        <TextField
          name="summary"
          isLableRequired
          htmlFor="Summary"
          labelName={locale.summary}
          type="textArea"
          className="form-control profile-form-text-box"
          validate={[]}
        />
      </div>
    </div>
  </div>
);

PersonalDetailForm.propTypes = {
  locale: PropTypes.object.isRequired
};

const SkillsForm = ({
  skillList,
  handleChange,
  handleSelect,
  locale
}) => (
  <div className="col-12 container-fluid">
    <div className="row">
      <div className="col-12">
        <div className="category-section">
          <SelectList
            htmlFor="Add Skill"
            name="skills"
            labelName={locale.addSkill}
            options={_.isArray(skillList) ? skillList : []}
            isLableRequired
            labelKey="name"
            valueKey="id"
            validate={[]}
            placeholder={locale.enterSkill}
            onInputChange={handleChange}
            handleChange={handleSelect}
          />
        </div>
      </div>
    </div>
  </div>
);

SkillsForm.propTypes = {
  locale: PropTypes.object.isRequired,
  skillList: PropTypes.any.isRequired,
  handleChange: PropTypes.func,
  handleSelect: PropTypes.func
};

SkillsForm.defaultProps = {
  handleChange: null,
  handleSelect: null
};

const EmployementForm = props => (
  <div className="col-12 container-fluid">
    <div className="row">
      <div className="col-12">
        <TextField
          name="title"
          isLableRequired
          htmlFor="Title"
          labelName={props.locale.title}
          type="text"
          className="form-control profile-form-text-box"
          validate={[required]}
        />
      </div>
      <div className="col-6">
        <TextField
          name="employer"
          isLableRequired
          htmlFor="Employer"
          labelName={props.locale.employer}
          type="text"
          className="form-control profile-form-text-box"
          validate={[required]}
        />
      </div>
      <div className="col-6">
        <TextField
          name="city"
          isLableRequired
          htmlFor="City"
          labelName={props.locale.city}
          type="text"
          className="form-control profile-form-text-box"
          validate={[required]}
        />
      </div>
      <div className="col-6 container-fluid">
        <div className="input-field">
          <span>{props.locale.startDate}</span>
          <span className="required-field">*</span>
        </div>
        <div className="row">
          <div className="col-6">
            <SelectList
              htmlFor="Start Month"
              labelName={props.locale.startMonth}
              name="start_month"
              options={monthList}
              className="form-control"
              validate={[required, startMonth]}
              labelKey="name"
              valueKey="id"
              simpleValue
            />
          </div>
          <div className="col-6">
            <SelectList
              htmlFor="Start Year"
              labelName={props.locale.startYear}
              name="start_year"
              options={props.yearList}
              className="form-control"
              validate={[required]}
              labelKey="year"
              valueKey="id"
              simpleValue
            />
          </div>
        </div>
      </div>
      {
        props.currentlyActive &&
        <div className="col-6 container-fluid">
          <div className="input-field mt-5">
            {props.locale.present}
          </div>
        </div>
      }
      {
        !props.currentlyActive &&
        <div className="col-6 container-fluid">
          <div className="input-field">
            <span>{props.locale.endDate}</span>
            <span className="required-field">*</span>
          </div>
          <div className="row">
            <div className="col-6">
              <SelectList
                htmlFor="End Month"
                labelName={props.locale.endMonth}
                name="end_month"
                options={monthList}
                className="form-control"
                validate={[required, endMonth, endMonthValidation]}
                labelKey="name"
                valueKey="id"
                simpleValue
              />
            </div>
            <div className="col-6">
              <SelectList
                htmlFor="End Year"
                labelName={props.locale.endYear}
                name="end_year"
                options={props.yearList}
                className="form-control"
                validate={[required, endYearValidation]}
                labelKey="year"
                valueKey="id"
                simpleValue
              />
            </div>
          </div>
        </div>
      }
      <div className="col-6 mt-3">
        <div className="row">
          <span
            className="col-1 pr-0 c-pointer"
            role="presentation"
            onClick={() => { props.changeCurrentStatus(); }}
          >
            <img src={props.currentlyActive ? ActiveCircle : EmptyCircle} alt="profile" className="icon" />
          </span>
          <span className="col-10">
            {props.locale.currentlyWorking}
          </span>
        </div>
      </div>
      <div className="col-12">
        <TextField
          name="employer_url"
          isLableRequired
          htmlFor="Employer Link"
          labelName={props.locale.employerLink}
          type="text"
          className="form-control profile-form-text-box"
          validate={[]}
        />
      </div>
      <div className="col-12">
        <TextField
          name="description"
          isLableRequired
          htmlFor="Description"
          labelName={props.locale.description}
          type="textArea"
          className="form-control profile-form-text-box"
          validate={[]}
        />
      </div>
    </div>
  </div>
);

EmployementForm.propTypes = {
  yearList: PropTypes.array.isRequired,
  changeCurrentStatus: PropTypes.func.isRequired,
  currentlyActive: PropTypes.bool.isRequired,
  locale: PropTypes.object.isRequired
};

const EducationForm = props => (
  <div className="col-12 container-fluid">
    <div className="row">
      <div className="col-12">
        <TextField
          name="title"
          isLableRequired
          htmlFor="Title"
          labelName={props.locale.title}
          type="text"
          className="form-control profile-form-text-box"
          validate={[required]}
        />
      </div>
      <div className="col-6">
        <TextField
          name="institute"
          isLableRequired
          htmlFor="Institute"
          labelName={props.locale.institute}
          type="text"
          className="form-control profile-form-text-box"
          validate={[required]}
        />
      </div>
      <div className="col-6">
        <TextField
          name="city"
          isLableRequired
          htmlFor="City"
          labelName={props.locale.city}
          type="text"
          className="form-control profile-form-text-box"
          validate={[required]}
        />
      </div>
      <div className="col-6 container-fluid">
        <div className="input-field">
          <span>{props.locale.startDate}</span>
          <span className="required-field">*</span>
        </div>
        <div className="row">
          <div className="col-6">
            <SelectList
              htmlFor="Start Month"
              labelName={props.locale.startMonth}
              name="start_month"
              options={monthList}
              className="form-control"
              validate={[required]}
              labelKey="name"
              valueKey="id"
              simpleValue
            />
          </div>
          <div className="col-6">
            <SelectList
              htmlFor="Start Year"
              labelName={props.locale.startYear}
              name="start_year"
              options={props.yearList}
              className="form-control"
              validate={[required]}
              labelKey="year"
              valueKey="id"
              simpleValue
            />
          </div>
        </div>
      </div>
      {
        props.currentlyActive &&
        <div className="col-6 container-fluid">
          <div className="input-field mt-5">
            {props.locale.present}
          </div>
        </div>
      }
      {
        !props.currentlyActive &&
        <div className="col-6 container-fluid">
          <div className="input-field">
            <span>{props.locale.endDate}</span>
            <span className="required-field">*</span>
          </div>
          <div className="row">
            <div className="col-6">
              <SelectList
                htmlFor="End Month"
                labelName={props.locale.endMonth}
                name="end_month"
                options={monthList}
                className="form-control"
                validate={[required]}
                labelKey="name"
                valueKey="id"
                simpleValue
              />
            </div>
            <div className="col-6">
              <SelectList
                htmlFor="End Year"
                labelName={props.locale.endYear}
                name="end_year"
                options={props.yearList}
                className="form-control"
                validate={[required]}
                labelKey="year"
                valueKey="id"
                simpleValue
              />
            </div>
          </div>
        </div>
      }
      <div className="col-6 mt-3">
        <div className="row">
          <span
            className="col-1 pr-0 c-pointer"
            role="presentation"
            onClick={() => { props.changeCurrentStatus(); }}
          >
            <img src={props.currentlyActive ? ActiveCircle : EmptyCircle} alt="profile" className="icon" />
          </span>
          <span className="col-10">
            {props.locale.currentlyStuding}
          </span>
        </div>
      </div>
      <div className="col-12">
        <TextField
          name="description"
          isLableRequired
          htmlFor="Description"
          labelName={props.locale.description}
          type="textArea"
          className="form-control profile-form-text-box"
          validate={[]}
        />
      </div>
    </div>
  </div>
);

EducationForm.propTypes = {
  yearList: PropTypes.array.isRequired,
  changeCurrentStatus: PropTypes.func.isRequired,
  currentlyActive: PropTypes.bool.isRequired,
  locale: PropTypes.object.isRequired
};

const CertificationForm = ({ locale }) => (
  <div className="col-12 container-fluid">
    <div className="row">
      <div className="col-6">
        <TextField
          name="certificatename"
          isLableRequired
          htmlFor="Certificate Name"
          labelName={locale.certificateName}
          type="text"
          className="form-control profile-form-text-box"
          validate={[required]}
        />
      </div>
      <div className="col-6">
        <DateTimePicker
          name="enddate"
          isLableRequired
          htmlFor="Finished Date"
          labelName={locale.finishedDate}
          type="text"
          className="form-control profile-form-text-box"
          validate={[required]}
        />
      </div>
      <div className="col-12">
        <TextField
          name="institue"
          isLableRequired
          htmlFor="Institute"
          labelName={locale.institute}
          type="text"
          className="form-control profile-form-text-box"
          validate={[required]}
        />
      </div>
      <div className="col-12">
        <TextField
          name="description"
          isLableRequired
          htmlFor="Description"
          labelName={locale.description}
          type="textArea"
          className="form-control profile-form-text-box"
          validate={[required]}
        />
      </div>
    </div>
  </div>
);

CertificationForm.propTypes = {
  locale: PropTypes.object.isRequired
};

const InterestedCategoryForm = ({
  locale,
  categories,
  handleChangeIC
}) => (
  <div className="col-12 container-fluid">
    <div className="row">
      <div className="col-12">
        <div className="category-section">
          <SelectList
            htmlFor={locale.addIntrestedCategories}
            labelName={locale.addIntrestedCategories}
            name="intrestedCategories"
            options={categories}
            placeholder={locale.selectIntrestedCategories}
            validate={[]}
            labelKey="name"
            valueKey="id"
            handleChange={handleChangeIC}
          />
        </div>
      </div>
    </div>
  </div>
);

InterestedCategoryForm.propTypes = {
  locale: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  handleChangeIC: PropTypes.func.isRequired
};

const FormComponentList = {
  personalDetail: PersonalDetailForm,
  skillDetail: SkillsForm,
  employmentDetail: EmployementForm,
  educationDetail: EducationForm,
  certificationform: CertificationForm,
  interestedCategories: InterestedCategoryForm
};

export default FormComponentList;
