import axios from "axios";

const GET_INVENTORY = "GET_INVENTORY";
const CREATE_INVENTORY = "CREATE_INVENTORY";

export const _getInventory = (inventory) => {
  return {
    type: GET_INVENTORY,
    inventory,
  };
};

export const _createInventory = (inventory) => {
  return {
    type: CREATE_INVENTORY,
    inventory,
  };
};

export const getInventory = () => {
  return async (dispatch) => {
    try {
      const { data: inventory } = await axios.get("/api/products");
      dispatch(_getInventory(inventory));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export const createInventory = (inventory) => {
  return async (dispatch) => {
    const { data: created } = await axios.post("/api/products", inventory);
    dispatch(_createInventory(created));
  };
};

const initialState = [];

export default function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY:
      return action.inventory;
    case CREATE_INVENTORY:
      return [...state, action.inventory];
    default:
      return state;
  }
}
