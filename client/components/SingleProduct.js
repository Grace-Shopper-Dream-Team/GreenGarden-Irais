import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { createSingleOrder } from "../store/singleOrder";
import {
  createLineItemForLoggedInUser,
} from "../store/loggedInUserOrders";

class SingleProduct extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId);
  }

  render() {
    const product = this.props.product;
    const token = window.localStorage.getItem("token");
    return (
      <div id="single-product" className="column">
        <div id="single-product-detail" className="row">
          <div className="column rm1" key={product.id}>
            <img width="250px" height="250px" src={product.imageUrl} />
            <h1>{product.name}</h1>
            <p>Price: $ {product.price}</p>
            <p>Description: {product.desc}</p>
            <button
              type="button"
              onClick={() => {
                token
                  ? this.props.createLineItemForLoggedInUser(product)
                  : this.props.createSingleOrder(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    product: state.singleProduct,
  };
};
const mapDispatch = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    createSingleOrder: (product) => dispatch(createSingleOrder(product)),
    createLineItemForLoggedInUser: (product) =>
      dispatch(createLineItemForLoggedInUser(product)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
