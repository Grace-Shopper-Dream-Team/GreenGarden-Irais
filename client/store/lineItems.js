import axios from "axios";

// ACTION TYPES:
const GET_LINE_ITEMS = "GET_LINE_ITEMS";
const CREATE_LINE_ITEM = "CREATE_LINE_ITEM";
const DELETE_LINE_ITEM = "DELETE_LINE_ITEM";

// ACTION CREATORS:
export const _getLineItems = (lineItems) => {
  return {
    type: GET_LINE_ITEMS,
    lineItems,
  };
};

export const _createLineItem = (newItem) => {
  return {
    type: CREATE_LINE_ITEM,
    newItem,
  };
};

// THUNKS:
// Get all line items for an order:
export const getLineItems = (orderId) => {
  return async (dispatch) => {
    try {
      const { data: lineItems } = await axios.get(
        `/api/orders/${orderId}/lineItems`
      );
      console.log("thunk get line items", lineItems);
      dispatch(_getLineItems(lineItems));
    } catch (error) {
      console.error(error);
    }
  };
};

// Create new line item:
export const createLineItem = (newItem, orderId) => {
  return async (dispatch) => {
    const { data: lineItem } = await axios.post(
      `/api/orders/${orderId}/lineItems`,
      newItem
    );
    dispatch(_createLineItem(lineItem));
  };
};

// REDUCER:
export default function lineItemsReducer(state = [], action) {
  switch (action.type) {
    case GET_LINE_ITEMS:
      return action.lineItems;
    case CREATE_LINE_ITEM:
      return action.newItem;
    default:
      return state;
  }
}
