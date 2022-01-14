import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PDF from "../PDF/PDF";
import "./RecipePage.scss";
import { useNavigate } from "react-router-dom";

function RecipePage() {
  const [recipe, setRecipe] = useState();
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      async function fetchData() {
        await axios(`http://localhost:5000/recipe/${id}`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
          .then((res) => {
            setRecipe(res.data);
          })
          .catch((err) => {
            if (err.response === undefined) {
              console.error({ message: err });
            } else if (err === "TypeError") {
              console.error({ message: err });
            } else {
              switch (err.response.status) {
                case 403:
                  navigate("/login");
                  break;
                default:
                  break;
              }
            }
          });
      }
      fetchData();
    };
    getData();
  }, [id, navigate]);

  return (
    <>
      {recipe &&
        [recipe].map((item) => (
          <article key={item.id} className="recipe">
            <h1>Recipe</h1>
            <PDF
              key={item.id}
              ingredients={item.extendedIngredients}
              image={item.image}
              title={item.title}
              readyIn={item.readyInMinutes}
              instructions={item.analyzedInstructions}
            />
            {/* <article className="recipe__container">
              <h3 className="recipe__servings">Servings: {item.servings}</h3>
              <h3 className="recipe__title">Cuisine Type</h3>
              <>
                {item.cuisines && item.cuisines.length > 0 ? (
                  item.cuisines.map((cuisine, i) => (
                    <li className="recipe__item" key={i}>
                      {cuisine}
                    </li>
                  ))
                ) : (
                  <h4>None Where Found!</h4>
                )}
              </>
            </article> */}
            {/* <article className="recipe__container">
              <h3>Diets</h3>
              <>
                {item.diets ? (
                  <ul>
                    {item.diets.map((diet, i) => (
                      <li className="recipe__item" key={i}>
                        {diet}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h3>This Recipe Does Not Have Any Diets</h3>
                )}
              </>
            </article>
            <article className="recipe__container">
              <h3>Dish Types</h3>
              <>
                {item.dishTypes &&
                  item.dishTypes.map((dish, i) => (
                    <li className="recipe__item" key={i}>
                      {dish}
                    </li>
                  ))}
              </>
            </article> */}
          </article>
        ))}
    </>
  );
}

export default RecipePage;
