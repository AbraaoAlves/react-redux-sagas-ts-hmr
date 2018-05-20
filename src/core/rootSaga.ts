import {RootState} from './rootReducer';
import {spawn, take, cancel, fork, Effect, ForkEffect} from 'redux-saga/effects';

import {appSagas} from 'core/global';
import {SagaMiddleware} from 'redux-saga';
import {Store} from 'react-redux';

declare const __DEV__: boolean;
export function* rootSaga() {
  const sagas = [appSagas];
  yield sagas.map((saga) => spawn(saga));
}

const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function createAbortableSaga(saga: any) {
  if (__DEV__) {
    return function* main() {
      const sagaTask = yield fork(saga);
      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  }
  return saga;
}

export default {
  startSaga<T extends object>(sagaMiddleware: SagaMiddleware<T>) {
    return sagaMiddleware.run(createAbortableSaga(rootSaga));
  },
  cancelSaga(store: Store<RootState>) {
    store.dispatch({type: CANCEL_SAGAS_HMR});
  },
};
