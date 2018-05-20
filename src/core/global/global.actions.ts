import {createAction} from 'redux-act';

export const actions = {
  showLoading: createAction('app/SHOW_LOADING'),
  hideLoading: createAction('app/HIDE_LOADING'),
  setTitle: createAction<string>('app/SET_TITLE'),
};
