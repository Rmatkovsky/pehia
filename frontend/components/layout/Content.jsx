import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import MenuLeftComponent from '../../components/explore/MenuLeft';
import InternationalADSComponent from '../../components/explore/InternationalADS';
import BlockADVComponent from '../../components/explore/BlockADV';
import UserProfileComponent from '../../components/user/Profile';

import ModalContainer from '../../containers/modal/Modal.container';


import logo from '../../assets/images/logo.png';

class Content extends Component {
    renderContainerModal() {
        const {
            modal,
            handleCloseModal,
        } = this.props;

        return modal.open
            ? <ModalContainer
              key={modal.data.key}
              modal={modal}
              handleCloseModal={handleCloseModal}
            />
            : null;
    }

    render() {
        const {
            user,
            modal,
            children,
        } = this.props;

        const appContentClassNames = classnames({
            'app-content': true,
            'full-screen': modal.expand,
        });

        return (
            <div className={appContentClassNames}>
                <div className="bg">
                    <div className="content">
                        <div className="header">
                            <div className="responsive" />
                            <div className="logo">
                                <a href="/"><img src={logo} width="32" height="32" alt="" /></a>
                            </div>
                            <div className="search_box">
                                <form method="" className="search">
                                    <input type="submit" value="" />
                                    <input type="text" value="Search" />
                                </form>
                            </div>
                        </div>
                        <MenuLeftComponent />
                        {children}
                        <div className="right">
                            <UserProfileComponent user={user} />
                            <h3>International Ads</h3>
                            <div className="scrollbar">
                                <InternationalADSComponent />
                                <InternationalADSComponent />
                                <InternationalADSComponent />

                                <BlockADVComponent />

                                <InternationalADSComponent />
                                <InternationalADSComponent />
                                <InternationalADSComponent />


                            </div>
                        </div>
                    </div>
                </div>
                {this.renderContainerModal()}
            </div>
        );
    }
}

Content.propTypes = {
    user: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default Content;
