import axios from "axios";

// ACTION TYPES
const SET_SINGLE_ORDER = "SET_SINGLE_ORDER";
const CREATE_SINGLE_ORDER = "CREATE_SINGLE_ORDER";

const GET_LINE_ITEMS = "GET_LINE_ITEMS";
const CREATE_LINE_ITEM = "CREATE_LINE_ITEM";

// ACTION CREATORS
// Orders:
export const setSingleOrder = (order) => {
  return {
    type: SET_SINGLE_ORDER,
    order,
  };
};

export const _createSingleOrder = (order) => {
  return {
    type: CREATE_SINGLE_ORDER,
    order,
  };
};

// original version:
// export const _createSingleOrder = (product) => {
//   return {
//     type: CREATE_SINGLE_ORDER,
//     product,
//   };
// };

// Line Items:
export const _getLineItems = (lineItems) => {
  return {
    type: GET_LINE_ITEMS,
    lineItems,
  };
};

export const _createLineItem = (product) => {
  return {
    type: CREATE_LINE_ITEM,
    product,
  };
};

// THUNKS
// Get order information for a specific order:
export const fetchSingleOrder = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`);
      console.log("fetch single order data", data);
      dispatch(setSingleOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// Create new order and create a new line item with that order id:
export const createSingleOrder = (product, history) => {
  console.log("create order product", product);
  return async (dispatch) => {
    const { data: newOrder } = await axios.post(`/api/orders`);
    console.log("createSingleOrder thunk data", newOrder);

    const { data: newLineItem } = await axios.post(
      `/api/orders/${newOrder.id}/lineItems`,
      product
    );
    // console.log("create order line item", newLineItem);
    dispatch(_createSingleOrder(newOrder));
    dispatch(_createLineItem(newLineItem));

    // history.push(`/cart/${newOrder.id}`);
  };
};

// original version:
// export const createSingleOrder = (product) => {
//   return async (dispatch) => {
//     const { data } = await axios.post(`/api/orders`, product);
//     dispatch(_createSingleOrder(data));
//   };
// };

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

// Create a new line item (without creating an order):
export const createLineItem = (product, orderId) => {
  return async (dispatch) => {
    const { data: lineItem } = await axios.post(
      `/api/orders/${orderId}/lineItems`,
      product
    );
    dispatch(_createLineItem(lineItem));
  };
};

// REDUCERS
// Orders Reducer:
export function singleOrderReducer(state = [], action) {
  switch (action.type) {
    case SET_SINGLE_ORDER:
      return action.order;
    case CREATE_SINGLE_ORDER:
      return action.order;
    // case CREATE_LINE_ITEM:
    //   return action.product;
    default:
      return state;
  }
}

// Line Items Reducer:
export function lineItemsReducer(state = [], action) {
  switch (action.type) {
    case GET_LINE_ITEMS:
      return action.lineItems;
    case CREATE_LINE_ITEM:
      return [...state, action.product];
    default:
      return state;
  }
}

// original version:
// const initialState = {
//   userId: "",
//   email: "",
//   status: "",
//   orderDate: "",
// };
// export default function singleOrderReducer(state = initialState, action) {
//   switch (action.type) {
//     case SET_SINGLE_ORDER:
//       return action.order;
//     case CREATE_SINGLE_ORDER:
//       return action.product;
//     default:
//       return state;
//   }
// }
