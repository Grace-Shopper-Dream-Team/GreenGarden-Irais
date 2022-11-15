import axios from "axios";
import history from "../history";
import { getCurrentOrder } from "./currentOrder";

//Action Types
const GET_ALL_ORDERS = "GET_ALL_ORDERS";

//Action Creators
const _getAllOrders = (orders) => ({ type: GET_ALL_ORDERS, orders });

//Reducer
export default (orders = [], action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders;

    default:
      return orders;
  }
};

//Thunks
export const getAllOrders = (orders) => (dispatch) => {
  return async (dispatch) => {
    const { data: lineItem } = await axios.get("/api/orders/:orderId");
    dispatch(_getAllOrders(orders));
  };
};

export const deleteLineItem = (orderId, lineItemId) => (dispatch) => {
  return async (dispatch) => {
    const { data: orders } = await axios.get("/api/orders/:orderId");
    dispatch(_deleteLineItem(orders));
  };
};
