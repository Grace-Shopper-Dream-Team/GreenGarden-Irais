const Sequelize = require("sequelize");
const db = require("../db");

const LineItem = db.define("lineItem", {
  productId: {
    type: Sequelize.INTEGER,
  },
  orderId: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  qty: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
    defaultValue: 1,
  },
});

module.exports = LineItem;
