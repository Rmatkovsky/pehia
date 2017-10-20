import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    updateUser,
} from '../../actions/user.actions';

import ProfilePage from '../../components/pages/user/Profile.page';

class ProfileContainer extends Component {
    render() {
        const {
            user,
            handleUpdateUser,
        } = this.props;
        return (
            <ProfilePage
              user={user.payload}
              handleUpdateUser={handleUpdateUser}
            />
        );
    }
}

ProfileContainer.propTypes = {
    user: PropTypes.object.isRequired,
    handleUpdateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    modal: state.common.modal,
    ...ownProps,
});

const mapDispatchToProps = dispatch => ({
    handleUpdateUser: bindActionCreators(updateUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
