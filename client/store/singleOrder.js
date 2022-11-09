import axios from "axios";

const SET_SINGLE_ORDER = "SET_SINGLE_ORDER";

export const setSingleOrder = (order) => {
  return {
    type: SET_SINGLE_ORDER,
    order,
  };
};

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

const initialState = {
  id: "",
  name: "",
  imageUrl: "",
  price: "",
  description: "",
};

export default function singleOrderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_ORDER:
      return action.order;
    default:
      return state;
  }
}
