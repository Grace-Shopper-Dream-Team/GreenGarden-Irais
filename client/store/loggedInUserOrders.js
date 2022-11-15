import axios from "axios";

// Action Types
const CREATE_LINE_ITEM_LOGGED_IN_USER = "CREATE_LINE_ITEM_LOGGED_IN_USER";
const FETCH_LINE_ITEMS_FOR_LOGGED_IN_USER =
  "FETCH_LINE_ITEMS_FOR_LOGGED_IN_USER";
const DELETE_LINE_ITEM = "DELETE_LINE_ITEM";
const ADD_TO_LINE_ITEM_QUANTITY = "ADD_TO_LINE_ITEM_QUANTITY";
const SUBTRACT_FROM_LINE_ITEM_QUANTITY = "SUBTRACT_FROM_LINE_ITEM_QUANTITY";

// Action creators
export const createLineItemForLoggedInUserCreator = (product) => {
  return {
    type: CREATE_LINE_ITEM_LOGGED_IN_USER,
    product,
  };
};

export const fetchLineItemsForLoggedInUserCreator = (usersLineItems) => {
  return {
    type: FETCH_LINE_ITEMS_FOR_LOGGED_IN_USER,
    usersLineItems,
  };
};

export const deleteLineItemsForLoggedInUserCreator = (deletedItem) => {
  return {
    type: DELETE_LINE_ITEM,
    deletedItem,
  };
};

export const addToLineItemsForLoggedInUserCreator = (updatedItem) => {
  return {
    type: ADD_TO_LINE_ITEM_QUANTITY,
    updatedItem,
  };
};

export const subtractFromLineItemsForLoggedInUserCreator = (updatedItem) => {
  return {
    type: SUBTRACT_FROM_LINE_ITEM_QUANTITY,
    updatedItem,
  };
};

// Thunks
export const createLineItemForLoggedInUser = (product) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    product.token = token;
    const { data } = await axios.post(`/api/orders/loggedIn`, product);
    dispatch(createLineItemForLoggedInUserCreator(data));
  };
};

export const fetchLineItemsForLoggedInUser = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const { data } = await axios.get(`/api/orders/loggedIn/${token}`);
    dispatch(fetchLineItemsForLoggedInUserCreator(data));
  };
};

export const deleteLineItemForLoggedInUser = (lineItemId) => {
  return async (dispatch) => {
    const { data } = await axios.delete(`/api/orders/loggedIn/${lineItemId}`);
    dispatch(deleteLineItemsForLoggedInUserCreator(data));
  };
};

export const addLineItemForLoggedInUser = (lineItemId) => {
  return async (dispatch) => {
    const { data } = await axios.put(
      `/api/orders/loggedIn/addTo/${lineItemId}`
    );
    dispatch(addToLineItemsForLoggedInUserCreator(data));
  };
};

export const subtractLineItemForLoggedInUser = (lineItemId) => {
  return async (dispatch) => {
    const { data } = await axios.put(
      `/api/orders/loggedIn/subtract/${lineItemId}`
    );
    dispatch(subtractFromLineItemsForLoggedInUserCreator(data));
  };
};

const initialState = [];

export default function loggedInUserOrdersReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case CREATE_LINE_ITEM_LOGGED_IN_USER:
      return [...state, action.product];
    case FETCH_LINE_ITEMS_FOR_LOGGED_IN_USER:
      return action.usersLineItems;
    case DELETE_LINE_ITEM:
      return state.filter((item) => {
        return item.id !== action.deletedItem.id;
      });
    case ADD_TO_LINE_ITEM_QUANTITY:
      return state.map((item) => {
        if (item.id === action.updatedItem.id) {
          item = action.updatedItem;
          return item;
        }
        return item;
      });
    case SUBTRACT_FROM_LINE_ITEM_QUANTITY:
      return state.map((item) => {
        if (item.id === action.updatedItem.id) {
          item = action.updatedItem;
          return item;
        }
        return item;
      });
    default:
      return state;
  }
}
