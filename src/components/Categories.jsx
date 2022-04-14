import { getCollection } from "../scripts/fireStore";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Categories() {
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCategories(data);
      setStatus(1);
    }
    loadData("categories");
  }, []);

  if (status === 0) return <p>Loading...</p>;
  if (status === 2) return <p>Error...</p>;

  const categoriesList = categories.map((category) => (
    <div>{category.title}</div>
  ));

  return <div>{categoriesList}</div>;
}
