import api from '../api/config';
import {
    // createAction,
    success,
    failure,
    request,
} from '../utils/actions.helper';
import {
    USER_ACTIVATE,
    GET_LOGGINED_USER,
    LOGIN_USER,
    CREATE_USER,
    UPDATE_USER,
    UPDATE_USER_AVATAR,
} from './types/user.types';

import { handlePush } from '../utils/history.helper';

import routes from '../constants/routes.constatnt';

import normalizr from '../utils/mappers/user.mapper';

export const activateUser = params => (dispatch) => {
    dispatch(request(USER_ACTIVATE));
    api.user.activateUser(params).then(
        response => dispatch(success(USER_ACTIVATE, normalizr.res.userLoaded(response.data))),
        error => dispatch(failure(USER_ACTIVATE, error)),
    );
};

export const getLogginedUser = () => (dispatch) => {
    dispatch(request(GET_LOGGINED_USER));
    api.user.getUser().then(
        response => dispatch(success(GET_LOGGINED_USER, normalizr.res.userLoaded(response.data))),
        error => dispatch(failure(GET_LOGGINED_USER, error)),
    );
};

export const loginUser = params => (dispatch) => {
    dispatch(request(LOGIN_USER));
    api.user.loginedUser(params).then(
        (response) => {
            dispatch(success(LOGIN_USER, normalizr.res.userLoaded(response.data)));
            window.location.href = routes.explore.explore();
            // handlePush({ pathname: routes.explore.explore() });
        },
        error => dispatch(failure(LOGIN_USER, error)),
    );
};

export const signupUser = params => (dispatch) => {
    dispatch(request(CREATE_USER));
    api.user.signupUser(params).then(
        response => dispatch(success(CREATE_USER, response)),
        error => dispatch(failure(CREATE_USER, error)),
    );
};

export const updateUser = params => (dispatch) => {
    dispatch(request(UPDATE_USER));
    api.user.updateUser(params).then(
        response => dispatch(success(UPDATE_USER, normalizr.res.userLoaded(response.data))),
        error => dispatch(failure(UPDATE_USER, error)),
    );
};

export const updateAvatar = params => (dispatch) => {
    dispatch(request(UPDATE_USER_AVATAR));
    api.user.updateAvatar(params).then(
        response => dispatch(success(UPDATE_USER_AVATAR, normalizr.res.userLoaded(response.data))),
        error => dispatch(failure(UPDATE_USER_AVATAR, error)),
    );
};