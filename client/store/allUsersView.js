import axios from "axios";
const TOKEN = "token";

const GET_USERS = "GET_USERS";

export const _getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get("/api/users", {
        headers: { Authorization: window.localStorage.getItem(TOKEN) },
      });

      dispatch(_getUsers(users));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
}
