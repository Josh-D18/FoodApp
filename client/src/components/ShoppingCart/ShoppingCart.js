import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { RecipeContext } from "../Context";

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [storeUser, setStoreUser] = useState([]);
  const { actions } = useContext(RecipeContext);
  const user = actions.user;

  const getUser = (user) => {
    const data = actions.data();
    // const username = data.username;
    // const hash = data.hash;
    console.log(data);
    // if ((username, hash)) {
    //   setStoreUser([username, hash]);
    // } else {
    //   new Error("User Not Found");
    // }
  };

  useEffect(() => {
    const getData = () => {
      async function fetchData() {
        getUser(user);
        console.log(storeUser);
        await axios(
          `http://localhost:5000/shoppingcart/${storeUser[0]}/${storeUser[1]}`
        ).then((res) => {
          setCart(res.data);
        });
      }
      fetchData();
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
