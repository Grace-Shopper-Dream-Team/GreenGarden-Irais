import React from "react";
import { connect } from "react-redux";
import { fetchSingleOrder } from "../store/singleOrder";

class SingleOrder extends React.Component {
  constructor() {
    super();
  }

  render() {
    const order = this.props.order;
    return (
      <div id="single-product" className="column">
        <div id="single-product-detail" className="row">
          <div className="column rm1" key={order.id}>
            <h1> Shopping Cart</h1>
            {order.orderId ? ( <div><p>Order Number: {order.orderId}</p>
            <p>Price: $ {order.price}</p>
            <p>Quantity: {order.qty}</p></div>): null }
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    order: state.singleOrder,
  };
};
const mapDispatch = (dispatch) => {
  return {
    getSingleOrder: (id) => dispatch(fetchSingleOrder(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleOrder);
