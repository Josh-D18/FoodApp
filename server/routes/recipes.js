const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

/* GET users listing. */
// &query=pizza&diet=Gluten Free
router
  .get("/recipes", async (req, res, next) => {
    await axios
      .get(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=724f1998bda24a498285eba50cd247fb&number=11&maxFat=25"
      )
      .then(async (response) => {
        res.json(response.data);
      })
      .catch((error) => console.error(error));
  })
  .get("/recipes/:food", async (req, res, next) => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=724f1998bda24a498285eba50cd247fb&number=11&query=${req.params.food}`
      )
      .then(async (response) => {
        res.json(response.data);
      })
      .catch((error) => console.error({ error: error }));
  })
  .get("/ingredients/:id", async (req, res, next) => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/${req.params.id}/ingredientWidget.json?apiKey=724f1998bda24a498285eba50cd247fb`
      )
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => console.error({ error: error }));
  });

module.exports = router;
