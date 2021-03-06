const express = require("express");
const router = express.Router();
const axios = require("axios");
const apiKey = require("../middleware/configapi");

// Get shopping cart
router.get("/shoppingcart/:username/:hash", async (req, res, next) => {
  await axios
    .get(
      `https://api.spoonacular.com/mealplanner/${req.params.username}/shopping-list?apiKey=${apiKey}&hash=${req.params.hash}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => res.status(400).send({ error: err.message }));
});

// Post to shopping cart

router.post("/shoppingcart/:username/:hash", async (req, res, next) => {
  let item = req.body.item;
  await axios
    .post(
      `https://api.spoonacular.com/mealplanner/${req.params.username}/shopping-list/items?apiKey=${apiKey}&hash=${req.params.hash}`,
      {
        item,
      }
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) =>
      res.status(400).send({ error: err.message, msg: req.params.username })
    );
});

// Post entire List to Shopping Cart
router.post("/shoppingcart/:username/:hash/all", async (req, res, next) => {
  let itemsArr = req.body.items;

  for (let i = 0; i < itemsArr.length; i++) {
    await axios
      .post(
        `https://api.spoonacular.com/mealplanner/${req.params.username}/shopping-list/items?apiKey=${apiKey}&hash=${req.params.hash}`,
        {
          item: itemsArr[i],
        }
      )
      .then(() => {
        return;
      })
      .catch((err) =>
        res.status(400).send({ error: err.message, msg: req.params.username })
      );
  }
  res.send("All Items Have Been Added!");
});

// Delete Shopping Cart item
// https://api.spoonacular.com/mealplanner/{username}/shopping-list/items/{id}

router.delete("/shoppingcart/:username/:hash/:id", function (req, res, next) {
  axios
    .delete(
      `https://api.spoonacular.com/mealplanner/${req.params.username}/shopping-list/items/${req.params.id}/?apiKey=${apiKey}&hash=${req.params.hash}`
    )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).send({ error: err.message }));
});

// Delete Entire Shopping Cart
router.get("/shoppingcart/:username/:hash/delete", async (req, res, next) => {
  await axios
    .get(
      `https://api.spoonacular.com/mealplanner/${req.params.username}/shopping-list?apiKey=${apiKey}&hash=${req.params.hash}`
    )
    .then(async (response) => {
      let idArr = [];
      let data = response.data.aisles;
      let arrlength = response.data.aisles.length;
      if (arrlength > 0) {
        for (let i = 0; i < arrlength; i++) {
          let id = data[i].items[0].id;
          let itemsArr = data[i].items.length;
          if (itemsArr > 1) {
            for (let j = 0; j < itemsArr; j++) {
              idArr.push(data[i].items[j].id);
            }
          } else {
            idArr.push(id);
          }
        }

        for (let i = 0; i < idArr.length; i++) {
          await axios
            .delete(
              `https://api.spoonacular.com/mealplanner/${req.params.username}/shopping-list/items/${idArr[i]}/?apiKey=${apiKey}&hash=${req.params.hash}`
            )
            .then(() => {
              return;
            })
            .catch((err) => res.status(400).send({ error: err.message }));
        }
        res.json({ message: "Your Shoppping Cart Has Been Deleted" });
      }
    })
    .catch((err) => res.status(400).send({ error: err.message }));
});

module.exports = router;
