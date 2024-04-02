import { Link } from "react-router-dom";
import "./index.css";
const NotFound = () => {
  return (
    <main className="main__error">
      <div className="error_container">
        <div className="error__display">
          <p>404 : PAGE NOT FOUND</p>
          <Link to="/" className="error__link">
            Retour à la page d'accueil
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
