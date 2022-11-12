import React from "react";
import { connect } from "react-redux";
import { deleteLineItem } from "../store/singleOrder";
import ChangeQuantity from "./ChangeQuantity";

class SingleOrder extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // this.props.getSingleOrder(this.props.currentOrder.id);
    // this.props.getLineItems(this.props.currentOrder.id);
    // console.log(">>>>>>>>>cart props", this.props);
  }

  render() {
    console.log("render props", this.props);
    const order = this.props.currentOrder;
    const lineItems = this.props.currentLineItems;
    const products = this.props.productInfo;
    return (
      <div id="single-product" className="column">
        <div id="single-product-detail" className="row">
          <div className="column rm1" key={order.id}>
            <h1> Shopping Cart</h1>
            <p>Order Number: {order.id}</p>
            {order.id ? (
              lineItems.map((item) => (
                <div key={item.id}>
                  <h2>Product Id: {item.productId}</h2>
                  {/* <img
                    src={products[item.productId - 1].imageUrl}
                    className="cart-image"
                  /> */}
                  <p>Item Price: ${item.price}</p>
                  <ChangeQuantity />
                  <button
                    type="button"
                    onClick={() => {
                      console.log("item", item);
                      console.log("order id", order.id);
                      this.props.deleteLineItem(item, order.id);
                    }}
                  >
                    Delete this item
                  </button>
                </div>
              ))
            ) : (
              <h2>Your Cart is Empty 🛒</h2>
            )}
            {/* {order.orderId ? (
              <div>
                <p>Order Number: {order.orderId}</p>
                <p>Price: $ {order.price}</p>
                <p>Quantity: {order.qty}</p>
              </div>
            ) : null} */}
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    currentOrder: state.singleOrder,
    currentLineItems: state.lineItems,
  };
};
const mapDispatch = (dispatch) => {
  return {
    deleteLineItem: (product, orderId) =>
      dispatch(deleteLineItem(product, orderId)),
  };
};

export default connect(mapState, mapDispatch)(SingleOrder);
