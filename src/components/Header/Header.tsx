import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="main-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tools">Tools</Link> {/* Use Link for navigation */}
          </li>
          <li>
            <Link to="/contact">Contact</Link> {/* Use Link for navigation */}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
