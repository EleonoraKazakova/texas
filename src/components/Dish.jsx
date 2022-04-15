import { useParams } from "react-router-dom";
import { getDocument } from "../scripts/fireStore";
import { useEffect, useState } from "react";

export default function Dish() {
  const params = useParams();
  const [dish, setDish] = useState([]);
  const [status, setStatus] = useState(0);

  console.log("params:", params);

  useEffect(() => {
    async function loadData() {
      const data = await getDocument(
        `categoriesTexas/allDishes/${params.category}`,
        params.dish
      );
      console.log("data:", data);
      setDish(data);
    }
    loadData();
  }, []);

  console.log("dish:", dish);
  return <div>{dish.title}</div>;
}
