const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page. */

// Get shopping cart
// https://api.spoonacular.com/mealplanner/95532f98-7941-4c80-9a93-2fcddd8ef676/shopping-list?apiKey=724f1998bda24a498285eba50cd247fb&hash=e7e9228b49a4652aafaf8d7fb949fa5756ea0923

// Post to shopping cart
// https://api.spoonacular.com/mealplanner/95532f98-7941-4c80-9a93-2fcddd8ef676/shopping-list/items?apiKey=724f1998bda24a498285eba50cd247fb&hash=e7e9228b49a4652aafaf8d7fb949fa5756ea0923

// Delete Shopping Cart
// https://api.spoonacular.com/mealplanner/{username}/shopping-list/items/{id}

router.get("/", function (req, res, next) {
  res.send("hello");
});

module.exports = router;
