import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { createSingleOrder } from "../store/singleOrder";

class SingleProduct extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId);
  }

  render() {
    const product = this.props.product;
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
                this.props.createSingleOrder(product, orderId);
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

let orderId = 10;

const mapDispatch = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    createSingleOrder: (product, orderId) => {
      orderId += 1;
      dispatch(createSingleOrder(product, orderId));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
