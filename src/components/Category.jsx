import { useParams, Link } from "react-router-dom";
import { getDocument, getCollection } from "../scripts/fireStore";
import { useEffect, useState } from "react";

export default function Category() {
  const params = useParams();
  const [document, setDocument] = useState([]);

  console.log("params:", params);
  useEffect(() => {
    const path = `categoriesTexas/allDishes/${params.category}`;
    async function loadData(path) {
      const data = await getCollection(path);
      setDocument(data);
    }
    loadData(path);
  }, []);

  console.log("document:", document);

  return (
    <div>
      {document.map((doc) => (
        <div key={doc.title}>
          {doc.title}
          <button>
            <Link to={`/menu/${params.category}/${doc.type}`}>See more</Link>
          </button>
        </div>
      ))}
    </div>
  );
}
