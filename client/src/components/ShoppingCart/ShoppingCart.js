import axios from "axios";
import { useState, useEffect } from "react";

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);

  let username = sessionStorage.getItem("username");
  let hash = sessionStorage.getItem("hash");

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

  // console.log(cart, username, hash);
  return (
    <div>
      {" "}
      <h1>Shopping Cart</h1>
      {cart &&
        [cart].map((items) => {
          return items && [items.aisles].map((item) => console.log(item));
        })}
    </div>
  );
}
// items.aisles.map((item) => {
//   return <h3>{item.aisles}</h3>;
// })
