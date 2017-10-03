import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import ModalContainer from '../../containers/modal/Modal.container';

class LandingContent extends Component {
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
            modal,
            children,
        } = this.props;

        const appContentClassNames = classnames({
            'app-content': true,
            'full-screen': modal.expand,
        });

        return (
            <div className={appContentClassNames}>
                {children}
                {this.renderContainerModal()}
            </div>
        );
    }
}

LandingContent.propTypes = {
    modal: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default LandingContent;
