import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getDocument,
  deleteDocument,
  updateDocument,
} from "../scripts/fireStore";
import { createFile } from "../scripts/cloudStorage";
import "../styles/admin.sass";

export default function AdminDish() {
  const params = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState([]);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const path = `categoriesTexas/allDishes/${params.adminCategory}/${params.adminDish}`;

  useEffect(() => {
    async function loadData() {
      const data = await getDocument(
        `categoriesTexas/allDishes/${params.adminCategory}/${params.adminDish}`
      );
      console.log("data:", data);
      setDish(data);
      setIngredients(data.ingredients);
      setPrice(data.price);
      setDescription(data.description);
      setFile(data.imgURL);
      setTitle(data.title);
    }
    loadData();
  }, []);

  async function onUpdate(event) {
    event.preventDefault();
    const fileName = `category-${title}.jpg`;
    const filePath = path + fileName;
    const newImgURL = await createFile(filePath, file);
    console.log("newImgURL:", newImgURL);
    // dish.imgURL = newImgURL;

    await updateDocument(path, {
      ingredients: ingredients,
      description: description,
      price: price,
      imgURL: newImgURL,
    });
    navigate(-1);
  }

  console.log("dish:", dish);

  async function onDelete() {
    await deleteDocument(path);
  }

  return (
    <div className="admin-grid">
      <div className="admin-header">
        <div>{dish.title}</div>
      </div>
      <div className="admin-content-block-edit">
        <form className="admin-form">
          <div>
            <label>Title</label>
            <input placeholder="title" type="text" value={dish.title} />
          </div>
          <div>
            <label>Description</label>
            <input
              placeholder="description"
              type="text"
              value={dish.description}
            />
          </div>
          <div>
            <label>Ingredients</label>
            <input
              placeholder="ingredients"
              type="text"
              value={ingredients}
              onChange={(event) => setIngredients(event.target.value)}
            />
          </div>
          <div>
            <label>Price</label>
            <input placeholder="price" type="text" value={dish.price} />
          </div>
          <div className="admin-label">
            <label>Choose picture</label>
            <input type="file" accept="image/png, image/jpeg" />
          </div>

          <button className="admin-button" onClick={onUpdate}>
            Submit
          </button>

          <button className="admin-button" onClick={onDelete}>
            Delete dish
          </button>
        </form>
      </div>
    </div>
  );
}
