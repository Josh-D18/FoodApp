const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

/* GET users listing. */
// &query=pizza&diet=Gluten Free
// Random Recipes
// https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert

router
  .get("/recipes", async (req, res, next) => {
    await axios
      .get(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=724f1998bda24a498285eba50cd247fb&number=11"
      )
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => console.error(error));
  })
  .get(
    "/recipes/:food/:diet?/:intolerances?/:type?/:sort?",
    async (req, res, next) => {
      await axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=724f1998bda24a498285eba50cd247fb&number=11&query=${req.params.food}&diet=${req.params.diet}&intolerances=${req.params.intolerances}&type=${req.params.type}&sort=${req.params.sort}`
        )
        .then((response) => {
          res.json(response.data);
        })
        .catch((error) => console.error({ error: error }));
    }
  )
  .get("/recipes/:id", async (req, res, next) => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=724f1998bda24a498285eba50cd247fb&includeNutrition=false`
      )
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => console.error({ error: error }));
  });

module.exports = router;
