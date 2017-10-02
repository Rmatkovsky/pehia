import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';

import {
    GET_USER,
    CREATE_USER,
    LOGIN_USER,
    CLEAR_DATA_STATE,
} from '../actions/types/user.types';

const DEFAULT_STATE = {
    payload: {},
    error: false,
    errorData: {},
    isAuthorized: false,
    isCreated: false,
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case GET_USER:
        case LOGIN_USER:
            return getUser(state, action);
        case CREATE_USER:
            return createUser(state, action);
        case CLEAR_DATA_STATE:
            return clearDataState();

        default:
            return state;
    }
};

function createUser(state, action) {
    return {
        ...state,
        isCreated: _find(action, 'data') ? action.payload.data.status === 'Created' : false,
    };
}

function getUser(state, action) {
    return {
        ...state,
        payload: action.error ? state.payload : action.payload,
        error: action.error,
        errorData: action.error ? action.payload : false,
        meta: action.meta,
        isAuthorized: !_isEmpty(action.payload),
    };
}

function clearDataState() {
    return {
        ...DEFAULT_STATE,
    };
}
