import axios from "axios";

const GET_INVENTORY = "GET_INVENTORY";
const CREATE_INVENTORY = "CREATE_INVENTORY";
const DELETE_INVENTORY = "DELETE_INVENTORY";
const EDIT_INVENTORY = "EDIT_INVENTORY";

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

const _deleteInventory = (inventory) => {
  return {
    type: DELETE_INVENTORY,
    inventory,
  };
};
const _editInventory = (inventory) => {
  return {
    type: EDIT_INVENTORY,
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

export const deleteInventory = (id) => {
  return async (dispatch) => {
    const { data: inventory } = await axios.delete(`/api/products/${id}`);
    dispatch(_deleteInventory(inventory));
  };
};

export const editInventory = (inventory) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(
      `/api/products/${inventory.id}`,
      inventory
    );
    dispatch(_editInventory(updated));
  };
};

const initialState = [];

export default function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY:
      return action.inventory;
    case CREATE_INVENTORY:
      return [...state, action.inventory];
    case DELETE_INVENTORY:
      return state.filter((product) => product.id !== action.inventory.id);
    case EDIT_INVENTORY:
      return [
        ...state.map((inventory) => {
          if (inventory.id === action.inventory.id) {
            return action.inventory;
          } else {
            return inventory;
          }
        }),
      ];

    default:
      return state;
  }
}
