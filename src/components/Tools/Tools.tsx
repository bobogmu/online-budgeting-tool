import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Budget from "./Budget/Budget";
import InterestCalculator from "./InterestCalculator/InterestCalculator";

import "./Tools.css";
import ToolBar from "./ToolBar/ToolBar";

function Tools() {
  return (
    <div>
      <ToolBar />
      {/* Routes for tool page */}
      <Routes>
        {/* Default route */}
        <Route index element={<Navigate to="budget" />} />
        {/* Explicit route */}
        <Route path="budget" element={<Budget />} />
        {/* Interest Calculator Route */}
        <Route path="interest-calculator" element={<InterestCalculator />} />
      </Routes>
    </div>
  );
}
export default Tools;
