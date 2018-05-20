import {bindActionCreators as bindActions} from 'redux';
import * as React from 'react';
import {SFC} from 'react';

import {connect} from 'core';
import {actions} from 'core/global';

export const Home = connect(
  (state) => ({...state.app}),
  (dispatch) => bindActions({...actions}, dispatch),
)(({title, setTitle}) => (
  <div>
    {title}
    <div>
      <label> change title : </label>
      <input type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
    </div>
  </div>
));
