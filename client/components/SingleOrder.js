import React from "react";
import { connect } from "react-redux";
import { fetchSingleOrder } from "../store/singleOrder";

class SingleOrder extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getSingleOrder(this.props.match.params.orderId);
    console.log(">>>>>>>>>", this.props);
  }

  render() {
    console.log("render props", this.props);
    const order = this.props.currentOrder;
    return (
      <div id="single-product" className="column">
        <div id="single-product-detail" className="row">
          <div className="column rm1" key={order.id}>
            <h1> Shopping Cart</h1>
            <p>Order Number: {order.orderId}</p>
            {order.length > 0 ? (
              order.map((item) => (
                <div key={item.id}>
                  <h2>Item Id: {item.productId}</h2>
                  <p>Item Price: ${item.price}</p>
                  <p>Item Quantity: {item.qty}</p>
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
  };
};
const mapDispatch = (dispatch) => {
  return {
    getSingleOrder: (id) => dispatch(fetchSingleOrder(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleOrder);
