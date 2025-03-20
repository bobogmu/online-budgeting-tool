import './Help.css';

// Contact page
function Help() {
  return (
    // Container for contact page
    <div className="help-container">
      <div className="important-terms">
        {/* Important Terms Section */}
        <div className="important-terms">
          <h1>Important Terms</h1>
          <div className="terms-list">
            <div className="term-item">
              <h3>Budget</h3>
              <p>A financial plan that outlines your expected income and expenses over a specific period, helping you manage your money effectively.</p>
            </div>

            <div className="term-item">
              <h3>Income</h3>
              <p>The total amount of money you earn from all sources, including wages, investments, and other financial gains.</p>
            </div>

            <div className="term-item">
              <h3>Expenses</h3>
              <p>The money you spend on necessities and discretionary items, including rent, groceries, transportation, and entertainment.</p>
            </div>

            <div className="term-item">
              <h3>Disposable</h3>
              <p>The amount of money you have left after deducting expenses from your income, available for saving, investing, or spending.</p>
            </div>
            <div className="term-item">
              <h3>Initial Investment</h3>
              <p>The starting amount of money you invest, also known as the principal.</p>
            </div>
            <div className="term-item">
              <h3>Initial Investment</h3>
              <p>The starting amount of money you invest, also known as the principal.</p>
            </div>

            <div className="term-item">
              <h3>Annual Contribution</h3>
              <p>The amount of money you add to your investment each year to grow your funds.</p>
            </div>

            <div className="term-item">
              <h3>Monthly Contribution</h3>
              <p>The amount of money you contribute to your investment on a monthly basis.</p>
            </div>

            <div className="term-item">
              <h3>Contribution Timing</h3>
              <p>Determines when your contributions are added — either at the beginning or end of a period. Beginning-of-period contributions can earn interest sooner than end-of-period contributions.</p>
            </div>

            <div className="term-item">
              <h3>Interest Rate</h3>
              <p>The percentage at which your money grows over time, based on the compounding frequency. Higher interest rates and more frequent compounding result in greater growth.</p>
            </div>

            <div className="term-item">
              <h3>Compounding</h3>
              <p>The process of earning interest on both your original investment and the interest that accumulates over time. The more frequently interest is compounded, the faster your investment grows. Common types of compounding include:</p>
              <ul>
                <li>
                  <strong>Daily Compounding:</strong> Interest is calculated and added to the principal every day.
                </li>
                <li>
                  <strong>Monthly Compounding:</strong> Interest is calculated and added to the principal once a month.
                </li>
                <li>
                  <strong>Quarterly Compounding:</strong> Interest is compounded every three months.
                </li>
                <li>
                  <strong>Semi-Annually Compounding:</strong> Interest is compounded twice a year, every six months.
                </li>
                <li>
                  <strong>Annually Compounding:</strong> Interest is compounded once per year.
                </li>
                <li>
                  <strong>Continuously Compounding:</strong> Interest is constantly calculated and added to the principal, resulting in the fastest growth. This is based on a mathematical limit rather than periodic intervals.
                </li>
              </ul>
            </div>

            <div className="term-item">
              <h3>Investment Length</h3>
              <p>The number of years you plan to keep your money invested before withdrawing it.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Help;
