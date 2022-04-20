import {
  getCollection,
  createDocument,
  addDocument,
  updateDocument,
  getDocument,
} from "../scripts/fireStore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/admin.sass";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [categories, setCategories] = useState([]); //the same type like un dataBase

  const path = `categoriesTexas/allDishes`;

  console.log("title:", title);

  async function onUpdate(event) {
    event.preventDefault();
    const newCategory = {
      title: title,
      type: title.toLowerCase(),
    };

    await updateDocument(path, {
      subCategory: [...categories, newCategory],
    });
    setCategories([...categories, newCategory]);
  }

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setCategories(data.subCategory);
    }
    loadData("categoriesTexas/allDishes");
  }, []);

  const categoryCard = categories.map((item) => (
    <button className="admin-content">
      {/* <img src={subCategory.imgURL} className="menu-img" />*/}
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
          placeholder="Image"
          value={imgURL}
          onChange={(event) => setImgURL(event.target.value)}
        />
        <button className="admin-button">Submit</button>
      </form>
    </div>
  );
}
