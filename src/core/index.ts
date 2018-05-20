import {bindActionCreators} from 'redux';
import {connect as connectRedux} from 'react-redux';
import {RootState, Dispatch} from './store';
import {WebkitAppearanceProperty} from 'csstype';
import {SimpleActionCreator} from 'redux-act';

export * from './store';

type Wrapper = <S, T>(transform: (actionFn: T) => void) => (param: T) => void;

/**
 * This is a helper to avoid write types in param functions. Like this:
 * ```
 * export const Home = connect(
 *    (state: RootState) => ({...state.app}),
 *    (dispatch: Dispatch) => bindActions({...actions}, dispatch),
 * )
 * ```
 * Use like this:
 * `
 * ```
 * export const Home = connect(
 *    (state) => ({...state.app}),
 *    (dispatch) => bindActions({...actions}, dispatch),
 * )
 * ```
 */
export const connect = <S, D, E>(
  mapState: (state: RootState, external?: E) => S = null,
  mapDispatch: (dispatch: Dispatch<any>) => D = null,
) => connectRedux(mapState, mapDispatch);
