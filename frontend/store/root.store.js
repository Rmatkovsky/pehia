import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/root.reducer';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const loggerMiddleware = require('redux-logger')();

    middlewares.push(loggerMiddleware);
}

// ## Redux DevTools enabling
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middlewares))(createStore);

function configureStore(initialState) {
    const store = createStoreWithMiddleware(
        rootReducer,
        initialState,
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/root.reducer.js', () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
}

const DEFAULT_STATE = {};
const store = configureStore(DEFAULT_STATE);

export default store;
