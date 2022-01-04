import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PDF from "../PDF/PDF";

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
            <PDF
              ingredients={item.extendedIngredients}
              image={item.image}
              title={item.title}
              readyIn={item.readyInMinutes}
              instructions={item.analyzedInstructions}
            />
            <article className="recipe__cuisine">
              <h3>Servings: {item.servings}</h3>
              <h3>Cuisine Type:</h3>
              <ul>
                {item.cuisines && item.cuisines.length > 0 ? (
                  item.cuisines.map((cuisine, i) => <li key={i}>{cuisine}</li>)
                ) : (
                  <h4>None Where Found!</h4>
                )}
              </ul>
            </article>
            <article className="recipes__diets">
              <h3>Diets</h3>
              <>
                {item.diets ? (
                  <ul>
                    {item.diets.map((diet, i) => (
                      <li key={i}>{diet}</li>
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
                  item.dishTypes.map((dish, i) => <li key={i}>{dish}</li>)}
              </ul>
            </article>
          </article>
        ))}
    </>
  );
}

export default RecipePage;
