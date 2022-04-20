import "./styles/app.sass";
import HomePage from "./components/HomePage";
import Menu from "./components/Menu";
import Category from "./components/Category";
import { Routes, Route } from "react-router-dom";
import Dish from "./components/Dish";
import NavigationBar from "./components/NavigationBar";
import Admin from "./components/Admin";
import AdminDish from "./components/AdminDish";

function App() {
  return (
    <div className="app-background">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:category" element={<Category />} />
        <Route path="/menu/:category/:dish" element={<Dish />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/:adminDish" element={<AdminDish />} />
      </Routes>
    </div>
  );
}

export default App;
