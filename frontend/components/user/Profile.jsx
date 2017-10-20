import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import routes from '../../constants/routes.constatnt';


class UserProfileComponent extends Component {
    static renderNoLoggined() {
        return (
            <div className="user login">
                <a href={routes.auth.signup()} className="singup">Sing Up</a>
                <a href={routes.auth.login()} className="singin">Sing In</a>
            </div>
        );
    }
    static renderLoggined() {
        return (
            <div className="user">
                <a href="/profile"><img src="https://challenges-app-main.s3.amazonaws.com/uploads/user/avatar/27/thumbnail_18447141_10213624415104525_6243066035151518389_n.jpg" width="32" height="32" alt="" /></a>
                <span className="notification" />
            </div>
        );
    }
    render() {
        const { user } = this.props;

        return user.isAuthorized ? UserProfileComponent.renderLoggined() : UserProfileComponent.renderNoLoggined();
    }
}

UserProfileComponent.propTypes = {
    user: PropTypes.object.isRequired,
};
export default UserProfileComponent;
