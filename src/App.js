import { getCollection } from "./scripts/fireStore";
import "./styles/app.css";
import HomePage from "./components/HomePage";

function App() {
  getCollection("menu");
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
