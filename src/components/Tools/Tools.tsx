import { Route, Routes } from "react-router-dom";
import Budget from "./Budget/Budget";
import InterestCalculator from "./InterestCalculator/InterestCalculator";
import NodeButton from "../NodeButton/NodeButton";

import "./Tools.css";

function Tools() {
  return (
    <div>
      {/* Routes for tool page */}
      <Routes>
        {/* Explicit route */}
        <Route path="budget" element={<Budget />} />
        {/* Interest Calculator Route */}
        <Route path="interest-calculator" element={<InterestCalculator />} />
      </Routes>
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
