import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";
import GuestHome from "./GuestHome";

// CLASS COMPONENT

// //~~~~> NOT SURE WHAT THE DIFF IS BT THIS AND THE CLASS BELOW IT.
// // export const Home = (props) => {
// //   const { username } = props;
// //   // console.log("PRODUCT", product);

// //   return (
// //     <div>
// //       <h3>Welcome, {username}.</h3>
// //       {/* <div key={product.id} className="all-products-tile">
// //         <h3>{product.name}</h3>
// //         <img src={product.imageUrl} className="all-products-thumbnails" />
// //         <p>{product.price}</p>
// //         <Link to={`/products/${product.id}`}>
// //           <button type="button">View Plant</button>
// //         </Link>
// //       </div> */}
// //     </div>
// //   );
// // };

// class Home extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {
//     this.props.getProducts();
//   }
//   render() {
//     //~~~~> * NOT SURE WHY, BUT CAN'T ACCESS THE PRODUCTS HERE LIKE WE DO IN THE ALL PRODUCTS PAGE.
//     const products = this.props;
//     const { username } = this.props;
//     console.log("------->", products);

//     return (
//       <div>
//         <h3>Welcome, {username}.</h3>
//         {/* <h1>Check out all of our amazing plants! 🪴</h1>
//         <div key={product.id} className="all-products-tile">
//           <h3>{product.name}</h3>
//           <img src={product.imageUrl} className="all-products-thumbnails" />
//           <p>{product.price}</p>
//           <Link to={`/products/${product.id}`}>
//             <button type="button">View Plant</button>
//           </Link>
//         </div> */}
//       </div>
//     );
//   }
// }

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     username: state.auth.username,
//     products: state.products,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     getProducts: () => dispatch(getProducts()),
//   };
// };

// export default connect(mapState, mapDispatch)(Home);

// CLASS COMPONENT
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <h3>Welcome, {username}.</h3>
      <GuestHome />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
