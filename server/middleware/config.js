const knex =
  process.env.NODE_ENV === "production"
    ? require("knex")(require("../knexfile").production)
    : require("knex")(require("../knexfile").development);
// const knex = require("knex")(require("../knexfile").development);

module.exports = knex;
