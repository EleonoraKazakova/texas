import { useState, useEffect } from "react";
import "../styles/admin.sass";
import {
  addDocument,
  getCollection,
  deleteDocument,
} from "../scripts/fireStore";
import { useParams, Link } from "react-router-dom";

export default function AdminCategory() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [dishes, setDishes] = useState([]);

  console.log("params:", params);

  useEffect(() => {
    const path = `categoriesTexas/allDishes/${params.adminCategory}`;
    async function loadData(path) {
      const data = await getCollection(path);
      setDishes(data);
    }
    loadData(path);
  }, []);

  function clearForm() {
    setTitle("");
    setIngredients("");
  }
  const path = `categoriesTexas/allDishes/${params.adminCategory}/${title}`;

  async function onCreate(event) {
    event.preventDefault();

    const newDish = {
      title: title,
      ingredients: ingredients,
    };

    await addDocument(path, newDish);
    clearForm();
    setDishes([...dishes, newDish]);
  }

  async function onDelete(dish) {
    await deleteDocument(
      `categoriesTexas/allDishes/${params.adminCategory}/${dish}`
    );
    const newDishes = dishes.filter(
      (currentDish) => currentDish.title !== dish
    );
    setDishes(newDishes);
  }

  const dishCard = dishes.map((doc) => (
    <div key={doc.title}>
      <Link to={`/admin/${params.adminCategory}/${doc.title}`}>
        {doc.title}
      </Link>
      <button className="admin-button" onClick={() => onDelete(doc.title)}>
        Delete dish
      </button>
    </div>
  ));

  return (
    <div className="admin-content">
      {dishCard}
      <form onSubmit={onCreate}>
        <input
          placeholder="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          placeholder="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input
          placeholder="ingredients"
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
        />

        <button className="admin-button">Submit</button>
      </form>
    </div>
  );
}
