import { Link } from "react-router-dom";
import { deleteDocument } from "../scripts/fireStore";

export default function AdminDishCard({ doc, params, dishes, setDishes }) {
  async function onDelete(dish) {
    await deleteDocument(
      `categoriesTexas/allDishes/${params.adminCategory}/${dish}`
    );
    const newDishes = dishes.filter((currentDish) => currentDish.type !== dish);
    setDishes(newDishes);
  }
  return (
    <tr key={doc.title} className="admin-category">
      <td className="admin-td-img">
        <img src={doc.imgURL} className="admin-foto" />
      </td>
      <td className="admin-td-title">{doc.title}</td>
      <td className="admin-td-description">{doc.description}</td>
      <td className="admin-td-description">{doc.ingredients}</td>
      <td className="admin-td-title">{doc.price}</td>
      <td className="admin-td-delete">
        <button className="admin-button">
          <Link to={`/admin/${params}/${doc.type}`}>Edit</Link>
        </button>
      </td>
      <td className="admin-td-delete">
        <button className="admin-button" onClick={() => onDelete(doc.type)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
