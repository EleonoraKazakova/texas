import { Link } from "react-router-dom";
import { deleteDocument } from "../../scripts/fireStore";

export default function AdminDishCard({ doc, params, dishes, setDishes }) {
  async function onDelete(dish) {
    await deleteDocument(`categoriesTexas/allDishes/${params}/${dish}`);
    const newDishes = dishes.filter((currentDish) => currentDish.type !== dish);
    setDishes(newDishes);
  }
  return (
    <div key={doc.title} className="admin-dish-grid">
      <div className="admin-td-img">
        <img src={doc.imgURL} className="admin-foto-dish" />
      </div>

      <div className="admin-td-title">{doc.title}</div>
      <div className="admin-td-price">Price: {doc.price}</div>

      <div className="admin-td-description">Description: {doc.description}</div>
      <div className="admin-td-ingredients">Ingredients: {doc.ingredients}</div>

      <div className="admin-buttons">
        <div className="admin-td-delete">
          <button className="admin-button">
            <Link to={`/admin/${params}/${doc.type}`}>Edit</Link>
          </button>
        </div>
        <div className="admin-td-delete">
          <button className="admin-button" onClick={() => onDelete(doc.type)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
