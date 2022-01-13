import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./RecipesPage.scss";
import { Container } from "@mui/material";
import { Button } from "@mui/material";

function RecipesPage() {
  const [recipe, setRecipe] = useState([]);
  const [newRecipe, setNewRecipe] = useState("");
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios(
      `http://localhost:5000/recipes/${newRecipe}/${diet}?/${intolerances}?/${type}?`,
      {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    ).then((res) => {
      setRecipe(res.data.results);
    });
  };

  const handleChange = (e) => {
    let choice = e.target.name;
    if (choice === "mealType") {
      setType(e.target.value);
    } else if (choice === "intolerances") {
      setIntolerances(e.target.value);
    } else if (choice === "diet") {
      setDiet(e.target.value);
    } else if (choice === "newRecipe") {
      setNewRecipe(e.target.value);
    } else {
      return;
    }
  };

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
    <article className="recipes">
      <div className="recipes__container">
        <h1>Recipes</h1>
        <form onSubmit={handleSubmit} className="recipes__form">
          <Container className="recipe__form-container" maxWidth="xs">
            <label htmlFor="mealType">Enter A Recipe:</label>
            <input
              placeholder="Enter Recipe"
              onChange={handleChange}
              name="newRecipe"
              required
              className="recipes__field"
            />

            <label htmlFor="diet">Choose a Diet:</label>
            <select
              id="diet"
              name="diet"
              onChange={handleChange}
              defaultValue={"-- select an option --"}
              className="recipes__field"
            >
              <option disabled defaultValue={"-- select an option --"}>
                {" "}
                -- select an option --{" "}
              </option>
              <option value="Gluten Free">Gluten Free</option>
              <option value="Ketogenic">Ketogenic</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
              <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Pescetarian">Pescetarian</option>
              <option value="Low FODMAP">Low FODMAP</option>
              <option value="Paleo">Paleo</option>
              <option value="Primal">Primal</option>
              <option value="Whole30">Whole30</option>
            </select>

            <label htmlFor="mealType">Choose a Meal Type:</label>
            <select
              id="mealType"
              name="mealType"
              onChange={handleChange}
              defaultValue={"-- select an option --"}
              className="recipes__field"
            >
              <option disabled defaultValue={"-- select an option --"}>
                {" "}
                -- select an option --{" "}
              </option>
              <option value="main course">Main Course</option>
              <option value="side dish">Side Dish</option>
              <option value="dessert">Dessert</option>
              <option value="appetizer">Appetizer</option>
              <option value="salad">Salad</option>
              <option value="bread">Bread</option>
              <option value="breakfast">Breakfast</option>
              <option value="soup">Soup</option>
              <option value="beverage">Beverage</option>
              <option value="sauce">Sauce</option>
              <option value="marinade">Marinade</option>
              <option value="fingerfood">Fingerfood</option>
              <option value="snack">Snack</option>
              <option value="drink">Drink</option>
            </select>

            <label htmlFor="intolerances">What Are You Intolerant To?</label>
            <select
              id="intolerances"
              name="intolerances"
              onChange={handleChange}
              defaultValue={"-- select an option --"}
              className="recipes__field"
            >
              <option disabled defaultValue={"-- select an option --"}>
                {" "}
                -- select an option --{" "}
              </option>
              <option value="Dairy">Dairy</option>
              <option value="Egg">Egg</option>
              <option value="Gluten">Gluten</option>
              <option value="Grain">Grain</option>
              <option value="Peanut">Peanut</option>
              <option value="Seafood">Seafood</option>
              <option value="Sesame">Sesame</option>
              <option value="Shellfish">Shellfish</option>
              <option value="Soy">Soy</option>
              <option value="Tree Nut">Tree Nut</option>
              <option value="Wheat">Wheat</option>
            </select>
            <Button
              sx={{
                backgroundColor: "#62ee",
              }}
              variant="contained"
              color="secondary"
              type="submit"
              size="small"
            >
              Submit
            </Button>
          </Container>
        </form>
      </div>
      <article className="recipes__food">
        <>
          {recipe.length < 1 ? (
            <h2>No Recipes Were Found!</h2>
          ) : (
            recipe.map((item) => (
              <Link key={item.id} to={`/recipes/${item.id}`}>
                <div className="recipes__container">
                  <h2 className="recipes__title">{item.title}</h2>

                  <img
                    className="recipes__image"
                    src={item.image}
                    alt="Recipe"
                  />
                </div>
              </Link>
            ))
          )}
        </>
      </article>
    </article>
  );
}

export default RecipesPage;
