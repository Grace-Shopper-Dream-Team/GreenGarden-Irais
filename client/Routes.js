import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import MemberHome from "./components/MemberHome";
import { me } from "./store";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Confirmation from "./components/Confirmation";
import LoggedInUserCart from "./components/LoggedInUserCart";
import AllUsers from "./components/AllUsersView";
import Inventory from "./components/Inventory";
import SingleOrder from "./components/SingleOrder";
import GuestHome from "./components/GuestHome";
import UserDashboard  from './components/UserDashBoard';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={MemberHome} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/confirmation" component={Confirmation} />
            <Route exact path="/cart/loggedIn" component={LoggedInUserCart} />
            <Route path="/users" component={AllUsers} />
            <Route path="/inventory" component={Inventory} />
            <Route path="/userDashboard" component={UserDashboard} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={GuestHome} />
            <Route path="/home" exact component={GuestHome} />
            <Route path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/confirmation" component={Confirmation} />
            <Route exact path="/cart" component={SingleOrder} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
