import "./App.scss";
import { Routes, Route } from "react-router-dom";
import RecipesPage from "./components/RecipesPage/RecipesPage";

function App() {
  return (
    <section>
      <Routes>
        <Route path="/" element={<RecipesPage />} />
      </Routes>
    </section>
  );
}

export default App;
