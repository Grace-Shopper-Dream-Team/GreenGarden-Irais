import React from "react";
import { connect } from "react-redux";
import { fetchSingleOrder } from "../store/singleOrder";

class SingleOrder extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getSingleOrder(this.props.match.params.orderId);
  }

  render() {
    const order = this.props.order;
    return (
      <div id="single-product" className="column">
        <div id="single-product-detail" className="row">
          <div className="column rm1" key={order.id}>
            <h1> Shopping Cart</h1>
            {/* <img width="250px" height="250px" src={order.imageUrl} /> */}
            {/* <h1>{order.name}</h1>
            <p>Price: $ {order.price}</p>
            <p>Description: {order.desc}</p> */}
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
