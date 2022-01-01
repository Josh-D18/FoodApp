import React, { createContext } from "react";

export const RecipeContext = createContext();

export const Provider = (props) => {
  let username = sessionStorage.getItem("username");
  let hash = sessionStorage.getItem("hash");
  let userData = { ...username, ...hash };

  return (
    <RecipeContext.Provider
      value={{
        actions: {
          data: userData,
        },
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
