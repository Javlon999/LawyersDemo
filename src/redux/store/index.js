import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './rootReducer';

const middleware = [thunk];

const createStoreMiddlewares = applyMiddleware(...middleware)(createStore);

const configureStore = (initialState) => createStoreMiddlewares(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION_ && window.__REDUX_DEVTOOLS_EXTENSION_()
);

export default configureStore();