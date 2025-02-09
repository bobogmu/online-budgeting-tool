import "./ToolBar.css";
import { Link } from "react-router-dom";

function ToolBar() {
  return (
    <div>
      <nav id="tools-nav">
        <ul className="tools-nav">
          <li>
            <Link to="/tools/budget">Budget</Link>{" "}
            {/* Use Link for navigation */}
          </li>
          <li>
            <a href="/tools/interest-calculator">Interest Calculator</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default ToolBar;
