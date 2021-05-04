import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
let store = createStore(persistedReducer, composeEnhancers(middleware));
let persistor = persistStore(store);
// sagaMiddleware.run(rootSaga);

export { store, persistor, sagaMiddleware };