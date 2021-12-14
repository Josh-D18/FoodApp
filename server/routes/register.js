const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const knex = require("../middleware/config");
const { default: axios } = require("axios");

// Create New User
router.post("/register", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let firstname = req.body.firstName;
  let lastname = req.body.lastName;
  let profileObj = [];

  await axios
    .post(
      "https://api.spoonacular.com/users/connect?apiKey=724f1998bda24a498285eba50cd247fb",
      JSON.stringify({
        userName: username,
        firstName: firstname,
        lastName: lastname,
      })
    )
    .then((data) => profileObj.push(data))
    .catch((err) => res.status(400).send({ error: err.message }));

  await bcrypt
    .hash(password, 8)
    .then(async (hashPassword) => {
      await knex("users")
        .insert({
          username: username,
          password: hashPassword,
          firstName: firstname,
          lastName: lastname,
        })
        .then(async (user) => {
          await knex("users")
            .where({ id: user })
            .then(async () => {
              await knex("profile")
                .insert({
                  user_id: user,
                  username: profileObj[0].data.username,
                  password: profileObj[0].data.spoonacularPassword,
                  hash: profileObj[0].data.hash,
                })
                .then((profile) => {
                  res.json(profile);
                });
            });
        })
        .catch((err) => res.status(400).send({ error: err.message }));
    })
    .catch((err) => res.status(400).send({ error: err.message }));
});

module.exports = router;
