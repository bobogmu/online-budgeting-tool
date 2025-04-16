import './BudgetVisualization.css';
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

interface BudgetVisualizationProps {
  monthlyIncome: number;
  yearlyIncome: number;
  totalMonthlyExpenses: number;
  totalYearlyExpenses: number;
  monthlyDisposableIncome: number;
  yearlyDisposableIncome: number;
}

const BudgetVisualization: React.FC<BudgetVisualizationProps> = ({ monthlyIncome, yearlyIncome, totalMonthlyExpenses, totalYearlyExpenses, monthlyDisposableIncome, yearlyDisposableIncome }) => {
  const [showChart, setShowChart] = useState(false);

  const monthlyData = [
    {
      name: 'Monthly',
      Income: monthlyIncome,
      Expenses: totalMonthlyExpenses,
      Disposable: monthlyDisposableIncome
    }
  ];

  const yearlyData = [
    {
      name: 'Yearly',
      Income: yearlyIncome,
      Expenses: totalYearlyExpenses,
      Disposable: yearlyDisposableIncome
    }
  ];

  return (
    <div className="budget-visualization">
      <h1>Results</h1>
      <button onClick={() => setShowChart(!showChart)}>{showChart ? 'Show Table' : 'Show Bar Chart'}</button>

      {!showChart ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Monthly</th>
              <th>Yearly</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Income</td>
              <td>${monthlyIncome.toFixed(2)}</td>
              <td>${yearlyIncome.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Expenses</td>
              <td>${totalMonthlyExpenses.toFixed(2)}</td>
              <td>${totalYearlyExpenses.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Disposable</td>
              <td>${monthlyDisposableIncome.toFixed(2)}</td>
              <td>${yearlyDisposableIncome.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div style={{ width: '100%' }}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend layout="horizontal" align="center" />
              <Bar dataKey="Income" fill="#82ca9d" />
              <Bar dataKey="Expenses" fill="#8884d8" />
              <Bar dataKey="Disposable" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend layout="horizontal" align="center" />
              <Bar dataKey="Income" fill="#82ca9d" />
              <Bar dataKey="Expenses" fill="#8884d8" />
              <Bar dataKey="Disposable" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BudgetVisualization;
