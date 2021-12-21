import "./App.scss";
import { Routes, Route } from "react-router-dom";
import RecipesPage from "./components/RecipesPage/RecipesPage";
import RecipePage from "./components/RecipePage/RecipePage";

function App() {
  return (
    <section>
      <Routes>
        <Route path="/" element={<RecipesPage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
      </Routes>
    </section>
  );
}

export default App;
