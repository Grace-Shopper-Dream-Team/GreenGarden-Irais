import React from "react";
import { connect } from "react-redux";
import AllProducts from "./AllProducts";

/**
 * COMPONENT
 */

export const Home = (props) => {
  const { username } = props;

  return (
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
  };
};

export default connect(mapState)(Home);
