import {routerReducer} from 'react-router-redux';
import {combineReducers, Reducer} from 'redux';

import {app} from 'core/global';

const rootObjReducer = {
  app,
  router: routerReducer,
};

type RootType = typeof rootObjReducer;
type UnboxReducer<T> = T extends Reducer<infer U> ? U : T;

export type RootState = {readonly [P in keyof RootType]: UnboxReducer<RootType[P]>};

export default combineReducers<RootState>(rootObjReducer);
