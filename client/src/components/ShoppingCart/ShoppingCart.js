import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { RecipeContext } from "../Context";

export default function ShoppingCart() {
  const { username, hash } = useParams();
  const [cart, setCart] = useState([]);
  const { actions } = useContext(RecipeContext);

  useEffect(() => {
    const getData = () => {
      async function fetchData() {
        await axios(
          `http://localhost:5000/shoppingcart/${username}/${hash}`
        ).then((res) => {
          setCart(res.data);
        });
        await actions.data();
      }
      fetchData();
    };
    getData();
  }, [username, hash]);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
