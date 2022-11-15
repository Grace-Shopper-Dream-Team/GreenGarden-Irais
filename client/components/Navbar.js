import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const renderNav = (handleClick, isLoggedIn, isAdmin) => {
  if (isLoggedIn) {
    if (isAdmin) {
      return (
        <div>
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
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/products">All Products</Link>
          <Link to="/cart/loggedIn">Cart</Link>
        </div>
      );
    }
  }
  return (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/products">All Products</Link>
      <Link to="/cart">Cart</Link>
    </div>
  );
};

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <img
      src="https://media.istockphoto.com/id/1045368942/vector/abstract-green-leaf-logo-icon-vector-design-ecology-icon-set-eco-icon.jpg?s=612x612&w=0&k=20&c=XIfHMI8r1G73blCpCBFmLIxCtOLx8qX0O3mZC9csRLs="
      width="100px"
    ></img>
    <h1 className="logo">
      <Link to="/home">Green Garden</Link>
    </h1>
    {/* <h1 className="pretty-font">Green Garden</h1> */}
    <nav className="nav-elements">
      {" "}
      {renderNav(handleClick, isLoggedIn, isAdmin)}
    </nav>
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
