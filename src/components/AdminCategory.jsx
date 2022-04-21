import { useState, useEffect } from "react";
import "../styles/admin.sass";
import {
  addDocument,
  getCollection,
  deleteDocument,
} from "../scripts/fireStore";
import { useParams, Link } from "react-router-dom";
import { createFile } from "../scripts/cloudStorage";

export default function AdminCategory() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [dishes, setDishes] = useState([]);
  const [file, setFile] = useState(null);

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

  async function onCreate(event) {
    event.preventDefault();
    const newType = title.toLowerCase();
    const path = `categoriesTexas/allDishes/${params.adminCategory}/${newType}`;
    const newDish = {
      title: title,
      type: newType,
      ingredients: ingredients,
      imgURL: "",
      price: price,
    };

    const fileName = `category-${title}.jpg`;
    const filePath = path + fileName;
    const imgURL = await createFile(filePath, file);

    newDish.imgURL = imgURL;

    await addDocument(path, newDish);
    clearForm();
    setDishes([...dishes, newDish]);
  }

  async function onDelete(dish) {
    await deleteDocument(
      `categoriesTexas/allDishes/${params.adminCategory}/${dish}`
    );
    const newDishes = dishes.filter((currentDish) => currentDish.type !== dish);
    setDishes(newDishes);
  }

  const dishCard = dishes.map((doc) => (
    <div key={doc.title} className="admin-block">
      <img src={doc.imgURL} />
      {doc.title}
      {doc.description}
      {doc.ingredients}
      {doc.price}
      <button className="admin-button">
        <Link to={`/admin/${params.adminCategory}/${doc.type}`}>Edit dish</Link>
      </button>
      <button className="admin-button" onClick={() => onDelete(doc.type)}>
        Delete dish
      </button>
    </div>
  ));

  return (
    <div className="admin-content">
      <button className="admin-button">Edit category</button>
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
        <input
          placeholder="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(event) => setFile(event.target.files[0])}
        />

        <button className="admin-button">Submit</button>
      </form>
      {dishCard}
    </div>
  );
}
