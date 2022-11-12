import React from "react";
import { connect } from "react-redux";
import { updateQuantity } from "../store/singleOrder";

class ChangeQuantity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.itemInfo.qty,
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
      id: this.props.itemInfo.id,
      orderId: this.props.itemInfo.orderId,
      qty: this.state.quantity,
    });

    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="quantity">Update Item Quantity: </label>
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

const mapDispatch = (dispatch) => {
  return {
    updateQuantity: (lineItem) => dispatch(updateQuantity(lineItem)),
  };
};

export default connect(null, mapDispatch)(ChangeQuantity);
