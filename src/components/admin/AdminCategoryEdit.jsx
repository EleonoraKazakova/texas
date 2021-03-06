import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createFile } from "../../scripts/cloudStorage";
import { getDocument, updateDocument } from "../../scripts/fireStore";
import "../../styles/admin.sass";
import EmptyImg from "../../images/empty.jpg";
import InputField from "./InputField";
import form from "../../data/form.json";

export default function AdminCategoryEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  console.log("category:", category);
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
      imgURL: category.imgURL,
      description: description,
    };

    if (category.imgURL === "") {
      newCategory.imgURL = EmptyImg;
    } else if (file !== null) {
      const fileName = `category-${title}.jpg`;
      const filePath = path + fileName;
      const imgURL = await createFile(filePath, file);

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
          <InputField setup={form.title} state={[title, setTitle]} />
          <InputField
            setup={form.description}
            state={[description, setDescription]}
          />

          <div className="admin-label">
            <label className="admin-choose-image">Choose picture</label>
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
