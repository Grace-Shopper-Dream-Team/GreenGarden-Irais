import React from "react";
import { connect } from "react-redux";

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
      <h3>Welcome, {username}</h3>
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
