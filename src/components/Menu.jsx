import { getCollection } from "../scripts/fireStore";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/menu.css";

export default function Menu() {
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [menu, setMenu] = useState([]);
  const [status, setStatus] = useState(0);

  //Method
  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setMenu(data);
      setStatus(1);
    }
    loadData("menu");
  }, []);

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCategories(data);
      setStatus(1);
    }
    loadData("categoriesTexas");
  }, []);

  const LinkCategory = categories.map((item) =>
    item.subCategories.map((subCategory) => (
      <div>
        <Link to={`/menu/${subCategory.type}`}>{subCategory.title}</Link>
      </div>
    ))
  );

  if (status === 0) return <p>Loading...</p>;
  if (status === 2) return <p>Error...</p>;

  const menuCards = menu.map((item) => (
    <div key={item.id}>
      <img src={item.imgURL} className="menu-img" alt={item.alt} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  ));

  console.log("LinkCategory:", LinkCategory);
  return (
    <div>
      <div>{menuCards} </div>
      <div>{LinkCategory}</div>
    </div>
  );
}
