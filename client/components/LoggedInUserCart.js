import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import {
  fetchLineItemsForLoggedInUser,
  deleteLineItemForLoggedInUser,
  addLineItemForLoggedInUser,
  subtractLineItemForLoggedInUser,
} from "../store/loggedInUserOrders";
import Confirmation from "./Confirmation";

class LoggedInUserCart extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubtract = this.handleSubtract.bind(this);
  }

  handleDelete(e) {
    const lineItemId = e.target.name;
    this.props.deleteLineItemForLoggedInUser(lineItemId);
  }

  handleAdd(e) {
    const userLineItemId = e.target.name;
    this.props.addLineItemForLoggedInUser(userLineItemId);
  }

  handleSubtract(e) {
    const userLineItemId = e.target.name;
    this.props.subtractLineItemForLoggedInUser(userLineItemId);
  }

  componentDidMount() {
    this.props.fetchLineItemsForLoggedInUser();
  }

  render() {
    const userLineItems = this.props.userLineItems;
    let total = 0;
    userLineItems.forEach((userLineItem) => {
      let currentItemPrice = Number(userLineItem.price);
      let curItemQuantity = userLineItem.qty;
      total += currentItemPrice * curItemQuantity;
    });
    total = total.toFixed(2);

    return (
      <div className="entire-cart">
        <h3>🛒 Shopping Cart 🛒</h3>
        {userLineItems.length === 0 ? null : (
          <div>
            {" "}
            <p>
              <strong className="black">Order Number: </strong>
              {userLineItems[0].orderId}
            </p>
          </div>
        )}
        {/* <p>
          <strong className="black">Order Number: </strong> 
          {userLineItems[0].orderId}
        </p> */}
        <p>
          <strong className="black">Subtotal:</strong> ${total}
        </p>
        <div>
          {userLineItems.map((userLineItem, idx) => {
            return (
              <div className="cart-item" key={idx}>
                <h2>
                  <strong className="black">Item name: </strong>
                  {userLineItem.product.name} 🪴
                </h2>
                <img
                  src={userLineItem.product.imageUrl}
                  className="cart-image"
                />
                <p>
                  <strong className="black">Item Price: </strong> $
                  {userLineItem.price}
                </p>
                <p>
                  <strong className="black">Item Quantity: </strong>{" "}
                  {userLineItem.qty}
                </p>
                <div className="btn btn-primary2">
                  <button
                    className="btn btn-primary2"
                    type="button"
                    name={userLineItem.id}
                    onClick={this.handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary2"
                    type="button"
                    name={userLineItem.id}
                    onClick={this.handleAdd}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-primary2"
                    type="button"
                    name={userLineItem.id}
                    onClick={(e) =>
                      userLineItem.qty == 1
                        ? window.alert(
                            "You cannot reduce the item quantity to less than one.  Please delete an item to remove it from your cart 💚."
                          )
                        : this.handleSubtract(e)
                    }
                  >
                    -
                  </button>
                </div>
                <br></br>
              </div>
            );
          })}
        </div>
        <br></br>
        <Link to="/confirmation">
          {" "}
          <button className="btn btn-primary">Purchase</button>
        </Link>
        <Route path="/confirmation" component={Confirmation} />
        <br></br>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLineItems: state.loggedInUser,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchLineItemsForLoggedInUser: () =>
      dispatch(fetchLineItemsForLoggedInUser()),
    deleteLineItemForLoggedInUser: (lineItemId) => {
      dispatch(deleteLineItemForLoggedInUser(lineItemId));
    },
    addLineItemForLoggedInUser: (lineItemId) => {
      dispatch(addLineItemForLoggedInUser(lineItemId));
    },
    subtractLineItemForLoggedInUser: (lineItemId) => {
      dispatch(subtractLineItemForLoggedInUser(lineItemId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(LoggedInUserCart);
