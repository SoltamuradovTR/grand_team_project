import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Main from '../pages/Main';
import Cab from "../pages/Cab";

function Routes() {
  return (
    <Switch>
      <Route exact path='/'>
        <Main/>
      </Route>
        <Route exact path='/cab'>
            <Cab/>
        </Route>
    </Switch>
  );
}

export default Routes;