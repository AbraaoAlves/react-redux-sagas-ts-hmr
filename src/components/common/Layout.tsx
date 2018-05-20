import * as React from 'react';
import {SFC} from 'react';
import {Link} from 'react-router-dom';

export const Layout: SFC<{}> = ({children}) => (
  <div>
    <ul className="nav">
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/data">Data</Link>
      </li>
    </ul>

    <main>{children}</main>
  </div>
);
