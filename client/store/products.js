import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';

//ACTION CREATORS
export const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

// THUNKS
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get('/api/products');
      dispatch(_getProducts(products));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
