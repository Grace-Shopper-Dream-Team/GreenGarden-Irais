import React, { Component } from "react";
import { createInventory } from "../store/inventory";
import { connect } from "react-redux";

class CreateInventory extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      quantity: "",
      price: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createInventory({ ...this.state });
    this.setState({ name: "", quantity: "", price: "" });
  }

  handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { name, quantity, price } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <form id="inventory-form-admin" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input name="name" value={name} onChange={handleChange} />

        <label htmlFor="quantity">Quantity:</label>
        <input name="quantity" value={quantity} onChange={handleChange} />

        <label htmlFor="price">Price:</label>
        <input name="price" value={price} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createInventory: (inventory) => dispatch(createInventory(inventory, history)),
});

export default connect(null, mapDispatchToProps)(CreateInventory);
