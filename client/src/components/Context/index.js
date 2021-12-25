import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export const RecipeContext = createContext();

export const Provider = (props) => {
  // State to hold API data
  const [user, setUser] = useState([]);
  // const [recipe, setRecipe] = useState([]);
  // const { id } = useParams();

  const getCurrentUser = () => {
    async function fetchData() {
      await axios(`http://localhost:5000/user/116`).then((res) => {
        setUser(res.data);
        return res.data;
      });
    }
    fetchData();
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  return user ? (
    <RecipeContext.Provider
      value={{
        actions: {
          data: getCurrentUser,
          user: user,
        },
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  ) : (
    ""
  );
};
