import { useNavigate } from "react-router-dom";

// import image from "../../assets/images/homefood.webp";
import "./Home.scss";

export default function Home() {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/recipes");
  }
  // Photo by Brooke Lark on Unsplash

  return (
    <>
      <section className="home">
        <h1 className="home__text">Build Your Health With New Recipes!!!</h1>
        <h3 className="home__text">
          Search For Any Food that You Like And Download the Recipe As A PDF!
        </h3>
        <p className="home__text">100% Free</p>
        <div>
          <button className="home__btn" onClick={() => handleClick()}>
            Check Out Recipes
          </button>
        </div>
      </section>
    </>
  );
}
