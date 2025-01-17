import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const products = this.props.products;
    return (
      <div>
        <h3 className='bold'>Check out all of our amazing plants! 🪴</h3>
        <div className="all-products-view">
          {products.map((product) => (
            <div key={product.id} className="all-products-tile">
              <img src={product.imageUrl} className="all-products-thumbnails" />
              <br></br>
              <h5 className='bold'>{product.name}</h5>
              <p>$ {product.price}</p>
              <Link to={`/products/${product.id}`}>
                <button className="btn btn-primary" type="button">
                  View Plant
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
