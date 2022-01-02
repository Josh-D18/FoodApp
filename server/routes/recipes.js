const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const apiKey = require("../middleware/configapi");
const authorize = require("../middleware/auth");

/* GET users listing. */
// &query=pizza&diet=Gluten Free
// Random Recipes
// https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert

router
  .get("/recipes", authorize, async (req, res, next) => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=11`
      )
      .then((response) => {
        res.json(response.data);
      })
      .catch((err) => res.status(400).send({ error: err.message }));
  })
  .get(
    "/recipes/:food/:diet?/:intolerances?/:type?/:sort?",
    async (req, res, next) => {
      await axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=11&query=${req.params.food}&diet=${req.params.diet}&intolerances=${req.params.intolerances}&type=${req.params.type}&sort=${req.params.sort}`
        )
        .then((response) => {
          res.json(response.data);
        })
        .catch((err) => res.status(400).send({ error: err.message }));
    }
  )
  .get("/recipe/:id", authorize, async (req, res, next) => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${apiKey}&includeNutrition=false`
      )
      .then((response) => {
        res.json(response.data);
      })
      .catch((err) => res.status(400).send({ error: err.message }));
  });

module.exports = router;
