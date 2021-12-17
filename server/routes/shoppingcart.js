const express = require("express");
const router = express.Router();
const axios = require("axios");
const knex = require("../middleware/config");
const { response } = require("express");

/* GET home page. */

// knex("profile").where({ username: username });

// Get shopping cart
router.get("/shoppingcart/:username/:hash", async (req, res, next) => {
  await axios
    .get(
      `https://api.spoonacular.com/mealplanner/${req.params.username}/shopping-list?apiKey=724f1998bda24a498285eba50cd247fb&hash=${req.params.hash}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => res.status(400).send({ error: err.message }));
});

// Post to shopping cart
// https://api.spoonacular.com/mealplanner/95532f98-7941-4c80-9a93-2fcddd8ef676/shopping-list/items?apiKey=724f1998bda24a498285eba50cd247fb&hash=e7e9228b49a4652aafaf8d7fb949fa5756ea0923

router.post("/shoppingcart/:username/:hash", function (req, res, next) {
  let item = req.body.item;
  let parse = req.body.parse;
  axios
    .post(
      `https://api.spoonacular.com/mealplanner/${req.params.username}/shopping-list?apiKey=724f1998bda24a498285eba50cd247fb&hash=${req.params.hash}`,
      {
        item,
      }
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => res.status(400).send({ error: err.message }));
});

// Delete Shopping Cart
// https://api.spoonacular.com/mealplanner/{username}/shopping-list/items/{id}

router.delete("/shoppingcart/:username/:hash/:id", function (req, res, next) {
  axios
    .delete(
      `https://api.spoonacular.com/mealplanner/${req.params.username}/shopping-list/items/${req.params.id}/?apiKey=724f1998bda24a498285eba50cd247fb&hash=${req.params.hash}`
    )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).send({ error: err.message }));
});

module.exports = router;
