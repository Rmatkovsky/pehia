import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import cl from 'classnames';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import {
    isEmailCustom,
    requiredCustom,
    isPasswordCustom,
} from '../../../utils/validation.helper';import FormInput from '../../../components/form/FormInput';

import logo from '../../../assets/images/landing/logo1_landing.png';

class SignupPage extends Component {
    render() {
        const {
            user,
            handleSubmit,
            handleFacebookLogin,
            handleGoogleLogin,
        } = this.props;

        const classesForm = cl({
            hide: user.isCreated,
        });

        const classesCreateSuccess = cl({
            description_activate: true,
            hide: !user.isCreated,
        });
        console.log(user.isCreated);

        return (
            <div className="screen1">
                <div className="bg">
                    <div className="logo">
                        <a href="/">
                            <img
                              src={logo}
                              width="48"
                              height="48"
                              alt="logo"
                            />
                            <span>pehia</span>
                        </a>
                    </div>

                    <div className="pehia">
                        <div className="text">Sign Up</div>
                        <div className="signup">
                            <p className={classesForm}>Sign Up</p>
                            <p className={classesCreateSuccess}>Please check your email and activate account</p>
                            <form action="" method="" className={classesForm}>
                                <GoogleLogin
                                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                  buttonText="Sign up with Google"
                                  onSuccess={handleGoogleLogin}
                                  className="btn google"
                                />
                                <FacebookLogin
                                  appId="143194059222579"
                                  fields="id"
                                  callback={handleFacebookLogin}
                                  cssClass="btn fb"
                                  textButton="Sign up with Facebook"
                                />
                                <Field
                                  type="text"
                                  name="email"
                                  className="input"
                                  maxLength={256}
                                  component={FormInput}
                                  placeholder="Email"
                                  customErrors={user.error ? user.errorData.data.email : []}
                                  validate={[
                                      requiredCustom('Please enter your email'),
                                      isEmailCustom('Please enter a valid email'),
                                  ]}
                                />
                                <Field
                                  type="password"
                                  name="password"
                                  className="input"
                                  maxLength={256}
                                  component={FormInput}
                                  placeholder="Password"
                                  // customErrors={user.errorData.data ? user.errorData.data.password : []}
                                  validate={[
                                      requiredCustom('Please enter your password'),
                                      isPasswordCustom('Please enter a valid password'),
                                  ]}
                                />
                                <Field
                                  type="password"
                                  name="confirm_password"
                                  className="input"
                                  maxLength={256}
                                  component={FormInput}
                                  placeholder="Confirm password"
                                  // customErrors={user.errorData.data ? user.errorData.data.password : []}
                                  validate={[
                                      requiredCustom('Please enter your password'),
                                  ]}
                                />
                                <input
                                  type="submit"
                                  className="btn orange"
                                  value="Sign Up"
                                  onClick={handleSubmit}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SignupPage.defaultProps = {
    classNames: '',
    signupForm: {},
};

SignupPage.propTypes = {
    user: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleFacebookLogin: PropTypes.func.isRequired,
    handleGoogleLogin: PropTypes.func.isRequired,
};

const initializeForm = reduxForm({
    form: 'signup',
    validate: (values) => {
        const errors = {};

        if (values.confirm_password) {
            if (values.confirm_password !== values.password) {
                errors.confirm_password = 'Passwords do not match';
            }
        }

        return errors;
    },
})(SignupPage);

export default connect(state => ({ signupForm: state.form.signup }))(initializeForm);