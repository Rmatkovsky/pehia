import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserStoreComponent from '../../../components/user/profiServices/Store.component';

class UserStoreContainer extends Component {
    render() {
        return (
            <UserStoreComponent />
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UserStoreContainer);
