import React from "react";
import { connect } from "react-redux";
import { getFeaturedProduct } from "../store/products";
import { Link } from "react-router-dom";

class FeaturedProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const ftProduct = this.props.products;
    // console.log("PRODUCTS", this.props);
    const products = this.props;
    console.log("------->", products);

    return (
      <div>
        <h1>Featured Plant 🪴</h1>
        <div className="featured-product">
          {
            <div key={ftProduct.id} className="all-products-tile">
              <h3>{ftProduct.name}</h3>
              <img
                src={ftProduct.imageUrl}
                className="all-products-thumbnails"
              />
              <p>{ftProduct.price}</p>
              <Link to={`/products/${ftProduct.id}`}>
                <button type="button">View Plant</button>
              </Link>
            </div>
          }
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // username: state.auth.username,
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapState, mapDispatch)(FeaturedProduct);

{
  /* <h1>Check out all of our amazing plants! 🪴</h1>
        <div key={product.id} className="all-products-tile">
          <h3>{product.name}</h3>
          <img src={product.imageUrl} className="all-products-thumbnails" />
          <p>{product.price}</p>
          <Link to={`/products/${product.id}`}>
            <button type="button">View Plant</button>
          </Link>
        </div> */
}
