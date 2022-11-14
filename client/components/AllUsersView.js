import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../store/allUsersView";

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const users = this.props.users;
    console.log(users);
    return (
      <div>
        <h1>🪴 Users Table 🪴</h1>
        <div className="all-users-view">
          {users.map((user) => (
            <div key={user.id} className="all-users-tile">
              <h3>User Name: {user.username}</h3>
              <h3>Email: {user.email}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
