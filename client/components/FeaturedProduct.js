import React from "react";
import { connect } from "react-redux";
import { getFeaturedProduct } from "../store/products";
import { Link } from "react-router-dom";

//~~~~> COULDN'T QUITE GET THIS TO WORK. DECIDED TO HARD CODE IT INTO HOME PAGES INSTEAD.
class FeaturedProduct extends React.Component {
  componentDidMount() {
    this.props.getFeaturedProduct();
  }

  render() {
    const ftProduct = this.props.products;
    // console.log("PRODUCTS", this.props);

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

const mapState = (state) => {
  return {
    getFeaturedProduct: state.getFeaturedProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getFeaturedProduct: () => dispatch(getFeaturedProduct()),
  };
};

export default connect(mapState, mapDispatch)(FeaturedProduct);
