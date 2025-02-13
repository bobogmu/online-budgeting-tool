// Inspriation: https://www.calculator.net/interest-calculator.html

import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './InterestCalculator.css';

function InterestCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [annualContribution, setAnnualContribution] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [contributionTiming, setContributionTiming] = useState('End');
  const [interestRate, setInterestRate] = useState('');
  const [compound, setCompound] = useState('Annually');
  const [investmentLength, setInvestmentLength] = useState('');

  const [endingBalance, setEndingBalance] = useState(0);
  const [totalPrincipal, setTotalPrincipal] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [interestOfInitial, setInterestOfInitial] = useState(0);
  const [interestOfContributions, setInterestOfContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const compoundOptions = ['Annually', 'Semi-Annually', 'Quarterly', 'Monthly', 'Daily', 'Continuously'];
  const timingOptions = ['Beginning', 'End'];

  const calculateInvestment = () => {
    const P = parseFloat(initialInvestment) || 0;
    const r = (parseFloat(interestRate) || 0) / 100;
    const n = compound === 'Continuously' ? 0 : compound === 'Annually' ? 1 : compound === 'Semi-Annually' ? 2 : compound === 'Quarterly' ? 4 : compound === 'Monthly' ? 12 : 365;
    const t = (parseFloat(investmentLength) || 0) / 12;
    const totalMonths = parseFloat(investmentLength) || 0;
    const monthlyContrib = parseFloat(monthlyContribution) || 0;
    const annualContrib = parseFloat(annualContribution) || 0;

    // Interest on Initial Investment
    const A = n === 0 ? P * Math.exp(r * t) : P * Math.pow(1 + r / n, n * t);
    const interestOnInitial = A - P;

    // Interest on Contributions
    let contribTotal = 0;
    let interestOnContribs = 0;

    for (let i = 1; i <= totalMonths; i++) {
      let factor = Math.pow(1 + r / n, n * ((totalMonths - i) / 12));
      if (contributionTiming === 'Beginning') factor *= 1 + r / n;
      contribTotal += monthlyContrib;
      interestOnContribs += monthlyContrib * (factor - 1);
    }
    for (let i = 1; i <= t; i++) {
      let factor = Math.pow(1 + r / n, n * (t - i));
      if (contributionTiming === 'Beginning') factor *= 1 + r / n;
      contribTotal += annualContrib;
      interestOnContribs += annualContrib * (factor - 1);
    }

    setEndingBalance(A + contribTotal + interestOnContribs);
    setTotalPrincipal(P);
    setTotalContributions(contribTotal);
    setInterestOfInitial(interestOnInitial);
    setInterestOfContributions(interestOnContribs);
    setTotalInterest(interestOnInitial + interestOnContribs);
  };

  const data = [
    { name: 'Initial Investment', value: totalPrincipal, color: '#007bff' }, // Blue
    { name: 'Contributions', value: totalContributions, color: '#28a745' }, // Green
    { name: 'Total Interest Earned', value: totalInterest, color: '#dc3545' } // Red
  ];

  return (
    <div className="calculator-container">
      <div className="input-section">
        <h2>Investment Details</h2>

        <label>Initial Investment:</label>
        <div className="input-group">
          <span className="dollar-sign">$</span>
          <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} />
        </div>

        <label>Annual Contribution:</label>
        <div className="input-group">
          <span className="dollar-sign">$</span>
          <input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(e.target.value)} />
        </div>

        <label>Monthly Contribution:</label>
        <div className="input-group">
          <span className="dollar-sign">$</span>
          <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
        </div>

        <label>Contribution Timing:</label>
        <select className="dropdown" value={contributionTiming} onChange={(e) => setContributionTiming(e.target.value)}>
          {timingOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label>Interest Rate (% per year):</label>
        <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />

        <label>Compounding:</label>
        <select className="dropdown" value={compound} onChange={(e) => setCompound(e.target.value)}>
          {compoundOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label>Investment Length (months):</label>
        <input type="number" value={investmentLength} onChange={(e) => setInvestmentLength(e.target.value)} />

        <button onClick={calculateInvestment}>Calculate</button>
      </div>

      <div className="output-section">
        <h2>Results</h2>
        <p>Ending Balance: ${endingBalance.toFixed(2)}</p>
        <p>Total Principal: ${totalPrincipal.toFixed(2)}</p>
        <p>Total Contributions: ${totalContributions.toFixed(2)}</p>
        <p>Interest on Initial Investment: ${interestOfInitial.toFixed(2)}</p>
        <p>Interest on Contributions: ${interestOfContributions.toFixed(2)}</p>
        <p>
          <strong>Total Interest Earned:</strong> ${totalInterest.toFixed(2)}
        </p>

        <PieChart width={400} height={300}>
          <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          {totalInterest > 0 && <Legend />}
        </PieChart>
      </div>
    </div>
  );
}

export default InterestCalculator;
