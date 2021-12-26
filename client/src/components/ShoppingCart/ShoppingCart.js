import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { RecipeContext } from "../Context";

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const { actions } = useContext(RecipeContext);

  async function fetchUserData() {
    await axios(`http://localhost:5000/user/116`).then((res) => {
      setUser(res.data);
    });
  }

  useEffect(() => {
    const getData = () => {
      async function fetchData() {
        try {
          await fetchUserData();

          await axios(
            `http://localhost:5000/shoppingcart/${user[0].username}/${user[0].hash}`
          ).then((res) => {
            setCart(res.data);
          });
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    };
    getData();
  }, []);

  console.log(user, cart);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
