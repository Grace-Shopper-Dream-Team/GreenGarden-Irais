import axios from "axios";

const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";

export const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(setSingleProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function singleProductReducer(state = {}, action) {
  // console.log("action obj for single product", action)
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
