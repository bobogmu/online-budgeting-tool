import { Route, Routes } from 'react-router-dom';
import Budget from './Budget/Budget';
import InterestCalculator from './InterestCalculator/InterestCalculator';
import NodeButton from '../NodeButton/NodeButton';

import './Tools.css';

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
          {/* Default route for displaying text when no button is clicked */}
          <Route
            path="*"
            element={
              <div className="default-message-box">
                <div className="default-message">No tool selected yet! Pick one from the toolbox below.</div>
              </div>
            }
          />
        </Routes>
      </div>
      {/* Tool buttons */}
      <div className="tool-box">
        <div className="tool-box-title">Tool Box</div>
        <div className="button-grid">
          <NodeButton label="Budget" link="/tools/budget" description="Manage your income and expenses with our budget tool."></NodeButton>
          <NodeButton label="Interest" link="/tools/interest-calculator" description="Perform interest calculations for your finances."></NodeButton>
        </div>
      </div>
    </div>
  );
}
export default Tools;
