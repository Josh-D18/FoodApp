import "./App.scss";
import { Routes, Route } from "react-router-dom";
import RecipesPage from "./components/RecipesPage/RecipesPage";
import RecipePage from "./components/RecipePage/RecipePage";
import { Provider } from "./components/Context/index";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";

function App() {
  return (
    <section>
      <Provider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipePage />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route exact path="*" component={NotFound} status={404} />
        </Routes>
      </Provider>
    </section>
  );
}

export default App;
