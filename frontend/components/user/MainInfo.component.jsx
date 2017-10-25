import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateAvatar } from '../../actions/user.actions';

import {
    requiredCustom,
} from '../../utils/validation.helper';

import FormInput from '../../components/form/FormInput';


class MainInfoComponent extends Component {
    constructor() {
        super();

        this.state = {
            edit: false,
        };

        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
    }

    handleFileUpload(e) {
        const { handleUpdateAvatar } = this.props;
        const file = e.target.files[0];
        const data = new FormData();

        data.append('file', file);
        data.append('name', file.name);

        handleUpdateAvatar(data);
    }

    handleClickSave() {
        const { handleSubmit } = this.props;
        handleSubmit();
        this.handleClickCancel();
    }

    handleClickEdit() {
        this.setState({ edit: true });
    }

    handleClickCancel() {
        this.setState({ edit: false });
    }

    render() {
        const { edit } = this.state;
        const { initialValues, handleSubmit } = this.props;
        const img = `/avatars/${initialValues.avatar}`;
        return (
            <div className="top">
                <div className="person">
                    <img src={img} width="113" height="113" />
                    <div className="upload"><input type="file" className="upload" onChange={this.handleFileUpload} /></div>
                </div>
                <div className="follow">
                    <a href="#">Profi panel</a>
                </div>
                <div className="info edit">
                    {
                        edit
                            ? <div>
                                <Field
                                  type="text"
                                  name="name"
                                  className="input name"
                                  maxLength={256}
                                  component={FormInput}
                                  placeholder="Your full name"
                                  // customErrors={user.errorData.data ? user.errorData.data.password : []}
                                  validate={[
                                      requiredCustom('Please enter your name'),
                                  ]}
                                />
                                <i className="fa fa-check" aria-hidden="true" onClick={this.handleClickSave} />
                                <i className="fa fa-times" aria-hidden="true" onClick={this.handleClickCancel} />
                            </div>
                            : <h3>{initialValues.name}<i className="fa fa-pencil" onClick={this.handleClickEdit} /></h3>
                    }
                    <p>Communications - Associate Sales Represent...</p>
                    <div className="star">
                        <span className="raiting-star" />
                        <span className="raiting-star" />
                        <span className="raiting-star" />
                        <span className="raiting-star" />
                        <span className="raiting-star" />
                    </div>
                    <div className="data">
                        <div>Followers:</div>
                        <strong>1, 268</strong>
                    </div>
                    <div className="data">
                        <div>following:</div>
                        <strong>1, 268</strong>
                    </div>
                </div>
            </div>
        );
    }
}

MainInfoComponent.propTypes = {
    initialValues: PropTypes.object.isRequired,
    handleUpdateAvatar: PropTypes.func.isRequired,
};

const initializeForm = reduxForm({
    form: 'userMainInfo',
    enableReinitialize: true,
})(MainInfoComponent);

const mapStateToProps = (state, { initialValues }) => ({
    initialValues,
    userMainInfoForm: state.form.userMainInfo,
});

const mapDispatchToProps = dispatch => ({
    handleUpdateAvatar: bindActionCreators(updateAvatar, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(initializeForm);
