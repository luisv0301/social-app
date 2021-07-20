import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUser } from "../context/UserProvider";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useUser();
  return (
    <Route
      {...rest}
      render={() => (user ? <Component /> : <Redirect to="/login" />)}
    />
  );
}
