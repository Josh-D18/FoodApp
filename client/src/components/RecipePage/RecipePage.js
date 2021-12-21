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

  console.log(recipe);
  return (
    <article>
      <h1>Recipe</h1>
      <>
        {recipe &&
          [recipe].map((item) => (
            <div key={item.id}>
              <h2>{item.title}</h2>

              <img src={item.image} alt="Recipe" />
            </div>
          ))}
      </>
    </article>
  );
}

export default RecipePage;
