import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getContainer } from '../../constants/modalContainers.constant';

class ModalContainer extends Component {
    constructor() {
        super();
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(e) {
        const { modal, handleCloseModal } = this.props;

        if (e.keyCode === 27 && modal.open) {
            handleCloseModal();
        }
    }

    render() {
        const {
            modal,
            handleCloseModal,
        } = this.props;
        const { component } = getContainer(modal.data.key);

        return (
            <div className="modal">
                <div className="modal-container">
                    <div className="close" onClick={handleCloseModal} />
                    {React.cloneElement(component, {
                        ...modal.data,
                        ...component.props,
                        handleCloseModal,
                    })}
                </div>
            </div>
        );
    }
}

ModalContainer.propTypes = {
    modal: PropTypes.object.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default ModalContainer;

