const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const knex = require("../middleware/config");
const bcrypt = require("bcryptjs");

router.post("/login", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  knex("users")
    .where({ username: username })
    .then((user) => {
      console.log(password, user);
      const isMatch = bcrypt.compareSync(password, user[0].password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "4h" }
      );
      res.status(200).json({ user, token });
    })
    .catch((err) => res.status(400).json({ message: err.message }));
});

module.exports = router;
