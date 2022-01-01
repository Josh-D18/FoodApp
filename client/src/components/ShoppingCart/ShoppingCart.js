import axios from "axios";
import { useState, useEffect } from "react";
import SendEmail from "../Email/SendEmail";
import { RecipeContext } from "../Context";

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getData = () => {
      async function fetchData() {
        await axios(`http://localhost:5000/shoppingcart/${username}/${hash}`)
          .then((res) => {
            setCart(res.data);
          })
          .catch((err) => console.log({ message: err }));
      }
      fetchData();
    };
    getData();
  }, [username, hash]);

  return (
    <>
      <h1>Shopping Cart</h1>
      {cart ? (
        [cart].map(
          (items) =>
            items &&
            [items.aisles].map((item) =>
              item.map((i) => (
                <div key={i.id}>
                  <h2>Aisle: {i.aisle}</h2>
                  {i.items.map((item) => (
                    <>
                      <h2>{item.name}</h2>
                      <p>
                        Servings: {item.measures.original.amount}{" "}
                        {item.measures.original.unit}
                      </p>
                    </>
                  ))}
                </div>
              ))
            )
        )
      ) : (
        <h2>Your Shopping Cart Is Empty!</h2>
      )}
      {cart ? <SendEmail /> : ""}
    </>
  );
}
