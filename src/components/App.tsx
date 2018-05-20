import * as React from 'react';
import {SFC} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Home, About} from 'components/pages';
import {Layout} from 'components/common';

export const App: SFC<{}> = (props) => (
  <Layout>
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/about" component={About} />
      <Redirect to="/home" />
    </Switch>
  </Layout>
);
