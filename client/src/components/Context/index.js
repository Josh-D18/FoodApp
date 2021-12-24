import React, { useState, createContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export const RecipeContext = createContext();

export const Provider = (props) => {
  // State to hold API data
  const [user, setUser] = useState([]);
  // const [recipe, setRecipe] = useState([]);
  // const { id } = useParams();

  console.log(props);
  // const getCurrentUser = async () => {
  //   await axios.get(`http://localhost:5000/user/${id}`).then((res) => {
  //     setUser(res.data);
  //     console.log(user);
  //   });
  // };

  const getCurrentUser = () => {
    async function fetchData() {
      await axios(`http://localhost:5000/user/1`).then((res) => {
        setUser(res.data);
      });
    }
    fetchData();
  };

  return (
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
  );
};
