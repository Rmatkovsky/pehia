import React, { PureComponent } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import logo from '../../../assets/images/landing/logo1_landing.png';

class SignupPage extends PureComponent {
    render() {
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
                            <p>Sign Up</p>
                            <form action="" method="">
                                <GoogleLogin
                                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                  buttonText="Sign up with Google"
                                  onSuccess={() => {}}
                                  onFailure={() => {}}
                                  className="btn google"
                                />
                                <FacebookLogin
                                  appId="1088597931155576"
                                  autoLoad
                                  fields="name,email,picture"
                                  onClick={() => {}}
                                  callback={() => {}}
                                  cssClass="btn fb"
                                  textButton="Sign up with Facebook"
                                />
                                <input
                                  type="text"
                                  className="input"
                                  name="name"
                                  placeholder="Username"
                                />
                                <input
                                  type="text"
                                  className="input"
                                  name="password"
                                  placeholder="Password"
                                />
                                <input
                                  type="text"
                                  className="input"
                                  name="confirm_password"
                                  placeholder="Confirm password"
                                />
                                <input type="submit" className="btn orange" value="Sign Up" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupPage;
