import "./styles/app.css";
import HomePage from "./components/HomePage";
import Menu from "./components/Menu";
import Categories from "./components/Categories";
import Category from "./components/Category";
import { Routes, Route } from "react-router-dom";
import Dish from "./components/Dish";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:category" element={<Category />} />
        <Route path="/menu/:category/:dish" element={<Dish />} />
      </Routes>
    </div>
  );
}

export default App;
