import { updateDocument, getDocument } from "../scripts/fireStore";
import { createFile } from "../scripts/cloudStorage";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/admin.sass";

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

  console.log("categories:", categories);

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
    <div>
      <button className="admin-content">
        <img src={item.imgURL} />
        <Link to={`/admin/${item.type}`}> {item.title} </Link>
      </button>
      <button onClick={(event) => onDelete(event, item.title)}>Delete</button>
    </div>
  ));

  return (
    <div>
      <form onSubmit={onUpdate}>
        <input
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          placeholder="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(event) => setFile(event.target.files[0])}
        />
        <button className="admin-button">Submit</button>
      </form>
      {categoryCard}
    </div>
  );
}
