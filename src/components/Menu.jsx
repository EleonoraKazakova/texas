import { getCollection } from "../scripts/fireStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/menu.sass";
import MenuIMG from "../images/menuIMG.jpg";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCategories(data);
      setStatus(1);
    }
    loadData("categoriesTexas");
  }, []);

  console.log("categories:", categories);
  const categoryCard = categories.map((item) =>
    item.subCategory.map((subCategory) => (
      <button className="menu-card">
        <img src={subCategory.imgURL} className="menu-img" />
        <Link to={`/menu/${subCategory.type}`}>{subCategory.title}</Link>
      </button>
    ))
  );

  if (status === 0) return <p>Loading...</p>;
  if (status === 2) return <p>Error...</p>;

  console.log("categoryCard:", categoryCard);
  return (
    <div>
      <header className="menu-main-img"> </header>
      <div className="menu-cards">{categoryCard}</div>
    </div>
  );
}
