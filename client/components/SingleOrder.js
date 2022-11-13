import React from "react";
import { connect } from "react-redux";
import { deleteLineItem } from "../store/singleOrder";
import { updateQuantity } from "../store/singleOrder";

class SingleOrder extends React.Component {
  render() {
    console.log("render props", this.props);
    const order = this.props.currentOrder;
    const lineItems = this.props.currentLineItems;
    return (
      <div>
        <h1> Shopping Cart</h1>
        <p>Order Number: {order.id}</p>
        <p>Subtotal: </p>
        {order.id ? (
          lineItems.map((item) => (
            <div key={item.id}>
              {item.product ? (
                <div>
                  <h2>Item: {item.product.name}</h2>
                  <img src={item.product.imageUrl} className="cart-image" />
                </div>
              ) : null}
              <p>Item Price: ${item.price}</p>
              <p>Item Quantity: {item.qty}</p>
              <button
                type="button"
                onClick={async () => {
                  await this.props.deleteLineItem(item, order.id);
                }}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={async () => {
                  let addOne = item.qty + 1;
                  await this.props.updateQuantity({
                    id: item.id,
                    orderId: item.orderId,
                    qty: addOne,
                  });
                }}
              >
                +
              </button>
              <button
                type="button"
                onClick={async () => {
                  let minusOne = item.qty - 1;
                  await this.props.updateQuantity({
                    id: item.id,
                    orderId: item.orderId,
                    qty: minusOne,
                  });
                }}
              >
                -
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
    products: state.products,
  };
};
const mapDispatch = (dispatch) => {
  return {
    deleteLineItem: (product, orderId) =>
      dispatch(deleteLineItem(product, orderId)),
    updateQuantity: (lineItem) => dispatch(updateQuantity(lineItem)),
  };
};

export default connect(mapState, mapDispatch)(SingleOrder);
