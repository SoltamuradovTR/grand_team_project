import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Main from '../pages/Main';

function Routes(props) {
  return (
    <Switch>
      <Route exact path='/'>
        <Main/>
      </Route>
    </Switch>
  );
}

export default Routes;