import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RecipesPage() {
  const [recipe, setRecipe] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      async function fetchData() {
        await axios("http://localhost:5000/recipes", {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
          .then((res) => {
            setRecipe(res.data.results);
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
  }, [navigate]);

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
