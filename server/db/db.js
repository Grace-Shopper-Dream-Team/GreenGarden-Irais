const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const config = {
  logging: false,
};

if (process.env.LOGGING === "true") {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(
  `postgres://gardeners:o5fu6RIK7bIcrvBK2HMQi5mVh1Pnu4lX@dpg-cdpvmepa6gdl61gqibs0-a/green_garden`,
  // process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
);
module.exports = db;
