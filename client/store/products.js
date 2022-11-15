import axios from "axios";

// TODO: Delete all Get featured product stuff if it doesn't work
const GET_PRODUCTS = "GET_PRODUCTS";
// const GET_FEATURED_PRODUCT = "GET_FEATURED_PRODUCT";

//ACTION CREATORS
export const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

// export const _getFeaturedProduct = (products) => {
//   return {
//     type: GET_FEATURED_PRODUCT,
//     products,
//   };
// };

// THUNKS
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products");
      dispatch(_getProducts(products));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

// export const getFeaturedProduct = () => {
//   return async (dispatch) => {
//     try {
//       const { data: products } = await axios.get("/api/products");
//       dispatch(_getFeaturedProduct(products));
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };
// };

// REDUCERS
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    // case GET_FEATURED_PRODUCT:
    //   return action.products;
    default:
      return state;
  }
}
