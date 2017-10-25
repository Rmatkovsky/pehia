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
    UPDATE_USER_AVATAR,
    GET_PHOTOS_ME,
    GET_PHOTOS_CLINIC,
    UPLOAD_PHOTO_CLINIC,
} from '../actions/types/user.types';

const DEFAULT_STATE = {
    payload: {},
    ownPhotos: [],
    clinicPhotos: [],
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
            return getUser(state, action);
        case UPDATE_USER:
        case UPDATE_USER_AVATAR:
            return updateUser(state, action);
        case CREATE_USER:
            return createUser(state, action);
        case USER_ACTIVATE:
            return userActivate(state, action);
        case GET_PHOTOS_ME:
            return getOwnPhotos(state, action);
        case GET_PHOTOS_CLINIC:
        case UPLOAD_PHOTO_CLINIC:
            return getClinicPhotos(state, action);
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

function updateUser(state, action) {
    return {
        ...state,
        payload: action.error ? state.payload : action.payload,
        error: action.error,
        errorData: action.error ? action.payload : false,
        meta: action.meta,
    };
}

function userActivate(state, action) {
    return {
        ...state,
        isActivate: action,
    };
}

function getOwnPhotos(state, action) {
    return {
        ...state,
        ownPhotos: [...action.payload],
    };
}

function getClinicPhotos(state, action) {
    return {
        ...state,
        clinicPhotos: [...action.payload],
    };
}

function clearDataState() {
    return {
        ...DEFAULT_STATE,
    };
}
