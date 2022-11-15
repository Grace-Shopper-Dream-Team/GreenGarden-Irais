import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";
import GuestHome from "./GuestHome";

// CLASS COMPONENT
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <h3>Welcome, {username}.</h3>
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
  };
};

export default connect(mapState)(Home);
