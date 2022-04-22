import "../styles/navigationBar.sass";
import Logo from "../images/logo.png";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="navigationBar-content">
      <Link to="/">
        <img src={Logo} className="navigationBar-logo" />{" "}
      </Link>
      <div className="navigationBar-block">
        <Link to="/menu">
          <h3>Menu</h3>
        </Link>
        <Link to="/contact">
          <h3>Contact</h3>
        </Link>
      </div>
    </nav>
  );
}
