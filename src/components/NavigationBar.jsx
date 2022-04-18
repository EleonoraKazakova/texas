import "../styles/navigationBar.sass";
import Logo from "../images/logo.png";

export default function NavigationBar() {
  return (
    <nav className="navigationBar-content">
      <img src={Logo} className="navigationBar-logo" />
    </nav>
  );
}
