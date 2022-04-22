import "../styles/footer.css";
import LogoInstagram from "../images/instagram-brands.svg";
import LogoFacebook from "../images/facebook-brands.svg";
import { ExternalLink } from "react-external-link";

export default function Footer() {
  return (
    <footer className="footer-content">
      <ExternalLink href="https://www.instagram.com/">
        <img src={LogoInstagram} className="footer-img" />
      </ExternalLink>
      <ExternalLink href="https://www.facebook.com/">
        <img src={LogoFacebook} className="footer-img" />
      </ExternalLink>
    </footer>
  );
}
