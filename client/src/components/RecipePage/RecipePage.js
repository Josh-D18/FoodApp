import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PDF from "../PDF/PDF";
import "./RecipePage.scss";
import { useNavigate } from "react-router-dom";
import url from "../../config/config";

function RecipePage() {
  const [recipe, setRecipe] = useState();
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      async function fetchData() {
        await axios(`${url}/recipe/${id}`, {
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
            <PDF
              key={item.id}
              ingredients={item.extendedIngredients}
              image={item.image}
              title={item.title}
              readyIn={item.readyInMinutes}
              instructions={item.analyzedInstructions}
            />
          </article>
        ))}
    </>
  );
}

export default RecipePage;
