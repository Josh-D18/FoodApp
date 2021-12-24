import "./App.scss";
import { Routes, Route } from "react-router-dom";
import RecipesPage from "./components/RecipesPage/RecipesPage";
import RecipePage from "./components/RecipePage/RecipePage";
import { Provider } from "./components/Context/index";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

function App() {
  return (
    <section>
      <Provider>
        <Routes>
          <Route path="/" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipePage />} />
          <Route
            path="/shoppingcart/:username/:hash"
            element={<ShoppingCart />}
          />
        </Routes>
      </Provider>
    </section>
  );
}

export default App;
