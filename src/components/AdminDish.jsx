import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getDocument,
  deleteDocument,
  updateDocument,
} from "../scripts/fireStore";
import "../styles/admin.sass";

export default function AdminDish() {
  const params = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState([]);
  const [ingredients, setIngredients] = useState("");

  const path = `categoriesTexas/allDishes/${params.adminCategory}/${params.adminDish}`;

  useEffect(() => {
    async function loadData() {
      const data = await getDocument(
        `categoriesTexas/allDishes/${params.adminCategory}/${params.adminDish}`
      );
      console.log("data:", data);
      setDish(data);
      setIngredients(data.ingredients);
    }
    loadData();
  }, []);

  async function onUpdate(event) {
    event.preventDefault();

    await updateDocument(path, {
      ingredients: ingredients,
    });
    navigate(-1);
  }

  console.log("dish:", dish);

  async function onDelete() {
    await deleteDocument(path);
  }

  return (
    <div className="admin-content">
      <div className="admin-text">
        <div>{dish.title}</div>
      </div>
      <form>
        <input placeholder="title" value={dish.title} />
        <input placeholder="description" value={dish.description} />
        <input
          placeholder="ingredients"
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
        />
        <input placeholder="price" value={dish.price} />
        <input type="file" accept="image/png, image/jpeg" />

        <button className="admin-button" onClick={onUpdate}>
          Submit
        </button>
      </form>
      <button className="admin-button" onClick={onDelete}>
        Delete dish
      </button>
    </div>
  );
}
