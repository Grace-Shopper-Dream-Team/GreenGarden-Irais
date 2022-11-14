import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const renderNav = (handleClick, isLoggedIn, isAdmin) => {
  if (isLoggedIn) {
    if (isAdmin) {
      return (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/users">All Users</Link>
          <Link to="/inventory">Inventory</Link>
        </div>
      );
    } else {
      return (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/products">All Products</Link>
          <Link to="/cart">Cart</Link>
        </div>
      );
    }
  }
  return (
    <div>
      {/* The navbar will show these links before you log in */}
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/products">All Products</Link>
      <Link to="/cart">Cart</Link>
    </div>
  );
};

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <h1>Green Garden</h1>
    <nav>{renderNav(handleClick, isLoggedIn, isAdmin)}</nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
