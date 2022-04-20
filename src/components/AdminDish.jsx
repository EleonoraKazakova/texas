import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocument, deleteDocument } from "../scripts/fireStore";
import "../styles/admin.sass";

export default function AdminDish() {
  const params = useParams();
  const [dish, setDish] = useState([]);

  const path = `categoriesTexas/allDishes/${params.adminCategory}/${params.adminDish}`;
  useEffect(() => {
    async function loadData() {
      const data = await getDocument(
        `categoriesTexas/allDishes/${params.adminCategory}/${params.adminDish}`
      );
      console.log("data:", data);
      setDish(data);
    }
    loadData();
  }, []);

  console.log("dish:", dish);

  async function onDelite() {
    await deleteDocument(path);
  }

  return (
    <div className="admin-content">
      {dish.title}
      <button className="admin-button" onClick={onDelite}>
        Delete dish
      </button>
    </div>
  );
}
