import axios from "axios";

// action types
const GET_LIKED_ITEMS = "GET_LIKED_ITEMS"
const DELETE_LIKED_ITEM = 'DELETE_LIKED_ITEM'

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


// Thunk
export const getLikedItemsThunk = () => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");
        const { data } = await axios.get(`api/likedItems/${token}`)
        dispatch(getLikedItems(data));
    };
};

export const deleteLikedItemThunk = (productName) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");
        const { data } = await axios.delete(`api/likedItems/delete/${token}/${productName}`)
        dispatch(deleteLikedItems(data));
    };
};

const initialState = []

export default function likedItemsReducer(state = initialState, action) {
    console.log('action.item', action.item)
    console.log('state', state)
    switch (action.type) {
        case GET_LIKED_ITEMS:
            return action.items
        case DELETE_LIKED_ITEM:
            return state.filter((plant) => {
                return plant.name !== action.item.name
            })

        default:
            return state
    }
}