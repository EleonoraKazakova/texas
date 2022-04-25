import { updateDocument, getDocument } from "../../scripts/fireStore";
import { createFile } from "../../scripts/cloudStorage";
import { useState, useEffect } from "react";
import "../../styles/admin.sass";
import AdminFormCategory from "./AdminFormCategory";
import EmptyImg from "../../images/empty.jpg";
import AdminCategoryCard from "./AdminCategoryCard";
import AdminCategoryTable from "./AdminCategoryTable";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  const path = "categoriesTexas/allDishes";

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setCategories(data.subCategory);
    }
    loadData("categoriesTexas/allDishes");
  }, []);

  function clearForm() {
    setTitle("");
    setDescription("");
    setFile(null);
  }

  // The onUpdate is well written, you can think how to reduce the ammount of lines by refactoring a bit more
  async function onUpdate(event) {
    event.preventDefault();

    const newCategory = {
      title: title,
      type: title.toLowerCase(),
      imgURL: EmptyImg,
      description: description,
    };

    const fileName = `category-${title}.jpg`;
    const filePath = path + fileName;
    const imgURL = await createFile(filePath, file);

    // Nice validation
    if (file === null) {
      newCategory.imgURL = EmptyImg;
    } else {
      newCategory.imgURL = imgURL;
    }

    if (newCategory.title === "") return;

    await updateDocument(path, {
      subCategory: [...categories, newCategory],
    });
    setCategories([...categories, newCategory]);

    clearForm();
  }

  const categoryCard = categories.map((item) => (
    <AdminCategoryCard
      item={item}
      categories={categories}
      setCategories={setCategories}
      path={path}
      key={item.type}
    />
  ));

  return (
    <div className="admin-grid">
      <header className="admin-header">
        <h1>Admin page</h1>
        {/* Don't use h3 just to make the title smaller, use h2 and make it smaller using css -1 */}
        <h3>All categories</h3>
      </header>

      {/* An empty div that does not wrap anything for just a background, feels weird -1 */}
      <div className="admin-form-background"></div>

      <section className="admin-form">
        <AdminFormCategory
          itemData={[title, setTitle]}
          descriptionData={[description, setDescription]}
          fileData={[file, setFile]}
          onUpdate={onUpdate}
        />
      </section>
      <main className="admin-content-block">
        <AdminCategoryTable categoryCard={categoryCard} />
      </main>
    </div>
  );
}
