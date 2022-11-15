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
    const products = this.props;
    // console.log("------->", products);

    // const image = "../../public/assets/HomeCoverPic2.png";
    // const image = HomeCoverPic;

    return (
      <div>
        <div>
          <Carousel />
          <Link to="/products" className="all-products">
            <button type="button" className="all-products-button-home-page">
              Shop All Plants
            </button>
          </Link>
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
