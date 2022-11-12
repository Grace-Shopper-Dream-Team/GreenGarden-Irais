import React from "react";
import { connect } from "react-redux";
import { deleteLineItem } from "../store/singleOrder";
import ChangeQuantity from "./ChangeQuantity";

class SingleOrder extends React.Component {
  constructor() {
    super();
  }

  render() {
    const order = this.props.currentOrder;
    const lineItems = this.props.currentLineItems;
    // const products = this.props.productInfo;
    return (
      <div>
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
              <p>Item Quantity: {item.qty}</p>
              <ChangeQuantity itemInfo={item} />
              <button
                type="button"
                onClick={() => {
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
