import axios from "axios";

//TODO: Pair program this with someone. Not sure if I did it right.

// Action Types
const GET_CURRENT_ORDER = "GET_CURRENT_ORDER";

// Action Creators
const _getCurrentOrder = (order) => {
  return { type: GET_CURRENT_ORDER, order };
};

// Reducer
export default (currentOrder = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_ORDER:
      return action.order;
    default:
      return currentOrder;
  }
};

// Thunks
//~~~~> Need to use the Order Id more here?
export const getCurrentOrder = (id) => (dispatch) => {
  return async (dispatch) => {
    const { data: orders } = await axios.get("/api/orders/:orderId");
    dispatch(_getCurrentOrder(orders));
  };
};

//OTHER PROJECT REFERENCE FOR GETCURRENTORDER:

/*
export const fetchCurrentOrder = id => dispatch => {
    axios.get(`/api/orders/${id}`)
    .then(order => dispatch(getCurrentOrder(order.data)))
    .catch(err => console.error(`error fetching product id: ${id}`, err))
}
*/
