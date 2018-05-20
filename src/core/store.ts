import {RouterAction, routerMiddleware as reactRouterReduxMiddleware} from 'react-router-redux';
import {applyMiddleware, createStore, compose, Dispatch} from 'redux';
import {Action} from 'redux-act';
import createSagaMiddleware, {END} from 'redux-saga';

import {history} from 'config';

import rootReducer, {RootState} from './rootReducer';
import SagaManager, {rootSaga} from './rootSaga';

const routerMiddleware = reactRouterReduxMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

export {RootState, Dispatch};

declare const __DEV__: boolean;

export default () => {
  // STORE CONFIGURATIONS
  const storeEnhancers: any = [];
  const middlewares: any = [routerMiddleware, sagaMiddleware];

  // apply middlewares
  storeEnhancers.push(applyMiddleware(...middlewares));

  // add dev-tools storeEnhancer
  if (__DEV__) {
    const debugEnhancer =
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__();
    storeEnhancers.push(debugEnhancer);
  }

  const store = {
    ...createStore<RootState>(rootReducer, compose(...storeEnhancers)),
    startAbortableSaga: () => SagaManager.startSaga(sagaMiddleware),
  };

  // enable hot reload
  if (__DEV__ && module.hot) {
    module.hot.accept('./rootReducer', () =>
      store.replaceReducer(require('./rootReducer').default),
    );

    module.hot.accept('./rootSaga', () => {
      SagaManager.cancelSaga(store);
      require('./rootSaga').default.startSaga(sagaMiddleware); // eslint-disable-line global-require
    });
  }

  return store;
};
