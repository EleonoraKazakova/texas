import { updateDocument, getDocument } from "../scripts/fireStore";
import { createFile } from "../scripts/cloudStorage";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/admin.sass";
import AdminFormCategory from "./Admin-form-category";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  const path = `categoriesTexas/allDishes`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setCategories(data.subCategory);
    }
    loadData("categoriesTexas/allDishes");
  }, []);

  async function onUpdate(event) {
    event.preventDefault();
    const newCategory = {
      title: title,
      type: title.toLowerCase(),
      imgURL: "",
      description: description,
    };

    const fileName = `category-${title}.jpg`;
    const filePath = path + fileName;
    const imgURL = await createFile(filePath, file);

    newCategory.imgURL = imgURL;

    await updateDocument(path, {
      subCategory: [...categories, newCategory],
    });
    setCategories([...categories, newCategory]);
  }

  async function onDelete(event, title) {
    event.preventDefault();

    const newCategories = categories.filter(
      (category) => category.title !== title
    );
    await updateDocument(path, {
      subCategory: newCategories,
    });
    setCategories(newCategories);
  }

  const categoryCard = categories.map((item) => (
    <tr className="admin-category">
      <td className="admin-td-img">
        <img src={item.imgURL} className="admin-foto" />
      </td>
      <td className="admin-td-title">
        <Link to={`/admin/${item.type}`}> {item.title} </Link>
      </td>
      <td className="admin-td-description"> {item.description}</td>
      <td className="admin-td-delete">
        <button onClick={(event) => onDelete(event, item.title)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <div className="admin-grid">
      <div className="admin-header">
        <h1>Admin page</h1>
      </div>

      <div className="admin-form-background"></div>

      <div className="admin-form">
        <AdminFormCategory
          formProps={[
            title,
            setTitle,
            description,
            setDescription,
            setFile,
            onUpdate,
          ]}
        />
      </div>
      <div className="admin-content-block">
        <table className="admin-category-block">
          <thead className="admin-category-thead">
            <td className="admin-td-img">Picture</td>
            <td className="admin-td-title">Title</td>
            <td className="admin-td-description"> Description</td>
            <td className="admin-td-delete">Delete</td>
          </thead>
          <tbody>{categoryCard}</tbody>
        </table>
      </div>
    </div>
  );
}
