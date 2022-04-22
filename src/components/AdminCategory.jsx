import { useState, useEffect } from "react";
import "../styles/admin.sass";
import {
  addDocument,
  getCollection,
  deleteDocument,
} from "../scripts/fireStore";
import { useParams, Link } from "react-router-dom";
import { createFile } from "../scripts/cloudStorage";
import AdminFormDish from "./Admin-form-dish";

export default function AdminCategory() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [dishes, setDishes] = useState([]);
  const [file, setFile] = useState(null);

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
    <div key={doc.title} className="admin-category">
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
    <div className="admin-grid">
      <div className="admin-header">
        <h1>Admin page of dishes</h1>
      </div>
      <div className="admin-content-block">
        <button className="admin-button">
          <Link to={`/admin/${params.adminCategory}/edit`}>Edit category</Link>
        </button>
        <AdminFormDish
          formProps={[
            title,
            setTitle,
            description,
            setDescription,
            setFile,
            onCreate,
            ingredients,
            setIngredients,
            price,
            setPrice,
          ]}
        />

        <div className="admin-category-block"> {dishCard} </div>
      </div>
    </div>
  );
}
