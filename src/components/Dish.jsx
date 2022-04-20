import { useParams } from "react-router-dom";
import { getDocument } from "../scripts/fireStore";
import { useEffect, useState } from "react";
import "../styles/dish.sass";

export default function Dish() {
  const params = useParams();
  const [dish, setDish] = useState([]);

  console.log("params:", params);

  useEffect(() => {
    async function loadData() {
      const data = await getDocument(
        `categoriesTexas/allDishes/${params.category}/${params.dish}`
      );
      console.log("data:", data);
      setDish(data);
    }
    loadData();
  }, []);

  console.log("dish:", dish);
  return (
    <div>
      <img src={dish.imgURL} className="dish-img" />
      {dish.title}
    </div>
  );
}
