import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';
/**
 * Reducers
 */
import common from './common.reducer';
import api from './api.reducer';
import user from './user.reducer';

const rootReducer = combineReducers({
    common,
    api,
    form,
    user,
});

export default rootReducer;
