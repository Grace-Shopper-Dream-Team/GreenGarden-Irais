import React from "react";
import { connect } from "react-redux";
import AllProducts from "./AllProducts";
import Carousel from "./Carousel";
// import FeaturedProduct from "./FeaturedProduct";
import { getProducts } from "../store/products";
// import HomeCoverPic from "../../public/assets/HomeCoverPic2.png";

// export const GuestHome = (props) => {
//   return (
//     <div>
//       <h1> Welcome to our store!</h1>
//     </div>
//   );
// };

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     username: state.auth.username,
//   };
// };

// export default connect(mapState)(GuestHome);

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
        <h1> Welcome to our store!</h1>
        <div
          className="home-cover-pic"
          // style={{
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "contain",
          //   height: 600,
          //   width: 600,
          // }}
        >
          Green Garden
          {/* <Link to="/products" className="all-products">
            <button type="button" className="all-products-button-home-page">
              SHOP ALL PLANTS
            </button>
          </Link> */}
          <Carousel />
        </div>

        {/* <h1>Check out all of our amazing plants! 🪴</h1>
        <div key={product.id} className="all-products-tile">
          <h3>{product.name}</h3>
          <img src={product.imageUrl} className="all-products-thumbnails" />
          <p>{product.price}</p>
          <Link to={`/products/${product.id}`}>
            <button type="button">View Plant</button>
          </Link>
        </div> */}
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
