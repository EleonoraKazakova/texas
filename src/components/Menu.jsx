import { getCollection } from "../scripts/fireStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/menu.sass";

export default function Menu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCategories(data);
    }
    loadData("categoriesTexas");
  }, []);

  const categoryCard = categories.map((item) =>
    item.subCategory.map((subCategory) => (
      <button className="menu-card">
        <img src={subCategory.imgURL} className="menu-img" />
        <Link to={`/menu/${subCategory.type}`} className="menu-link">
          {subCategory.title}
        </Link>
      </button>
    ))
  );

  return (
    <div className="menu-grid">
      <header className="menu-main-img"> </header>
      <div className="menu-cards">{categoryCard}</div>
    </div>
  );
}
