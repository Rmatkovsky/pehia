import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserAddProductComponent from '../../../components/modal/UserAddProduct.component';

class UserAddProductContainer extends Component {
    render() {
        return (
            <UserAddProductComponent />
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UserAddProductContainer);
