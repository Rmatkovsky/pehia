import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import {
    openModal,
    closeModal,
} from '../../actions/common.actions';

import {
    getLogginedUser,
} from '../../actions/user.actions';

import Content from '../../components/layout/Content';
import LandingContent from '../../components/layout/LandingContent';

import '../../assets/stylesheets/index.sass';

class Layout extends Component {
    static childContextTypes = {
        handleOpenModal: PropTypes.func,
        handleCloseModal: PropTypes.func,
    };

    constructor() {
        super();
        this.state = {
            landing: [
                '/',
                '/login',
                '/signup',
                '/activate',
            ],
            isLanding: true,
        };
    }

    getChildContext() {
        const { handleOpenModal, handleCloseModal } = this.props;
        return {
            handleOpenModal,
            handleCloseModal,
        };
    }

    componentWillMount() {
        const { landing } = this.state;
        const { location: { location }, handleGetLogginedUser } = this.props;
        const isLanding = landing.indexOf(location.pathname) !== -1;

        handleGetLogginedUser();
        this.setState({ isLanding });
    }

    render() {
        const {
            user,
            children,
            modal,
            handleCloseModal,
        } = this.props;
        const { isLanding } = this.state;

        // remove children property to avoid recursive children nesting
        const shallowProps = { ...this.props };
        delete shallowProps.children;

        return (
            <div
              className="app-layout"
              onClick={this.handleCloseMenu}
            >
                {
                    !isLanding
                    ?
                        <Content
                          user={user}
                          modal={modal}
                          handleCloseModal={handleCloseModal}
                        >
                            {React.cloneElement(children)}
                        </Content>
                    :
                        <LandingContent
                          modal={modal}
                          handleCloseModal={handleCloseModal}
                        >
                            {React.cloneElement(children)}
                        </LandingContent>
                }
            </div>
        );
    }
}


Layout.propTypes = {
    user: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleGetLogginedUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    modal: state.common.modal,
    ...ownProps,
});

const mapDispatchToProps = (dispatch, location) => ({
    location,
    handleGetLogginedUser: bindActionCreators(getLogginedUser, dispatch),
    handleOpenModal: bindActionCreators(openModal, dispatch),
    handleCloseModal: bindActionCreators(closeModal, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
