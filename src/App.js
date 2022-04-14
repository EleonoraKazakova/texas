import "./styles/app.css";
import HomePage from "./components/HomePage";
import Menu from "./components/Menu";
import Categories from "./components/Categories";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:categories" element={<Categories />} />
      </Routes>
    </div>
  );
}

export default App;
