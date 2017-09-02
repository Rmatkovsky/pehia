import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { handlePush } from '../../utils/history.helper';

import routes from '../../constants/routes.constatnt';

import {
    openModal,
    closeModal,
} from '../../actions/common.actions';


import Content from '../../components/layout/Content';

import '../../assets/stylesheets/index.sass';

class Layout extends Component {
    render() {
        const {
            children,
            modal,
            handleCloseModal,
        } = this.props;

        // remove children property to avoid recursive children nesting
        const shallowProps = { ...this.props };
        delete shallowProps.children;

        return (
            <div
              className="app-layout"
              onClick={this.handleCloseMenu}
            >
                <Content
                  modal={modal}
                  handleCloseModal={handleCloseModal}
                >
                    {React.cloneElement(children)}
                </Content>
            </div>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    modal: state.common.modal,
    ...ownProps,
});

const mapDispatchToProps = dispatch => ({
    handleOpenModal: bindActionCreators(openModal, dispatch),
    handleCloseModal: bindActionCreators(closeModal, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
