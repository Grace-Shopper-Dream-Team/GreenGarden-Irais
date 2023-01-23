import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteLineItem } from "../store/singleOrder";
import { updateQuantity } from "../store/singleOrder";

class SingleOrder extends React.Component {
  constructor() {
    super();
    // this.checkout = this.checkout.bind(this)
  }
  // checkout() {
  //   console.log('in checkout')
  //   fetch('/create-checkout-session', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       items: [
  //         { id: 1, quantity: 3 },
  //         { id: 2, quantity: 1 }
  //       ],
  //     })
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         console.log('in res,ok', window.location)
  //         return res.json()
  //       }
  //       return res.json().then(json => Promise.reject(json))
  //     })
  //     .then(({ url }) => {
  //       console.log('HOLA')
  //       window.location = url
  //     })
  //     .catch(e => {
  //       console.error(e.error)
  //     })
  // }
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
      <div className="entire-cart">
        <h3 className="bold">🛒 Shopping Cart 🛒</h3>
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
            <div className="cart-item" key={item.id}>
              {item.product ? (
                <div>
                  <h5>
                    <strong className="black">Item name:</strong>{" "}
                    {item.product.name}
                  </h5>
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
              <div className="btn btn-primary2">
                <button
                  className="btn btn-primary2"
                  type="button"
                  onClick={() => {
                    this.props.deleteLineItem(item, order.id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary2"
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
                  className="btn btn-primary2"
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
              <br></br>
            </div>
          ))
        ) : (
          <h3 className="bold">Your Cart is Empty 😭</h3>
        )}
        {order.id ? (
          <div>
            <Link to={"/confirmation"}>
              <button className="btn btn-primary" onClick={this.checkout}>
                Checkout
              </button>
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
