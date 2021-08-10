import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "../pages/Main";
import Cab from "../pages/Cab";
import ClientRequest from "./ClientComponents/ClientRequest";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route exact path="/cab">
        <Cab />
      </Route>
      <Route exact path={`/request/:id`}>
        <ClientRequest />
      </Route>
    </Switch>
  );
}

export default Routes;
