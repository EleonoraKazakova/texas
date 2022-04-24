import { Link } from "react-router-dom";
import "../styles/homePage.sass";
import "../styles/base/button.sass";

export default function HomePage() {
  return (
    <main className="homePage-block">
      <div className="homePage-text">
        <h1 className="homePage-title">Texas</h1>
        <h3>BBQ restaurant</h3>
        <button className="button">
          <Link to={`/menu`}>
            <p className="homePage-text-button">Open menu</p>
          </Link>
        </button>
      </div>
    </main>
  );
}
