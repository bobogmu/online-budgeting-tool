import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.jpg';

function Header() {
  const location = useLocation(); // Get current URL path

  return (
    <header className="header">
      <nav>
        <ul className="main-nav">
          <li>
            <Link to="/">
              <img src={logo} alt="OBT Logo" className="nav-logo" />
            </Link>
          </li>
          <li>
            <Link to="/tools" className={location.pathname.startsWith('/tools') ? 'active-link' : ''}>
              Tools
            </Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname.startsWith('/contact') ? 'active-link' : ''}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/help" className={location.pathname.startsWith('/help') ? 'active-link' : ''}>
              Help
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
