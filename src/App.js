import "./styles/app.sass";
import HomePage from "./components/HomePage";
import Menu from "./components/Menu";
import Category from "./components/Category";
import { Routes, Route } from "react-router-dom";
import Dish from "./components/Dish";
import NavigationBar from "./components/NavigationBar";
import Admin from "./components/admin/Admin";
import AdminCategory from "./components/admin/AdminCategory";
import AdminDishEdit from "./components/admin/AdminDishEdit";
import AdminCategoryEdit from "./components/admin/AdminCategoryEdit";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-grid">
      <NavigationBar />
      <div className="app-content ">
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:category" element={<Category />} />
          <Route path="/menu/:category/:dish" element={<Dish />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:adminCategory" element={<AdminCategory />} />
          <Route
            path="/admin/:adminCategory/edit"
            element={<AdminCategoryEdit />}
          />
          <Route
            path="/admin/:adminCategory/:adminDishEdit"
            element={<AdminDishEdit />}
          />
        </Routes>
      </div>
      <div className="app-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
