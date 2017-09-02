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
            locale,
            handleCloseModal,
        } = this.props;
        const { component, classNames } = getContainer(modal.data.key);

        return React.cloneElement(component, {
            ...modal.data,
            ...component.props,
            locale,
            classNames,
            handleCloseModal,
        });
    }
}

ModalContainer.propTypes = {
    modal: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default ModalContainer;

