import { Route, Routes } from "react-router-dom";
import Budget from "./Budget/Budget";
import InterestCalculator from "./InterestCalculator/InterestCalculator";
import NodeButton from "../NodeButton/NodeButton";

import "./Tools.css";

function Tools() {
  return (
    <div>
      {/* Routes for tool page */}
      <div className="tool-section">
        <Routes>
          {/* Route for budget */}
          <Route path="budget" element={<Budget />} />
          {/* Route for interest calculator */}
          <Route path="interest-calculator" element={<InterestCalculator />} />
        </Routes>
      </div>
      {/* Tool buttons */}
      <div className="button-grid">
        <NodeButton label="Budget" link="/tools/budget"></NodeButton>
        <NodeButton
          label="Interest"
          link="/tools/interest-calculator"
        ></NodeButton>
      </div>
    </div>
  );
}
export default Tools;
