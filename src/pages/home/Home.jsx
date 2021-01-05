import React from "react";
import { useSelector, connect } from "react-redux";
import { Button } from "@material-ui/core";

import { actions as authActions } from "../../store/ducks/auth.duck";

const HomePage = ({ logout }) => {
  const { authToken, user } = useSelector(({ auth }) => ({
    authToken: auth.authToken,
    user: auth.user
  }));

  return (
    <div>
      Home
      <Button variant="contained" color="primary" onClick={logout}>
        Выход
      </Button>
    </div>
  );
}

const connector = connect(null, {
  logout: authActions.logout
});

export default connector(HomePage);