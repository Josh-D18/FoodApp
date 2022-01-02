import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/recipes");
  }
  return (
    <>
      <h1>Welcome To Foodorzo!</h1>
      <p>
        Look/Search through diffeerent recipes and add them to your shopping
        cart! Once You have all the ingredients, Send them to YOUR EMAIL!!
      </p>

      <button className="home__btn" onClick={() => handleClick()}>
        Check Out Recipes
      </button>
    </>
  );
}
