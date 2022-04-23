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
    <tr className="admin-category">
      <td className="admin-td-img">
        <img src={item.imgURL} className="admin-foto" />
      </td>
      <td className="admin-td-title">
        <Link to={`/admin/${item.type}`}> {item.title} </Link>
      </td>
      <td className="admin-td-description"> {item.description}</td>
      <td className="admin-td-delete">
        <button onClick={(event) => onDelete(event, item.title)}>Delete</button>
      </td>
    </tr>
  );
}
