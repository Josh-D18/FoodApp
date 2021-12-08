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
  .get("/recipes/food", async (req, res, next) => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=724f1998bda24a498285eba50cd247fb&number=11&query=${req.body.food}`
      )
      .then(async (response) => {
        await res.json(response.data);
      })
      .catch((error) => console.error({ error: error }));
  })
  .get("/ingredients", async (req, res, next) => {
    await axios
      .get(
        `https://api.spoonacular.com/ingredients/search?apiKey=724f1998bda24a498285eba50cd247fb&number=11&query=${req.body.food}`
      )
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => console.error({ error: error }));
  });

module.exports = router;
