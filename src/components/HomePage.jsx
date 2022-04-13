import "../styles/homePage.css";
import "../styles/base/button.css";

export default function WelcomePage({ setOpenModal }) {
  return (
    <div className="welcomePage-block">
      <div className="homePage-text">
        <h1 className="welcomePage-title">Texas</h1>
        <h3>BBQ restaurant</h3>
        <button className="button">
          <p className="homePage-text-button">Open menu</p>
        </button>
      </div>
    </div>
  );
}
