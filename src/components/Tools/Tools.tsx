import { Route, Routes, useLocation } from 'react-router-dom';
import Budget from './Budget/Budget';
import InterestCalculator from './InterestCalculator/InterestCalculator';
import NodeButton from '../NodeButton/NodeButton';

import './Tools.css';

import investment_gif from '../../assets/investment.gif';
import budget_gif from '../../assets/piggy_bank.webp';

function Tools() {
  // Gets the current route
  const location = useLocation();

  // Function to check if we should disasbled a certain button
  const isButtonDisabled = (path: string) => {
    return location.pathname === path;
  };

  console.log('Interest Button Disabled:', isButtonDisabled('/tools/budget'));
  console.log('Interest Button Disabled:', isButtonDisabled('/tools/interest-calculator'));

  console.log('Current location:', location.pathname); // Print to console
  return (
    <div>
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
              <div className="tool-preview-section">
                {/* Budget Tool Preview */}
                <div className="tool-preview-card">
                  <h2>💰 Budget Tool</h2>
                  <p>Select "Budget" to track your income and expenses to see your monthly cash flow.</p>
                  <div className="tool-preview-gif">
                    <img src={budget_gif} alt="Budget Tool Demo" />
                  </div>
                </div>

                {/* Interest Calculator Preview */}
                <div className="tool-preview-card">
                  <h2>📈 Interest Calculator</h2>
                  <p>Select "Interest" to quickly calculate interest over time for your investments.</p>
                  <div className="tool-preview-gif">
                    <img src={investment_gif} alt="Interest Calculator Demo" />
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
      {/* Tool buttons */}
      <div className="tool-box">
        <div className="tool-box-title">Tool Box</div>
        <div className="tools-button-grid">
          <NodeButton label="Budget" link="/tools/budget" description="Manage your income and expenses with our budget tool." disabled={isButtonDisabled('/tools/budget')}></NodeButton>
          <NodeButton label="Interest" link="/tools/interest-calculator" description="Perform interest calculations for your finances." disabled={isButtonDisabled('/tools/interest-calculator')}></NodeButton>
        </div>
      </div>
    </div>
  );
}
export default Tools;
