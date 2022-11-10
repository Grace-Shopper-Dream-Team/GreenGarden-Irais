import axios from "axios";
import history from "../history";
import { getCurrentOrder } from "./currentOrder";

//TODO: Pair program this with someone. Not sure if I did it right.

//Action Types
const GET_ALL_ORDERS = "GET_ALL_ORDERS";
const REMOVE_ORDER = "REMOVE_ORDER";
// const ADD_ORDER = "ADD_ORDER";
// const UPDATE_ORDER = "UPDATE_ORDER";

//Action Creators
const getAllOrders = (orders) => ({ type: GET_ALL_ORDERS, orders });
const removeOrder = (id) => ({ type: REMOVE_ORDER, id });
// const addOrder = (order) => ({ type: ADD_ORDER, order });
// const updateOrder = (order) => ({ type: UPDATE_ORDER, order });

//Reducer
export default (orders = [], action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders;
    case REMOVE_ORDER:
      return orders.filter((order) => order.id !== action.orderId);
    //   case ADD_ORDER:
    //     return [...orders, action.order]
    //   case UPDATE_ORDER:
    //     return orders.map(order => (order.id === action.order.id ? action.order : order))
    default:
      return orders;
  }
};

//Thunks
export const fetchOrders = () => (dispatch) => {
  axios
    .get("/api/orders")
    .then((res) => res.data)
    .then((orders) => dispatch(getAllOrders(orders)))
    .catch((err) => console.error("Getting all orders unsuccessful", err));
};

export const deleteLineItem = (orderId, lineItemId) => (dispatch) => {
  axios
    .delete(`/api/orders/${orderId}/lineItems/${lineItemId}`)
    .then(() => dispatch(fetchCurrentOrder(orderId)))
    .catch((err) =>
      console.error(`error deleting line item id ${lineItemId}`, err)
    );
};
