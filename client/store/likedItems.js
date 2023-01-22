import axios from "axios";

// action types
const GET_LIKED_ITEMS = "GET_LIKED_ITEMS";
const DELETE_LIKED_ITEM = "DELETE_LIKED_ITEM";

// action creators
export const getLikedItems = (items) => {
  return {
    type: GET_LIKED_ITEMS,
    items,
  };
};

export const deleteLikedItems = (item) => {
  return {
    type: DELETE_LIKED_ITEM,
    item,
  };
};


// Thunks
export const getLikedItemsThunk = () => {
  try {
    return async (dispatch) => {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get(`api/likedItems/${token}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(getLikedItems(data));
    };
  } catch (error) {
    console.error(error);
  }
};

export const deleteLikedItemThunk = (productName) => {
  try {
    return async (dispatch) => {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.delete(
        `api/likedItems/delete/${token}/${productName}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(deleteLikedItems(data));
    };
  } catch (error) {
    console.error(error);
  }
};

const initialState = [];

export default function likedItemsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIKED_ITEMS:
      return action.items;
    case DELETE_LIKED_ITEM:
      return state.filter((plant) => {
        return plant.name !== action.item.name;
      });

    default:
      return state;
  }
}
