import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';
/**
 * Reducers
 */
import common from './common.reducer';
import api from './api.reducer';

const rootReducer = combineReducers({
    common,
    api,
    form,
});

export default rootReducer;
