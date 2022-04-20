import { useState } from "react";
import "../styles/admin.sass";
import { addDocument } from "../scripts/fireStore";
import { useParams } from "react-router-dom";

export default function AdminDish() {
  const params = useParams();
  const [dish, setDish] = useState([]);

  console.log("params:", params);

  async function onCreate(event) {
    event.preventDefault();
    const path = `categoriesTexas/allDishes/${params.adminDish}/${dish}`;

    const newDish = {
      title: dish,
    };

    await addDocument(path, newDish);
    setDish([...dish, newDish]);
  }

  console.log("dish:", dish);
  return (
    <div className="admin-content">
      {dish}
      <form onSubmit={onCreate}>
        <input
          placeholder="ingredients"
          value={dish}
          onChange={(event) => setDish(event.target.value)}
        />

        <button className="admin-button">Submit</button>
      </form>
    </div>
  );
}
