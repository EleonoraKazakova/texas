import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createFile } from "../../scripts/cloudStorage";
import { getDocument, updateDocument } from "../../scripts/fireStore";
import "../../styles/admin.sass";
import EmptyImg from "../../images/empty.jpg";

export default function AdminCategoryEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const path = `categoriesTexas/allDishes`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      const category = data.subCategory.find(
        (category) => category.type === params.adminCategory
      );

      setCategories(data.subCategory);
      setDescription(category.description);
      setTitle(category.title);
      setType(category.type);
      setCategory(category);
    }
    loadData("categoriesTexas/allDishes");
  }, []);

  async function onUpdate(event) {
    event.preventDefault();
    const newCategory = {
      title: title,
      type: type,
      imgURL: "",
      description: description,
    };

    const fileName = `category-${title}.jpg`;
    const filePath = path + fileName;
    const imgURL = await createFile(filePath, file);

    if (file === null) {
      newCategory.imgURL = EmptyImg;
    } else {
      newCategory.imgURL = imgURL;
    }

    await updateDocument(path, {
      subCategory: categories.map((category) =>
        category.type !== type ? category : newCategory
      ),
    });
    navigate(-2);
  }

  return (
    <div className="admin-grid">
      <header className="admin-header">
        <h1>Edit category</h1>
      </header>
      <main className="admin-content-block-edit">
        <form onSubmit={onUpdate} className="admin-form">
          <div>
            <label>Title</label>
            <input
              placeholder="Title"
              required
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
          <div className="admin-label">
            <p className="admin-choose-image">Choose picture</p>
            <img
              src={file !== null ? URL.createObjectURL(file) : category.imgURL}
              className="admin-foto"
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </div>
          <button className="admin-button" onClick={() => setFile(null)}>
            Delete picture
          </button>
          <button className="admin-button">Submit</button>
        </form>
      </main>
    </div>
  );
}
