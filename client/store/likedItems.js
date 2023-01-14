import axios from "axios";

// action types
const GET_LIKED_ITEMS = "GET_LIKED_ITEMS"

// action creators
export const getLikedItems = (items) => {
    return {
        type: GET_LIKED_ITEMS,
        items,
    };

};

// Thunk
export const getLikedItemsThunk = () => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");
        const { data } = await axios.get(`api/likedItems/${token}`)
        dispatch(getLikedItems(data));
    };
};

const initialState = []

export default function likedItemsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LIKED_ITEMS:

            return action.items
        default:
            return state
    }
}