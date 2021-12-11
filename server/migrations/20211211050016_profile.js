exports.up = function (knex) {
  return knex.schema.createTable("profile", function (table) {
    table.increments("id").primary();
    table.string("username");
    table.string("hash");
    table.string("password");
    table.integer("user_id").unsigned();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("profile").dropTable("users");
};
