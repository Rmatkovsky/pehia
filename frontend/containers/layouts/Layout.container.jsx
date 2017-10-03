import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import {
    openModal,
    closeModal,
} from '../../actions/common.actions';

import Content from '../../components/layout/Content';
import LandingContent from '../../components/layout/LandingContent';

import '../../assets/stylesheets/index.sass';

class Layout extends Component {
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

    componentWillMount() {
        const { landing } = this.state;
        const { location: { location } } = this.props;
        const isLanding = landing.indexOf(location.pathname) !== -1;

        this.setState({ isLanding });
    }

    render() {
        const {
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
    location: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    modal: state.common.modal,
    ...ownProps,
});

const mapDispatchToProps = ( dispatch, location) => ({
    location,
    handleOpenModal: bindActionCreators(openModal, dispatch),
    handleCloseModal: bindActionCreators(closeModal, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
