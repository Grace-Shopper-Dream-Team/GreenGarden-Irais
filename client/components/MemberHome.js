import React from "react";
import { connect } from "react-redux";
import GuestHome from "./GuestHome";
import Carousel from "./Carousel";

// CLASS COMPONENT
export const MemberHome = (props) => {
  const { username, isAdmin } = props;

  return isAdmin ? (
    <div>
      <h3>Welcome, Admin {username}</h3>
      <Carousel />
    </div>
  ) : (
    <div>
      <h1>Welcome back, {username}!</h1>
      <GuestHome />
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

export default connect(mapState)(MemberHome);
