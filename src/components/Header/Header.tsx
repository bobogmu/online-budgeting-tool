import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
import logo from '../../assets/logo.jpg';
import simple_calc_img from '../../assets/simple-calc-img.png';

import SimpleCalculator from '../SimpleCalculator/SimpleCalculator';

function Header() {
  const location = useLocation(); // Get current URL path
  const [showCalculator, setShowCalculator] = useState(false);

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
      {/* Calculator Dropdown */}
      <div className="simple-calculator-dropdown">
        <button className="simple-calculator-dropbutton" onClick={() => setShowCalculator(!showCalculator)}>
          <img src={simple_calc_img} alt="Simple Calculator" className="simple-calc-img" />
        </button>
        {showCalculator && (
          <div className="simple-nav-calculator-container">
            <SimpleCalculator />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
