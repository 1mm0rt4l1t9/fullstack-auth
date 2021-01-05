import React from 'react';
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage, Login, Registration } from '../pages';

export const Routes = () => {
  const { isAuthorized } = useSelector(({ auth }) => ({
    isAuthorized: auth.authToken !== undefined
  }));

  return (
    <>
      <Switch>
        {isAuthorized ? (
          <Switch>
            <Route path="/home" component={HomePage} exact />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/registr" component={Registration} exact />

            <Redirect to="/login" />
          </Switch>
        )}

        {isAuthorized ? (
          <Redirect from="/" to="/home" />
        ) : (
          <Redirect from="/" to="/login" />
        )}
      </Switch>
    </>
  );
};
