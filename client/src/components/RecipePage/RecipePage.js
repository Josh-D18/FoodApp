import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddIngredientButton from "../AddIngredients/AddIngredients";

function RecipePage() {
  const [recipe, setRecipe] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    const getData = () => {
      async function fetchData() {
        await axios(`http://localhost:5000/recipe/${id}`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }).then((res) => {
          setRecipe(res.data);
        });
      }
      fetchData();
    };
    getData();
  }, [id]);

  return (
    <>
      <h1>Recipe</h1>
      {recipe &&
        [recipe].map((item) => (
          <article key={item.id} className="recipe">
            <h2>{item.title}</h2>
            <img src={item.image} alt="Recipe" />
            <h3>Ingredients</h3>
            <ul>
              {" "}
              {item.extendedIngredients &&
                item.extendedIngredients.map((food) => <li>{food.name}</li>)}
            </ul>
            <AddIngredientButton ingredients={item.extendedIngredients} />
            <article className="recipe__cuisine">
              <h3>Can Be Ready In: {item.readyInMinutes} Minutes</h3>
              <h3>Servings: {item.servings}</h3>
              <h3>Cuisine Type:</h3>
              <ul>
                {item.cuisines && item.cuisines.length > 0 ? (
                  item.cuisines.map((cuisine) => <li>{cuisine}</li>)
                ) : (
                  <h4>None Where Found!</h4>
                )}
              </ul>
            </article>
            <article className="recipe__instructions">
              <h2>Instructions</h2>
              {item.analyzedInstructions &&
              item.analyzedInstructions.length > 0 ? (
                item.analyzedInstructions.map((steps) => (
                  <ol>
                    {steps.steps.map((item) => (
                      <li>{item.step}</li>
                    ))}
                  </ol>
                ))
              ) : (
                <h2>No Instructions Have Been Found!</h2>
              )}
            </article>
            <article className="recipes__diets">
              <h3>Diets</h3>
              <>
                {item.diets ? (
                  <ul>
                    {item.diets.map((diet) => (
                      <li>{diet}</li>
                    ))}
                  </ul>
                ) : (
                  <h3>This Recipe Does Not Have Any Diets</h3>
                )}
              </>
            </article>
            <article className="recipes__dishtypes">
              <h3>Dish Types</h3>
              <ul>
                {item.dishTypes &&
                  item.dishTypes.map((dish) => <li>{dish}</li>)}
              </ul>
            </article>
          </article>
        ))}
    </>
  );
}

export default RecipePage;
