import React from "react";
import { connect } from "react-redux";
import { getFeaturedProduct } from "../store/products";
import { Link } from "react-router-dom";

//ENDED UP NOT USING THIS PAGE AT ALL
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
    const products = this.props;

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
              <p>$ {ftProduct.price}</p>
              <Link to={`/products/${ftProduct.id}`}>
                <button className="btn btn-primary" type="button">
                  View Plant
                </button>
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
