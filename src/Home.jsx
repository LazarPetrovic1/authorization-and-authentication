import React from "react";
import { Link } from "react-router-dom";

const btn = {
  outline: "none",
  backgroundColor: "white",
  border: "1px solid black",
  padding: "7px 12px"
}

const Home = props => (
  <div>
    <h1 style={{ color: "red" }}>Home</h1>
    {props.auth.isAuthenticated() ? (
      <Link to="/profile">View profile</Link>
    ) : (
      <button style={btn} onClick={props.auth.login}>Log in</button>
    )}
  </div>
);

export default Home;
