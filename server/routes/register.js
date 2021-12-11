const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const knex = require("../middleware/config");

// Create New User
router.post("/register", (req, res) => {
  let username = req.body.userName;
  let password = req.body.password;
  let firstname = req.body.firstName;
  let lastname = req.body.lastName;
  bcrypt
    .hash(password, 8)
    .then((hashPassword) => {
      knex("users")
        .insert({
          userName: username,
          password: hashPassword,
          firstName: firstname,
          lastName: lastname,
        })
        .then((user) => {
          knex("users")
            .where({ user_id: user })
            .then((data) => {});
        })
        .catch((err) => res.status(400).send({ error: err.message }));
    })
    .catch((err) => res.status(400).send({ error: err.message }));
});

module.exports = router;
