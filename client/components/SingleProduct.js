import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { createSingleOrder } from "../store/singleOrder";
import { createLineItemForLoggedInUser } from "../store/loggedInUserOrders";

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
    // added line items here - irais
    const userLineItems = this.props.userLineItems;
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
                if (token) {
                  // added here check for duplicating cart -irais
                  if (userLineItems.includes(product.name)) {
                    window.alert(
                      "This item is already in your cart. Please go to your cart to change the quantity 💚."
                    );
                  } else {
                    this.props.createLineItemForLoggedInUser(product);
                  }
                } else {
                  this.props.createSingleOrder(product);
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
    //added this need line items here -irais
    userLineItems: state.loggedInUser.map((item) => item.product.name),
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
