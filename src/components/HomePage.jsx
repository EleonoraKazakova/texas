import { useParams, Link } from "react-router-dom";
import "../styles/homePage.css";
import "../styles/base/button.css";

export default function HomePage() {
  const params = useParams();

  return (
    <div className="welcomePage-block">
      <div className="homePage-text">
        <h1 className="welcomePage-title">Texas</h1>
        <h3>BBQ restaurant</h3>
        <button className="button">
          <Link to={`/menu`}>
            <p className="homePage-text-button">Open menu</p>
          </Link>
        </button>
      </div>
    </div>
  );
}
