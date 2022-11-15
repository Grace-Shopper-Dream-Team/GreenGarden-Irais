import React from "react";
import { connect } from "react-redux";
import AllProducts from "./AllProducts";
import Carousel from "./Carousel";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";

// CLASS COMPONENT
class GuestHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const slicedProducts = this.props.products.slice(6, 9);
    console.log(slicedProducts);

    return (
      <div>
        <Carousel />
        <div className="container">
          <div className="row">
            <Link to="/products" className="all-products">
              <button type="button" className="btn btn-primary">
                Shop All Plants
              </button>
            </Link>
          </div>
        </div>
        <div className="container">
          <h3>What's Trending</h3>
          <div className="trending-view">
            {slicedProducts.map((product) => (
              <div key={product.id} className="all-products-tile">
                <h5>{product.name}</h5>
                <img
                  src={product.imageUrl}
                  className="all-products-thumbnails"
                />
                <p>{product.price}</p>
                <Link to={`/products/${product.id}`}>
                  <button className="btn btn-primary" type="button">
                    View Plant
                  </button>
                </Link>
              </div>
            ))}
          </div>
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

export default connect(mapState, mapDispatch)(GuestHome);
