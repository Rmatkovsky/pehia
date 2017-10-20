import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import {
    requiredCustom,
    isEmail,
    isPhone,
} from '../../../utils/validation.helper';

import FormInput from '../../../components/form/FormInput';

class PersonalInfoContactsComponent extends Component {
    constructor() {
        super();

        this.state = {
            edit: false,
        };

        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
    }

    handleClickEdit() {
        this.setState({ edit: true });
    }

    handleClickCancel() {
        this.setState({ edit: false });
    }

    handleClickSave() {
        const { handleSubmit } = this.props;

        handleSubmit();
        this.handleClickCancel();
    }

    renderEdit() {
        return (
            <div className="white_box save">

                <h3 className="save">
                    Contact &amp; Personal info
                    <i className="fa fa-times" aria-hidden="true" onClick={this.handleClickCancel} />
                    <i className="fa fa-check" aria-hidden="true" onClick={this.handleClickSave} />
                </h3>


                <div className="line">
                    <span className="icons location" />
                    <div className="info">
                        <p>Location</p>
                        <Field
                          type="text"
                          name="location"
                          className="input small"
                          maxLength={256}
                          component={FormInput}
                          placeholder="Enter your location"
                          // customErrors={user.errorData.data ? user.errorData.data.password : []}
                          validate={[
                              requiredCustom('Please enter your name'),
                          ]}
                        />
                    </div>
                </div>

                <div className="line">
                    <span className="icons email" />
                    <div className="info">
                        <p>Email</p>
                        <Field
                          type="text"
                          name="email"
                          className="input small"
                          maxLength={256}
                          component={FormInput}
                          placeholder="Enter your email"
                          // customErrors={user.errorData.data ? user.errorData.data.password : []}
                          validate={[
                              requiredCustom('Please enter your email'),
                              isEmail,
                          ]}
                        />
                    </div>
                </div>

                <div className="line">
                    <span className="icons phone" />
                    <div className="info">
                        <p>Phone</p>
                        <Field
                          type="text"
                          name="phone"
                          className="input small"
                          maxLength={256}
                          component={FormInput}
                          placeholder="Enter your email"
                          // customErrors={user.errorData.data ? user.errorData.data.password : []}
                          validate={[
                              requiredCustom('Please enter your phone'),
                              isPhone(),
                          ]}
                        />
                    </div>
                </div>

            </div>
        );
    }

    renderView() {
        const { user } = this.props;

        return (
            <div className="white_box">
                <h3 className="edit">Contact &amp; Personal info <i onClick={this.handleClickEdit} /></h3>

                <div className="line">
                    <span className="icons location" />
                    <div className="info">
                        <p>Location</p>
                        <div>{user.location}</div>
                    </div>
                </div>

                <div className="line">
                    <span className="icons email" />
                    <div className="info">
                        <p>Email</p>
                        <div>{user.email}</div>
                    </div>
                </div>

                <div className="line">
                    <span className="icons phone" />
                    <div className="info">
                        <p>Phone</p>
                        <div>{user.phone}</div>
                    </div>
                </div>

            </div>
        );
    }

    render() {
        const { edit } = this.state;
        return (
            <div className="contacts">
                {edit ? this.renderEdit() : this.renderView()}
            </div>
        );
    }
}

const initializeForm = reduxForm({
    form: 'personalInfoForm',
    enableReinitialize: true,
})(PersonalInfoContactsComponent);

const mapStateToProps = (state, { initialValues }) => ({
    initialValues,
    userMainInfoForm: state.form.personalInfoForm,
});

export default connect(mapStateToProps, {})(initializeForm);
