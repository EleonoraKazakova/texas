import { useParams, useNavigate } from "react-router-dom";
import { getDocument } from "../scripts/fireStore";
import { useEffect, useState } from "react";
import "../styles/dish.sass";
import "../styles/base/button.sass";

export default function Dish() {
  const params = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getDocument(
        `categoriesTexas/allDishes/${params.category}/${params.dish}`
      );
      setDish(data);
    }
    loadData();
  }, []);

  return (
    <div>
      <header>
        <img src={dish.imgURL} className="dish-img" />
      </header>
      <main className="dish-block">
        <div className="dish-card">
          <h2>{dish.title}</h2>
          <div> {dish.description}</div>
          <div>Ingredients: {dish.ingredients}</div>
          <div>Price: $ {dish.price}</div>
          <button onClick={() => navigate(-1)} className="button">
            Go back
          </button>
        </div>
      </main>
    </div>
  );
}
