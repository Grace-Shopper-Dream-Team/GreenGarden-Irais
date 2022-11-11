import axios from "axios";

// ACTION TYPES
const SET_SINGLE_ORDER = "SET_SINGLE_ORDER";
const CREATE_SINGLE_ORDER = "CREATE_SINGLE_ORDER";
const CREATE_LINE_ITEM = "CREATE_LINE_ITEM";

// ACTION CREATORS
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

export const _createLineItem = (product) => {
  return {
    type: CREATE_LINE_ITEM,
    product,
  };
};

// THUNKS
export const fetchSingleOrder = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${id}/lineItems`);
      console.log("fetch single order data", data);
      dispatch(setSingleOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createSingleOrder = (product, history) => {
  return async (dispatch) => {
    const { data: newOrder } = await axios.post(`/api/orders`);
    console.log("createSingleOrder thunk data", newOrder);

    const { data: newLineItem } = await axios.post(
      `/api/orders/${newOrder.id}/lineItems`,
      product
    );
    console.log("create order line item", newLineItem);
    dispatch(_createSingleOrder(newOrder));
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

export default function singleOrderReducer(state = [], action) {
  switch (action.type) {
    case SET_SINGLE_ORDER:
      return action.order;
    case CREATE_SINGLE_ORDER:
      return action.order;
    case CREATE_LINE_ITEM:
      return action.product;
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
