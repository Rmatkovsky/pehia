import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loginUser, signupUser } from '../../actions/user.actions';
import SignupPage from '../../components/pages/common/Signup.page';

class SignupContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }

    handleSignup(data) {
        const { handleSignupUser } = this.props;
        handleSignupUser(data);
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
            <SignupPage
              user={user}
              onSubmit={this.handleSignup}
              handleFacebookLogin={this.handleFacebookLogin}
              handleGoogleLogin={this.handleGoogleLogin}
            />
        );
    }
}

SignupContainer.propTypes = {
    user: PropTypes.object.isRequired,
    handleLoginedUser: PropTypes.func.isRequired,
    handleSignupUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    handleLoginedUser: bindActionCreators(loginUser, dispatch),
    handleSignupUser: bindActionCreators(signupUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
