import { useState, useEffect } from 'react';
import './Budget.css';

function Budget() {
  //Variables for income
  const [incomeFrequency, setIncomeFrequency] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');

  // Manage multiple rows of expenses
  // array of objects where each object has two properties, a string and a number
  // The array will be appended to as the user addes expenses
  const [expenses, setExpenses] = useState<{ description: string; amount: number }[]>([]);

  // States to store monthly expenses and yearly expenses
  const [totalMonthlyExpenses, setTotalMonthlyExpenses] = useState(0);
  const [totalYearlyExpenses, setTotalYearlyExpenses] = useState(0);

  // State to store monthly and yearly income
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [yearlyIncome, setYearlyIncome] = useState(0);

  // Function to add a new row
  const addExpenseRow = () => {
    setExpenses([...expenses, { description: '', amount: 0 }]);
  };

  // Function to handle change in the inputs
  const handleExpenseChange = (index: number, field: 'description' | 'amount', value: string) => {
    // Create a new array with the updated expense data
    const updatedExpenses = [...expenses];

    if (field === 'amount') {
      // Ensure the value is a number for the 'amount' field
      updatedExpenses[index][field] = parseFloat(value);
    } else {
      // Otherwise, it's a description (a string)
      updatedExpenses[index][field] = value;
    }

    // Update state with the new expenses array
    setExpenses(updatedExpenses);

    // Log updates
    console.log('Updated Expenses:', updatedExpenses); // Logs the updated expenses to the console
  };

  // Calculate the users income based on frequency and amount
  const calculateIncome = () => {
    const amount = incomeAmount === '' ? 0 : Number(incomeAmount); // Ensure income amount is a number (string by default)

    // Switch to convert frequency and amount to monthly and yearly income
    // Switch will return a object with monthly and yearly values
    switch (incomeFrequency) {
      case 'weekly':
        return { monthly: amount * 4.33, yearly: amount * 52 };
      case 'biweekly':
        return { monthly: amount * 2.17, yearly: amount * 26 };
      case 'monthly':
        return { monthly: amount, yearly: amount * 12 };
      case 'yearly':
        return { monthly: amount / 12, yearly: amount };
      default:
        return { monthly: 0, yearly: 0 };
    }
  };

  // Update monthlyIncome and yearlyIncome whenever incomeAmount or incomeFrequency changes
  useEffect(() => {
    const { monthly, yearly } = calculateIncome();
    setMonthlyIncome(monthly); // Set the monthly income state
    setYearlyIncome(yearly); // Set the yearly income state
  }, [incomeAmount, incomeFrequency]); // Depend on incomeAmount and incomeFrequency changes

  // Hook to execute when expenses changes to calculate total monthly and yearly expenses
  // Filtesr out NaN so blank fields don't mess up calculations
  useEffect(() => {
    let monthlyTotal = expenses.reduce((sum, expense) => sum + (Number.isNaN(expense.amount) ? 0 : expense.amount), 0);
    setTotalMonthlyExpenses(monthlyTotal);
    setTotalYearlyExpenses(monthlyTotal * 12);
  }, [expenses]);

  const calculateDisposableIncome = () => {
    console.log('Calculating Budget');
    console.log('Monthly Income: ' + monthlyIncome);
    console.log('Yearly Income: ' + yearlyIncome);
    console.log('Expenses: ' + totalMonthlyExpenses);
    var yearlyExpenses = totalMonthlyExpenses * 12;
    var yearlyDisposableIncome = yearlyIncome - yearlyExpenses;
    console.log('Yearly Disposable Incom: ' + yearlyDisposableIncome);
    return 0;
  };

  return (
    // Main container for budget screen
    <div className="main">
      {/* Section for user to input all information */}
      <div className="input-section">
        {/* Section for user to specify income*/}
        <div className="income-container">
          {/* Income frequency drop down*/}
          <h1>Income</h1>
          <div className="form-group-input">
            <label htmlFor="incomeFrequency">Income Frequency:</label>
            <select id="incomeFrequency" value={incomeFrequency} onChange={(e) => setIncomeFrequency(e.target.value)}>
              <option value="">Select Frequency</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          {/* Income amount text box*/}
          <div className="form-group-input">
            <label htmlFor="incomeAmount">Income Amount ($):</label>
            <input id="incomeAmount" type="number" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} placeholder="Enter net income" />
          </div>
        </div>
        {/* Section for user to specify expenses */}
        {/* Expenses Section */}
        <div className="expense-container">
          <h1>Monthly Expenses</h1>
          {/* Dynamically render each expense row */}
          {expenses.map((expense, index) => (
            <div className="form-group-input" key={index}>
              <input type="text" placeholder="Expense Description" value={expense.description} onChange={(e) => handleExpenseChange(index, 'description', e.target.value)} />
              <input type="number" placeholder="Amount" value={expense.amount} onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)} />
            </div>
          ))}
          {/* Add expense button */}
          <button className="add-expense-button" onClick={addExpenseRow}>
            Add Expense
          </button>
        </div>
        {/* Results / calculated values */}
      </div>
      <div className="output-container">
        <h1>Results</h1>
        <p>Monthly Income: ${calculateIncome().monthly.toFixed(2)}</p>
        <p>Yearly Income: ${calculateIncome().yearly.toFixed(2)}</p>
        <p>Monthly Expenses: ${totalMonthlyExpenses.toFixed(2)}</p>
        <p>Yearly Expenses: ${totalYearlyExpenses.toFixed(2)}</p>

        <p>Monthly Disposable Income: ${calculateDisposableIncome().toFixed(2)}</p>
        <p>Yearly Disposable Income: ${calculateDisposableIncome().toFixed(2)}</p>
      </div>
    </div>
  );
}
export default Budget;
