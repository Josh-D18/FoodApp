import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Container, Box } from "@mui/material";
import Image from "../../styles/images/homeimage.jpg";
import "./Home.scss";

export default function Home() {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/recipes");
  }
  // Photo by Brooke Lark on Unsplash
  const styles = {
    paperContainer: {
      background: `url(${Image}) no-repeat center center fixed`,
      position: "fixed",
      top: "0",
      left: "0px",
      backgroundSize: "cover",
      minHeight: "100%",
      minWidth: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    title: {
      color: "#62ee",
      margin: "0.5rem",
    },
    infoContainer: {
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "column",
      alignItems: "flex-end",
    },
  };

  return (
    <Container style={styles.paperContainer} className="home">
      <Box style={styles.infoContainer}>
        <h1 style={styles.title} className="home__title">
          Welcome To Foodorzo!
        </h1>
        <p className="home__text">
          Look/Search through diffeerent recipes and add them to your shopping
          cart! Once You have all the ingredients, Send them to YOUR EMAIL!!
        </p>
        <Button
          variant="contained"
          className="home__btn"
          onClick={() => handleClick()}
        >
          Check Out Recipes
        </Button>
      </Box>
    </Container>
  );
}
