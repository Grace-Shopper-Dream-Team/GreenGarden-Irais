const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Address = db.define('address', {
  street_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
   },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipcode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  });

  module.exports = Address
