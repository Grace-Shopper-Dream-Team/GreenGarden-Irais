import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteLineItem } from "../store/singleOrder";
import { updateQuantity } from "../store/singleOrder";

class SingleOrder extends React.Component {
  render() {
    const order = this.props.currentOrder;
    const lineItems = this.props.currentLineItems;

    // Calculate cart subtotal
    let total = 0;
    for (let i = 0; i < lineItems.length; i++) {
      let currentPrice = Number(lineItems[i].price);
      let currentQty = lineItems[i].qty;
      total += currentPrice * currentQty;
    }
    total = total.toFixed(2);

    return (
      <div>
        <h1> Shopping Cart</h1>
        {order.id ? (
          <div>
            <p>
              <strong className="black">Order Number: </strong>
              {order.id}
            </p>
            <p>
              <strong className="black">Subtotal: $ </strong>
              {total}
            </p>
          </div>
        ) : null}
        {order.id ? (
          lineItems.map((item) => (
            <div key={item.id}>
              {item.product ? (
                <div>
                  <h2>
                    <strong className="black">Item name:</strong>{" "}
                    {item.product.name}
                  </h2>
                  <img src={item.product.imageUrl} className="cart-image" />
                </div>
              ) : null}
              <p>
                <strong className="black">Item Price: $ </strong>
                {item.price}
              </p>
              <p>
                <strong className="black">Item Quantity: </strong> {item.qty}
              </p>
              <button
                type="button"
                onClick={() => {
                  this.props.deleteLineItem(item, order.id);
                }}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => {
                  let addOne = item.qty + 1;
                  this.props.updateQuantity({
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
                onClick={() => {
                  if (item.qty === 1) {
                    window.alert(
                      "You cannot reduce the item quantity to less than one.  Please delete an item to remove it from your cart 💚."
                    );
                  } else {
                    let minusOne = item.qty - 1;
                    this.props.updateQuantity({
                      id: item.id,
                      orderId: item.orderId,
                      qty: minusOne,
                    });
                  }
                }}
              >
                -
              </button>
            </div>
          ))
        ) : (
          <h2>Your Cart is Empty 🛒</h2>
        )}
        {order.id ? (
          <div>
            <Link to={"/confirmation"}>
              <button className="login">Purchase</button>
            </Link>
          </div>
        ) : null}
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
