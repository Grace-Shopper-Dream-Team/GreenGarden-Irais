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
    const products = this.props.products;
    // console.log("------->", products);

    // const image = "../../public/assets/HomeCoverPic2.png";
    // const image = HomeCoverPic;

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
        <div className="container text-center">
          <h3>What's Trending</h3>
          <div className="all-products-view">
            {products.map((product) => (
              <div key={product.id} className="all-products-tile">
                <h3>{product.name}</h3>
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
