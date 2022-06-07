import "../../styles/admin.sass";

export default function AdminDishTable({ dishCard }) {
  return (
    <div className="admin-category-block">
      {/*
      <thead className="admin-category-thead">
        <tr className="admin-category-thead">
          <th className="admin-td-img">Picture</th>
          <th className="admin-td-title">Title</th>
          <th className="admin-td-description"> Description</th>
          <th className="admin-td-description"> Ingredients</th>
          <th className="admin-td-price">Price</th>
          <th className="admin-td-delete">Edit</th>
          <th className="admin-td-delete">Delete</th>
        </tr>        
      </thead> <tbody></tbody>*/}

      {dishCard}
    </div>
  );
}
