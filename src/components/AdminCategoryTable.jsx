import "../styles/admin.sass";

export default function AdminCategoryTable({ categoryCard }) {
  return (
    <table className="admin-category-block">
      <thead className="admin-category-thead">
        <td className="admin-td-img">Picture</td>
        <td className="admin-td-title">Title</td>
        <td className="admin-td-description"> Description</td>
        <td className="admin-td-delete">Delete</td>
      </thead>
      <tbody>{categoryCard}</tbody>
    </table>
  );
}
