import { useParams, Link } from "react-router-dom";
import { getCollection } from "../scripts/fireStore";
import { useEffect, useState } from "react";
import "../styles/category.sass";

export default function Category() {
  const params = useParams();
  const [document, setDocument] = useState([]);

  console.log("params:", params);
  useEffect(() => {
    const path = `categoriesTexas/allDishes/${params.category}`;
    async function loadData(path) {
      const data = await getCollection(path);
      setDocument(data);
    }
    loadData(path);
  }, []);

  const dishCard = document.map((doc) => (
    <button key={doc.title} className="category-card">
      <img src={doc.imgURL} className="category-img-dish" />
      {doc.title}
      <p>Price: $ {doc.price}</p>

      <Link to={`/menu/${params.category}/${doc.id}`} className="menu-link">
        See more
      </Link>
    </button>
  ));

  return (
    <div>
      <header className={`category-${params.category} category-img`}></header>
      <div className="category-block">
        <div className="category-dishes-block">{dishCard}</div>
      </div>
    </div>
  );
}
