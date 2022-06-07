import { Link } from "react-router-dom";
import { updateDocument } from "../../scripts/fireStore";

export default function AdminCategoryCard({
  item,
  categories,
  setCategories,
  path,
}) {
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
  return (
    <div className="admin-dish-grid">
      <div className="admin-td-img">
        <img src={item.imgURL} className="admin-foto" />
      </div>
      <div className="admin-category-title">
        <Link to={`/admin/${item.type}`}> {item.title} </Link>
      </div>
      <div className="admin-category-description"> {item.description}</div>
      <div className="admin-buttons">
        <button onClick={(event) => onDelete(event, item.title)}>Delete</button>
      </div>
    </div>
  );
}
