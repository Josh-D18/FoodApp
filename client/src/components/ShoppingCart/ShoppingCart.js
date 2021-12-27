import axios from "axios";
// import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { RecipeContext } from "../Context";

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const { actions } = useContext(RecipeContext);

  async function fetchUserData() {
    await axios(`http://localhost:5000/user/116`).then((res) => {
      setUser(res.data);
      setIsLoading(true);
    });
  }

  useEffect(() => {
    const getData = () => {
      async function fetchData() {
        await fetchUserData();
        if (isLoading) {
          if (cart) {
            await axios(
              `http://localhost:5000/shoppingcart/${user[0].username}/${user[0].hash}`
            )
              .then((res) => {
                console.log(res.data);
                setCart(res.data);
              })
              .catch((err) => console.log({ message: err }));
          }
        }
      }
      fetchData();
    };
    getData();
  }, []);

  console.log(user, cart, isLoading, cart === false);

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cart && cart !== [] && [cart].map((items) => console.log(items))}
    </div>
  );
}
// items.aisles.map((item) => {
//   return <h3>{item.aisles}</h3>;
// })
