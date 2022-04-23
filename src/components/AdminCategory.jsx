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
import EmptyImg from "../images/empty.png";

export default function AdminCategory() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [dishes, setDishes] = useState([]);
  const [file, setFile] = useState(null);

  console.log("ingredients:", ingredients);
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
    setDescription("");
    setPrice("");
  }

  async function onCreate(event) {
    event.preventDefault();
    const newType = title.toLowerCase();
    const path = `categoriesTexas/allDishes/${params.adminCategory}/${newType}`;
    const newDish = {
      title: title,
      type: newType,
      description: description,
      ingredients: ingredients,
      imgURL: "",
      price: price,
    };

    const fileName = `category-${title}.jpg`;
    const filePath = path + fileName;
    const imgURL = await createFile(filePath, file);

    if (file === null) {
      newDish.imgURL = EmptyImg;
    } else {
      newDish.imgURL = imgURL;
    }
    if (newDish.title === "") return;
    await addDocument(path, newDish);
    setDishes([...dishes, newDish]);
    clearForm();
  }

  console.log("file:", file);

  async function onDelete(dish) {
    await deleteDocument(
      `categoriesTexas/allDishes/${params.adminCategory}/${dish}`
    );
    const newDishes = dishes.filter((currentDish) => currentDish.type !== dish);
    setDishes(newDishes);
  }

  const dishCard = dishes.map((doc) => (
    <tr key={doc.title} className="admin-category">
      <td className="admin-td-img">
        <img src={doc.imgURL} className="admin-foto" />
      </td>
      <td className="admin-td-title">{doc.title}</td>
      <td className="admin-td-description">{doc.description}</td>
      <td className="admin-td-description">{doc.ingredients}</td>
      <td className="admin-td-title">{doc.price}</td>
      <td className="admin-td-delete">
        <button className="admin-button">
          <Link to={`/admin/${params.adminCategory}/${doc.type}`}>Edit</Link>
        </button>
      </td>
      <td className="admin-td-delete">
        <button className="admin-button" onClick={() => onDelete(doc.type)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="admin-grid">
      <div className="admin-header">
        <h1>Admin page of {params.adminCategory.toUpperCase()}</h1>
        <button className="admin-button">
          <Link to={`/admin/${params.adminCategory}/edit`}>Edit category</Link>
        </button>
      </div>

      <div className="admin-form-background"></div>

      <div className="admin-form">
        <AdminFormDish
          itemData={[title, setTitle]}
          descriptionData={[description, setDescription]}
          fileData={[file, setFile]}
          formProps={[ingredients, setIngredients]}
          priceData={[price, setPrice]}
          onCreate={onCreate}
          dishes={dishes}
        />
      </div>

      <div className="admin-content-block">
        <table className="admin-category-block">
          <thead className="admin-category-thead">
            <td className="admin-td-img">Picture</td>
            <td className="admin-td-title">Title</td>
            <td className="admin-td-description"> Description</td>
            <td className="admin-td-description"> Ingredients</td>
            <td className="admin-td-title">Price</td>
            <td className="admin-td-delete">Edit</td>
            <td className="admin-td-delete">Delete</td>
          </thead>
          <tbody>{dishCard}</tbody>
        </table>
      </div>
    </div>
  );
}
