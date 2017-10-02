import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loginUser } from '../../actions/user.actions';
import LoginPage from '../../components/pages/common/Login.page';

class LoginContainer extends PureComponent {
    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }

    handleLogin(data) {
        const { handleLoginedUser } = this.props;
        handleLoginedUser(data);
    }

    handleFacebookLogin(data) {
        const { handleLoginedUser } = this.props;
        const { accessToken } = data;
        handleLoginedUser({ facebook: accessToken });
    }

    handleGoogleLogin(data) {
        const { handleLoginedUser } = this.props;
        handleLoginedUser({ google: data.profileObj });
    }

    render() {
        const { user } = this.props;
        return (
            <LoginPage
              user={user}
              onSubmit={this.handleLogin}
              handleFacebookLogin={this.handleFacebookLogin}
              handleGoogleLogin={this.handleGoogleLogin}
            />
        );
    }
}

LoginContainer.propTypes = {
    user: PropTypes.object.isRequired,
    handleLoginedUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    handleLoginedUser: bindActionCreators(loginUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
