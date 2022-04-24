import { useState, useEffect } from "react";
import "../../styles/admin.sass";
import { addDocument, getCollection } from "../../scripts/fireStore";
import { useParams, Link, useNavigate } from "react-router-dom";
import { createFile } from "../../scripts/cloudStorage";
import AdminFormDish from "./AdminFormDish";
import EmptyImg from "../../images/empty.jpg";
import AdminDishCard from "./AdminDishCard";
import AdminDishTable from "./AdminDishTable";

export default function AdminCategory() {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [dishes, setDishes] = useState([]);
  const [file, setFile] = useState(null);

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

  const dishCard = dishes.map((doc) => (
    <AdminDishCard
      doc={doc}
      dishes={dishes}
      params={params.adminCategory}
      setDishes={setDishes}
    />
  ));

  return (
    <div className="admin-grid">
      <header className="admin-header">
        <h1>Admin page of {params.adminCategory.toUpperCase()}</h1>
        <div className="admin-block-buttons">
          <button className="admin-button">
            <Link to={`/admin/${params.adminCategory}/edit`}>
              Edit category
            </Link>
          </button>
          <button className="admin-button">
            <Link to={`/admin`}>Categories page</Link>
          </button>
        </div>
      </header>

      <div className="admin-form-background"></div>

      <section className="admin-form">
        <AdminFormDish
          itemData={[title, setTitle]}
          descriptionData={[description, setDescription]}
          fileData={[file, setFile]}
          ingredientsData={[ingredients, setIngredients]}
          priceData={[price, setPrice]}
          onCreate={onCreate}
          dishes={dishes}
        />
      </section>

      <main className="admin-content-block">
        <AdminDishTable dishCard={dishCard} />

        <button className="admin-button" onClick={() => navigate(-1)}>
          Go back
        </button>
      </main>
    </div>
  );
}
