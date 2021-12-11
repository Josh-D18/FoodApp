const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const knex = require("../middleware/config");
const { default: axios } = require("axios");
const { parse, stringify, toJSON, fromJSON } = require("flatted");
// Create New User
router.post("/register", async (req, res) => {
  let username = req.body.userName;
  let password = req.body.password;
  let firstname = req.body.firstName;
  let lastname = req.body.lastName;
  await bcrypt
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
            .where({ id: user })
            .then(async (data) => {
              let user = stringify(data[0]);
              console.log(JSON.parse(user)[0]);
              await axios
                .post(
                  "https://api.spoonacular.com/users/connect?apiKey=724f1998bda24a498285eba50cd247fb",
                  user[0]
                )
                .then((data) => res.send(data))
                .catch((err) => res.status(400).send({ error: err.message }));
            });
        })
        .catch((err) => res.status(400).send({ error: err.message }));
    })
    .catch((err) => res.status(400).send({ error: err.message }));
});

module.exports = router;
