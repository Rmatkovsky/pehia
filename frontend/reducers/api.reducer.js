import {
    SET_API_REQUEST,
    SET_API_SUCCESS,
    SET_API_FAILURE,
    SET_API_PAGINATOR,

    CLEAR_API_STATE,
} from '../actions/types/api.types';

// State example
// state = {
//     'GET_POKEMNOS': {
//         loading: { true|false },
//         paginator: {},
//         error: { true|false },
//         status: { Number }
//         payload: { {}|null }
//     },
//     ...
// }

export default (state = {}, action) => {
    switch (action.type) {
        case SET_API_REQUEST:
            return setApiRequest(state, action);

        case SET_API_SUCCESS:
            return setApiSuccess(state, action);

        case SET_API_FAILURE:
            return setApiFailure(state, action);

        case SET_API_PAGINATOR:
            return setApiPaginator(state, action);

        case CLEAR_API_STATE:
            return clearState(state, action);

        default:
            return state;
    }
};

function setApiRequest(state, action) {
    return {
        ...state,
        [action.payload.key]: {
            ...state[action.payload.key],
            loading: true,
        },
    };
}

function setApiSuccess(state, action) {
    return {
        ...state,
        [action.payload.key]: {
            ...state[action.payload.key],
            ...action.payload.value,
            loading: false,
        },
    };
}

function setApiFailure(state, action) {
    return {
        ...state,
        [action.payload.key]: {
            ...state[action.payload.key],
            ...action.payload.value,
            loading: false,
            error: true,
        },
    };
}

function setApiPaginator(state, action) {
    return {
        ...state,
        [action.payload.key]: {
            ...state[action.payload.key],
            paginator: action.payload.value,
        },
    };
}

function clearState(state, action) {
    const shallowState = { ...state };

    delete shallowState[action.payload.key];

    return shallowState;
}

