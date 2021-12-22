import { RecipeContext } from "../Context";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function RecipePage() {
  // const { actions } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    const getData = () => {
      async function fetchData() {
        await axios(`http://localhost:5000/recipe/${id}`).then((res) => {
          console.log(res.data);
          setRecipe(res.data);
        });
      }
      fetchData();
    };
    getData();
  }, [id]);

  console.log(recipe.cuisines);
  return (
    <article className="recipe">
      <h1>Recipe</h1>
      <>
        {recipe &&
          [recipe].map((item) => (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <img src={item.image} alt="Recipe" />
              <h3>Ingredients</h3>
              {item.extendedIngredients &&
                item.extendedIngredients.map((food) => (
                  <ul>
                    <li>{food.name}</li>
                  </ul>
                ))}
              <div>
                <h3>Can Be Ready In: {item.readyInMinutes} Minutes</h3>
                <h3>Servings: {item.servings}</h3>
                <p>
                  Cuisine Type:
                  {item.cuisines && item.cuisines.length > 0 ? (
                    item.cuisines.map((cuisine) => (
                      <>
                        <h4>{cuisine}</h4>
                      </>
                    ))
                  ) : (
                    <h4>None Where Found!</h4>
                  )}
                </p>
              </div>
              <div>
                <h2>Instructions</h2>
                {item.analyzedInstructions && item.analyzedInstructions > 0 ? (
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
              </div>
            </div>
          ))}
      </>
    </article>
  );
}

export default RecipePage;
