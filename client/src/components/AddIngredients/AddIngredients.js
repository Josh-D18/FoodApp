import axios from "axios";

export default function AddIngredientButton({ ingredients }) {
  const ingredientsArr = [];

  const getIngredients = () => {
    ingredients && ingredients.map((food) => ingredientsArr.push(food.name));
  };

  const AddIngredients = async () => {
    getIngredients();

    await axios
      .post(
        `http://localhost:5000/shoppingcart/95532f98-7941-4c80-9a93-2fcddd8ef676/e7e9228b49a4652aafaf8d7fb949fa5756ea0923/all`,
        { items: ingredientsArr }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error(error));
  };

  return (
    <button onClick={() => AddIngredients()}>
      Add Ingredients To Your Shopping Cart
    </button>
  );
}
