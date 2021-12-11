exports.up = function (knex) {
  return knex.schema.createTable("profile", function (table) {
    table.increments("id").primary();
    table.string("username", 55).unique();
    table.string("hash");
    table.integer("user_id").unsigned();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onUpdate()
      .onDelete();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("profile").dropTable("users");
};
