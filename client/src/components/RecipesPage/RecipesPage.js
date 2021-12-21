import { RecipeContext } from "../Context";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
function RecipesPage() {
  //   const { actions } = useContext(RecipeContext);
  console.log(RecipeContext);
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const getData = () => {
      async function fetchData() {
        await axios("http://localhost:5000/recipes").then((res) => {
          setRecipe(res.data.results);
        });
      }
      fetchData();
    };
  }, [recipe]);

  return (
    <article>
      <h1>Recipes</h1>
      <>
        {recipe.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <img src={item.image} alt="Recipe" />
          </div>
        ))}
      </>
    </article>
  );
}

export default RecipesPage;
