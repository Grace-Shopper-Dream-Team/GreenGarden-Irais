import React from "react";

class ChangeQuantity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.updateQuantity({
      qty: this.state.quantity,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="quantity">Item Quantity: </label>
          <input
            name="quantity"
            onChange={this.handleChange}
            value={this.state.quantity}
          />
        </form>

        <button type="submit" onClick={this.handleSubmit}>
          Update Quantity
        </button>
      </div>
    );
  }
}

export default ChangeQuantity;
