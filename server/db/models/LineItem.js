const Sequelize = require("sequelize");
const db = require("../db");

const lineItem = db.define("lineItem", {
  productId: {
    type: Sequelize.INTEGER,
  },
  allOrdersId: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  qty: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
    defaultValue: 1,
  },
});

module.exports = lineItem;
