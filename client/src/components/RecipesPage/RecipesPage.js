import { RecipeContext } from "../Context";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RecipesPage() {
  const { actions } = useContext(RecipeContext);
  console.log(actions);
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
    getData();
  }, []);

  return (
    <article>
      <h1>Recipes</h1>
      <>
        {recipe.map((item) => (
          <div key={item.id}>
            <Link to={`/recipes/${item.id}`}>
              <h2>{item.title}</h2>

              <img src={item.image} alt="Recipe" />
            </Link>
          </div>
        ))}
      </>
    </article>
  );
}

export default RecipesPage;
