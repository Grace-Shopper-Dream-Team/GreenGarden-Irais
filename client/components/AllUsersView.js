import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../store/allUsersView";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const users = this.props.users;
    const isAdmin = this.props.isAdmin;

    return (
      <div>
        {isAdmin ? (
          <>
            <h1>🪴 Users Table 🪴</h1>
            <TableContainer component={Paper} className="inventory-table">
              <Table
                stickyHeader
                aria-label="sticky table"
                className="inventory-admin-access"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Username </TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user.username}
                      </TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : null}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
