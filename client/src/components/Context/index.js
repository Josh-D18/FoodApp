import React, { useState, createContext } from "react";
import axios from "axios";
export const RecipeContext = createContext();

export const Provider = (props) => {
  // State to hold API data
  // const [user, setUser] = useState([]);
  const [recipe, setRecipe] = useState([]);

  // const getUser = () => {};
  console.log(props);
  const getData = async () => {
    await axios.get("http://localhost:5000/recipes").then((res) => {
      setRecipe(res.data);
      console.log(recipe);
    });
  };

  return (
    <RecipeContext.Provider
      value={{
        actions: {
          data: getData,
        },
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
