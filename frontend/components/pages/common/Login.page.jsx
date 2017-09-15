import React, { PureComponent } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import logo from '../../../assets/images/landing/logo1_landing.png';

class LoginPage extends PureComponent {
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
                        <div className="text">Login</div>
                        <div className="login">
                            <p>Login</p>
                            <form action="" method="">
                                <GoogleLogin
                                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                  buttonText="Login with Google"
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
                                <input type="submit" className="btn flue" value="Login" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
