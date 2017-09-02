import {
    OPEN_MODAL,
    EXPAND_MODAL,
    SHRINK_MODAL,
    CLOSE_MODAL,
} from '../actions/types/modal.types';

const DEFAULT_STATE = {
    modal: {
        open: false,
        expand: false,
        data: {},
    },
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case OPEN_MODAL:
            return reduceOpenModal(state, action);

        case EXPAND_MODAL:
            return reduceExpandModal(state);

        case SHRINK_MODAL:
            return reduceShrinkModal(state);

        case CLOSE_MODAL:
            return reduceCloseModal();

        default:
            return state;
    }
};

function reduceOpenModal(state, action) {
    return {
        ...state,
        modal: {
            ...state.modal,
            open: true,
            data: { ...action.payload },
        },
    };
}

function reduceExpandModal(state) {
    return {
        ...state,
        modal: {
            ...state.modal,
            expand: true,
        },
    };
}

function reduceShrinkModal(state) {
    return {
        ...state,
        modal: {
            ...state.modal,
            expand: false,
        },
    };
}

function reduceCloseModal(state) {
    return {
        ...state,
        modal: { ...DEFAULT_STATE.modal },
    };
}
