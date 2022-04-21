import {
  getCollection,
  createDocument,
  addDocument,
  updateDocument,
  getDocument,
} from "../scripts/fireStore";
import { createFile } from "../scripts/cloudStorage";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/admin.sass";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  const path = `categoriesTexas/allDishes`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setCategories(data.subCategory);
    }
    loadData("categoriesTexas/allDishes");
  }, []);

  console.log("title:", title);

  async function onUpdate(event) {
    event.preventDefault();
    const newCategory = {
      title: title,
      type: title.toLowerCase(),
      imgURL: "",
    };

    const fileName = `category-${title}.jpg`;
    const filePath = path + fileName;
    const imgURL = await createFile(filePath, file);

    newCategory.imgURL = imgURL;

    console.log("newCategory.imgURL:", newCategory.imgURL);
    await updateDocument(path, {
      subCategory: [...categories, newCategory],
    });
    setCategories([...categories, newCategory]);
  }

  /*async function onImageChoose(event) {
    const file = event.target.files[0];
    setFile(file);
  }*/

  const categoryCard = categories.map((item) => (
    <button className="admin-content">
      <img src={item.imgURL} />
      <Link to={`/admin/${item.title}`}> {item.title} </Link>
    </button>
  ));

  return (
    <div>
      {categoryCard}
      <form onSubmit={onUpdate}>
        <input
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(event) => setFile(event.target.files[0])}
        />
        <button className="admin-button">Submit</button>
      </form>
    </div>
  );
}
