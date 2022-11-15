import axios from "axios";

// Action Types
const GET_CURRENT_ORDER = "GET_CURRENT_ORDER";
const DELETE_LINE_ITEM = "DELETE_LINE_ITEM";

// Action Creators
const _getCurrentOrder = (orderId) => {
  return { type: GET_CURRENT_ORDER, orderId };
};

const _deleteLineItem = (lineItemId) => {
  return { type: DELETE_LINE_ITEM, lineItemId };
};

// Reducer
export default (currentOrder = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_ORDER:
      return action.order;
    case DELETE_LINE_ITEM:
      return state.filter((lineItem) => lineItem.id !== action.lineItem.id);
    default:
      return currentOrder;
  }
};

// Thunks
export const getCurrentOrder = (id) => (dispatch) => {
  return async (dispatch) => {
    const { data: orders } = await axios.get("/api/orders/:orderId");
    dispatch(_getCurrentOrder(orders));
  };
};

export const deleteLineItem = (id) => (dispatch) => {
  return async (dispatch) => {
    const { data: orders } = await axios.delete(`/api/orders/${id}`);
    dispatch(_deleteLineItem(todo));
    history.push("/");
  };
};
