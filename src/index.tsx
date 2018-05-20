import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {AppContainer} from 'react-hot-loader';

import {App} from './components/App';
import {history} from 'config';
import configStore from 'core/store';

const container = document.getElementById('root');

const store = configStore();
store.startAbortableSaga();

const renderApp = (Component: any) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    container,
  );
};

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const newApp = require('./components/App').App;
    renderApp(newApp);
  });
}

renderApp(App);
