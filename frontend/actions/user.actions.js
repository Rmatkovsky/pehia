import api from '../api/config';
import {
    // createAction,
    success,
    failure,
    request,
} from '../utils/actions.helper';
import {
    LOGIN_USER,
    CREATE_USER,
} from './types/user.types';

// import routes from '../constants/routes.constatnt';

import normalizr from '../utils/mappers/user.mapper';

export const loginUser = params => (dispatch) => {
    dispatch(request(LOGIN_USER));
    api.user.loginedUser(params).then(
        response => dispatch(success(LOGIN_USER, normalizr.res.userLoaded(response.data))),
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