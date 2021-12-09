const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();

/* GET users listing. */
// &query=pizza&diet=Gluten Free
router
  .get("/recipes", async (req, res, next) => {
    await axios
      .get(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=724f1998bda24a498285eba50cd247fb&number=11&maxFat=25"
      )
      .then(async (response) => {
        await res.json(response.data);
      })
      .catch((error) => console.error(error));
  })
  .get("/recipes/:food", async (req, res, next) => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=724f1998bda24a498285eba50cd247fb&number=11&query=${req.params.food}`
      )
      .then(async (response) => {
        await res.json(response.data);
      })
      .catch((error) => console.error({ error: error }));
  })
  .get("/ingredients/:id", async (req, res, next) => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/${req.params.id}/ingredientWidget.json?apiKey=724f1998bda24a498285eba50cd247fb`
      )
      .then(async (response) => {
        await res.json(response.data);
      })
      .catch((error) => console.error({ error: error }));
  });

module.exports = router;
