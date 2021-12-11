const bcrypt = require("bcryptjs");
let users = [
  {
    firstname: "Josh",
    lastname: "Date",
    username: "CodeGuy",
    password: bcrypt.hash("hello", 8),
  },
  {
    firstname: "Jovin",
    lastname: "Alexander",
    username: "Jalex",
    password: bcrypt.hash("hello", 8),
  },
  {
    firstname: "Mark",
    lastname: "Zuck",
    username: "Facebook",
    password: bcrypt.hash("hello", 8),
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
