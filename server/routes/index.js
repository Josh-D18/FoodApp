const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hello");
});

module.exports = router;
