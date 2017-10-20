import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import logo from '../../../assets/images/landing/logo1_landing.png';

class ActivatePage extends Component {
    render() {
        const {
            user,
        } = this.props;

        const classNamesLoading = cl({
            loading: true,
            hide: user.isActivate,
        });

        const classNamesActivate = cl({
            activated: true,
            hide: !user.isActivate,
        });

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
                        <div className="text">Activate</div>
                        <div className="login">
                            <p className={classNamesLoading}>Activating</p>
                            <p className={classNamesActivate}>User activated</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ActivatePage.propTypes = {
    user: PropTypes.object.isRequired,
};

export default ActivatePage;

