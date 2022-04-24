import "../../styles/admin.sass";

export default function AdminCategoryTable({ categoryCard }) {
  return (
    <table className="admin-category-block">
      <thead>
        <tr className="admin-category-thead">
          <th className="admin-td-img">Picture</th>
          <th className="admin-td-title">Title</th>
          <th className="admin-td-description"> Description</th>
          <th className="admin-td-delete">Delete</th>
        </tr>
      </thead>
      <tbody>{categoryCard}</tbody>
    </table>
  );
}
