import { getDocument } from "../scripts/fireStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/menu.sass";

export default function Menu() {
  const [categories, setCategories] = useState({ subCategory: [] });

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setCategories(data);
    }
    loadData("categoriesTexas/allDishes");
  }, []);

  const categoryCard = categories.subCategory.map((item) => (
    <button className="menu-card" key={item.type}>
      <img src={item.imgURL} className="menu-img" />
      <Link to={`/menu/${item.type}`} className="menu-link">
        {item.title}
      </Link>
    </button>
  ));

  return (
    <div className="menu-grid">
      <header className="menu-main-img">
        <h1 className="menu-title">MENU</h1>
      </header>
      <main className="menu-cards">{categoryCard}</main>
    </div>
  );
}
