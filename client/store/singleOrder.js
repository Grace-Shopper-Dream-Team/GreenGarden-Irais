import axios from "axios";

// ACTION TYPES
const SET_SINGLE_ORDER = "SET_SINGLE_ORDER";
const CREATE_SINGLE_ORDER = "CREATE_SINGLE_ORDER";

// ACTION CREATORS
export const setSingleOrder = (order) => {
  return {
    type: SET_SINGLE_ORDER,
    order,
  };
};

export const _createSingleOrder = (product) => {
  return {
    type: CREATE_SINGLE_ORDER,
    product,
  };
};

// THUNKS
export const fetchSingleOrder = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`);
      dispatch(setSingleOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createSingleOrder = (product, orderId) => {
  product.orderId = orderId;
  console.log("ORDER ID", orderId);
  console.log("PRODUCT", product);
  return async (dispatch) => {
    const { data } = await axios.post(`/api/orders`, product);
    dispatch(_createSingleOrder(data));
  };
};

// REDUCERS
const initialState = {
  userId: "",
  email: "",
  status: "",
  orderDate: "",
};

export default function singleOrderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_ORDER:
      return action.order;
    case CREATE_SINGLE_ORDER:
      return action.product;
    default:
      return state;
  }
}
