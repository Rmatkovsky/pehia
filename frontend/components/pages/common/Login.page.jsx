import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import {
    isEmailCustom,
    requiredCustom,
} from '../../../utils/validation.helper';

import FormInput from '../../../components/form/FormInput';
import logo from '../../../assets/images/landing/logo1_landing.png';

class LoginPage extends Component {
    render() {
        const {
            user,
            handleSubmit,
            handleFacebookLogin,
            handleGoogleLogin,
        } = this.props;

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
                        <div className="text">Login</div>
                        <div className="login">
                            <p>Login</p>
                            <form action="" method="">
                                <GoogleLogin
                                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                  buttonText="Login with Google"
                                  onSuccess={handleGoogleLogin}
                                  className="btn google"
                                />
                                <FacebookLogin
                                  appId="143194059222579"
                                  fields="id"
                                  callback={handleFacebookLogin}
                                  cssClass="btn fb"
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
                                  placeholder="Confirm password"
                                  // customErrors={user.errorData.data ? user.errorData.data.password : []}
                                  validate={[
                                      requiredCustom('Please enter your password'),
                                  ]}
                                />
                                <input
                                  type="submit"
                                  className="btn flue"
                                  value="Login"
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

LoginPage.propTypes = {
    user: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleFacebookLogin: PropTypes.func.isRequired,
    handleGoogleLogin: PropTypes.func.isRequired,
};

const initializeForm = reduxForm({
    form: 'login',
})(LoginPage);

export default connect(state => ({ loginForm: state.form.login }))(initializeForm);
