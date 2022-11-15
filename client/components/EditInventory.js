import React, { Component } from "react";
import { editInventory } from "../store/inventory";
import { connect } from "react-redux";
import TableCell from "@material-ui/core/TableCell";

class EditInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.product.name,
      imageUrl: this.props.product.imageUrl,
      price: this.props.product.price,
      quantity: this.props.product.quantity,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.editInventory({ ...this.props.product, ...this.state });
    this.props.onClickUpdate();
  }

  handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { name, imageUrl, price, quantity } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <>
        <TableCell component="th" scope="row">
          <input name="name" value={name} onChange={handleChange} />
        </TableCell>

        <TableCell align="right">
          <input name="imageUrl" value={imageUrl} onChange={handleChange} />
        </TableCell>

        <TableCell align="right">
          <input name="price" value={price} onChange={handleChange} />
        </TableCell>

        <TableCell align="right">
          <input name="quantity" value={quantity} onChange={handleChange} />
        </TableCell>

        <TableCell align="right"></TableCell>

        <TableCell align="right">
          <button onClick={handleSubmit} type="submit">
            Update
          </button>
        </TableCell>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  editInventory: (inventory) => dispatch(editInventory(inventory)),
});

export default connect(null, mapDispatchToProps)(EditInventory);
