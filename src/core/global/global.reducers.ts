import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';

import {actions} from './global.actions';

const initialState = {
  loading: false,
  title: '',
};

const loading = createReducer({}, initialState.loading)
  .on(actions.showLoading, (state) => true)
  .on(actions.hideLoading, (state) => false);

const title = createReducer({}, initialState.title).on(
  actions.setTitle,
  (state, payload) => payload,
);

export const app = combineReducers<typeof initialState>({loading, title});
