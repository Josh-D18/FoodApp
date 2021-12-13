const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const knex = require("../middleware/config");
const { default: axios } = require("axios");
const { parse, stringify, toJSON, fromJSON } = require("flatted");
// var stringify = require("json-stringify-safe");
// var isCircular = require("is-circular");
// Create New User
router.post("/register", async (req, res) => {
  let username = req.body.userName;
  let password = req.body.password;
  let firstname = req.body.firstName;
  let lastname = req.body.lastName;
  await bcrypt
    .hash(password, 8)
    .then(async (hashPassword) => {
      await knex("users")
        .insert({
          userName: username,
          password: hashPassword,
          firstName: firstname,
          lastName: lastname,
        })
        .then(async (user) => {
          await knex("users")
            .where({ id: user })
            .then(async (data) => {
              let obj = {
                username: username,
                firstname: firstname,
                lastname: lastname,
              };
              // obj.firstName = data[0].username;
              // obj.lastName = data[0].lastName;
              // obj.username = data[0].username;

              console.log(stringify(obj), obj);
              await axios
                .post(
                  "https://api.spoonacular.com/users/connect?apiKey=724f1998bda24a498285eba50cd247fb",
                  JSON.parse(obj[0])
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
