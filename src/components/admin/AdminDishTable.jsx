import "../../styles/admin.sass";

export default function AdminDishTable({ dishCard }) {
  return (
    <table className="admin-category-block">
      <thead className="admin-category-thead">
        <td className="admin-td-img">Picture</td>
        <td className="admin-td-title">Title</td>
        <td className="admin-td-description"> Description</td>
        <td className="admin-td-description"> Ingredients</td>
        <td className="admin-td-title">Price</td>
        <td className="admin-td-delete">Edit</td>
        <td className="admin-td-delete">Delete</td>
      </thead>
      <tbody>{dishCard}</tbody>
    </table>
  );
}
