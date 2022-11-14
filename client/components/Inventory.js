import React from "react";
import { connect } from "react-redux";
import { getInventory } from "../store/inventory";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CreateInventory from "./CreateInventory";

class Inventory extends React.Component {
  constructor() {
    super();
    this.state = {
      hasForm: false,
    };
    this.isClicked = this.isClicked.bind(this);
  }

  componentDidMount() {
    this.props.getInventory();
  }

  isClicked() {
    this.setState({ hasForm: true });
  }

  render() {
    const inventory = this.props.inventory;
    console.log(inventory);
    return (
      <TableContainer component={Paper} className="inventory-table">
        <button type="submit" onClick={this.isClicked}>
          Add Inventory
        </button>
        {this.state.hasForm ? <CreateInventory /> : null}
        <Table
          stickyHeader
          aria-label="sticky table"
          className="inventory-admin-access"
        >
          <TableHead>
            <TableRow>
              <TableCell>Product Name </TableCell>
              <TableCell align="right">Picture</TableCell>
              <TableCell align="right">Price ($)</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((inventory) => (
              <TableRow
                key={inventory.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {inventory.name}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={inventory.imageUrl}
                    className="all-products-thumbnails"
                  />
                </TableCell>
                <TableCell align="right">${inventory.price}</TableCell>
                <TableCell align="right">{inventory.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const mapState = (state) => {
  return {
    inventory: state.inventory,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getInventory: () => dispatch(getInventory()),
  };
};

export default connect(mapState, mapDispatch)(Inventory);
