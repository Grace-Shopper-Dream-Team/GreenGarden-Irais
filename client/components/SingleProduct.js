import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { createSingleOrder } from "../store/singleOrder";
import { createLineItem } from "../store/singleOrder";

class SingleProduct extends React.Component {
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
                if (this.props.currentOrder.length === 0) {
                  this.props.createSingleOrder(product);
                } else {
                  this.props.createLineItem(
                    product,
                    this.props.currentOrder.id
                  );
                }
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
    currentOrder: state.singleOrder,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    createSingleOrder: (product) => {
      dispatch(createSingleOrder(product));
    },
    createLineItem: (product, orderId) => {
      dispatch(createLineItem(product, orderId));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
