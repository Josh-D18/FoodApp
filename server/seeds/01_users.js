const bcrypt = require("bcryptjs");
let users = [
  {
    firstName: "Josh",
    lastName: "Date",
    username: "CodeGuy",
    password: bcrypt.hashSync("hello", 8),
  },
  {
    firstName: "Jovin",
    lastName: "Alexander",
    username: "Jalex",
    password: bcrypt.hashSync("hello", 8),
  },
  {
    firstName: "Mark",
    lastName: "Zuck",
    username: "Facebook",
    password: bcrypt.hashSync("hello", 8),
  },
];
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert(users);
    });
};
