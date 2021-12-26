import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export const RecipeContext = createContext();

export const Provider = (props) => {
  // State to hold API data

  // const [recipe, setRecipe] = useState([]);
  // const { id } = useParams();

  async function fetchUserData() {
    await axios(`http://localhost:5000/user/116`).then((res) => {
      return res.data;
    });
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        actions: {
          data: fetchUserData,
        },
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
