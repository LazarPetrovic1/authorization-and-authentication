import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import "./App.css";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "./context/AuthContext";

function App(props) {
  let auth = new Auth(props.history);
  const [tokenRenewal, setTokenRenewal] = useState(false);

  useEffect(() => {
    auth.renewToken();
    setTokenRenewal(true);
  });

  if (!tokenRenewal) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />
        <div style={{ padding: "0 47px" }}>
          <Route
            path="/"
            exact
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => <Callback auth={auth} {...props} />}
          />
          <PrivateRoute path="/private" component={Private} />
          <PrivateRoute
            path="/courses"
            component={Courses}
            scopes={["read:courses"]}
          />
          <Route path="/public" component={Public} />
          <PrivateRoute path="/profile" component={Profile} />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
