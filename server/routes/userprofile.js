const express = require("express");
const router = express.Router();
const knex = require("../middleware/config");

router.get("/user/:id", async (req, res, next) => {
  await knex("users")
    .join("profile", { user_id: "users.id" })
    .where({ user_id: req.params.id })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.status(400).send({ error: err.message }));
});

module.exports = router;
