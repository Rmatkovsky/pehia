import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';

import {
    USER_ACTIVATE,
    GET_USER,
    GET_LOGGINED_USER,
    CREATE_USER,
    LOGIN_USER,
    CLEAR_DATA_STATE,
    UPDATE_USER,
} from '../actions/types/user.types';

const DEFAULT_STATE = {
    payload: {},
    error: false,
    errorData: {},
    isAuthorized: false,
    isCreated: false,
    isActivate: false,
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case GET_USER:
        case LOGIN_USER:
        case GET_LOGGINED_USER:
        case UPDATE_USER:
            return getUser(state, action);
        case CREATE_USER:
            return createUser(state, action);
        case USER_ACTIVATE:
            return userActivate(state, action);
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
        isAuthorized: !action.error,
    };
}

function userActivate(state, action) {
    return {
        ...state,
        isActivate: action,
    };
}

function clearDataState() {
    return {
        ...DEFAULT_STATE,
    };
}
