import { useParams, useNavigate } from "react-router-dom";
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
  const [fileBytes, setFileBytes] = useState(null);

  const path = `categoriesTexas/allDishes/${params.adminCategory}/${params.adminDish}`;

  useEffect(() => {
    async function loadData() {
      const data = await getDocument(
        `categoriesTexas/allDishes/${params.adminCategory}/${params.adminDish}`
      );
      console.log("data:", data);
      setDish(data);
      setIngredients(data.ingredients);
      setDescription(data.description);
      setTitle(data.title);
      setPrice(data.price);
    }
    loadData();
  }, []);

  async function onUpdate(event) {
    event.preventDefault();
    let newImgURL = "";
    if (fileBytes === null) {
      newImgURL = dish.imgURL;
    } else {
      const fileName = `category-${title}.jpg`;
      const filePath = path + fileName;
      newImgURL = await createFile(filePath, fileBytes);
    }

    await updateDocument(path, {
      description: description,
      ingredients: ingredients,
      title: title,
      price: price,
      imgURL: newImgURL,
    });
    navigate(-1);
  }

  async function onDelete() {
    await deleteDocument(path);
  }

  return (
    <div className="admin-grid">
      <div className="admin-header">
        <h1>{title}</h1>
      </div>
      <div className="admin-content-block-edit">
        <form className="admin-form">
          <div>
            <label>Title</label>
            <input
              placeholder="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              placeholder="description"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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
            <input
              placeholder="price"
              type="text"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="admin-label">
            <img src={dish.imgURL} className="admin-foto" />
            <label>Choose picture</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(event) => setFileBytes(event.target.files[0])}
            />
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
