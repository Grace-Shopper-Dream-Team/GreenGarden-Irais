import React from "react";
import { connect } from "react-redux";
import AllProducts from "./AllProducts";

/**
 * COMPONENT
 */

export const Home = (props) => {
  const { username, isAdmin } = props;

  return isAdmin ? (
    <div>
      <h3>Welcome, Admin {username}</h3>
    </div>
  ) : (
    <div>
      <h1 className="purple pretty-font">Welcome back, {username}!</h1>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    isAdmin: state.auth.isAdmin,
  };
};

export default connect(mapState)(Home);
