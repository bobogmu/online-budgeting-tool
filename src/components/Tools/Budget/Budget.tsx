import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './Budget.css';

function Budget() {
  // Initialize cookies
  const [cookies, setCookie] = useCookies(['budget']);
  const savedData = cookies.budget || {};

  //Variables for income
  const [incomeFrequency, setIncomeFrequency] = useState(savedData.incomeFrequency || '');
  const [incomeAmount, setIncomeAmount] = useState(savedData.incomeAmount || '');

  // Manage multiple rows of expenses
  // array of objects where each object has two properties, a string and a number
  // The array will be appended to as the user addes expenses
  const [expenses, setExpenses] = useState<{ description: string; amount: number; frequency: string }[]>(savedData.expenses || []);

  // States to store monthly expenses and yearly expenses
  const [totalMonthlyExpenses, setTotalMonthlyExpenses] = useState(0);
  const [totalYearlyExpenses, setTotalYearlyExpenses] = useState(0);

  // Disposable income
  const [monthlyDisposableIncome, setMonthlyDisposableIncome] = useState(0);
  const [yearlyDisposableIncome, setYearlyDisposableIncome] = useState(0);

  // State to store monthly and yearly income
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [yearlyIncome, setYearlyIncome] = useState(0);

  // States to track the last deleted expense
  const [lastDeletedExpense, setLastDeletedExpense] = useState(savedData.lastDeletedExpense || null);

  // Save required data to cookies
  const saveToCookies = () => {
    setCookie('budget', { incomeFrequency, incomeAmount, expenses, lastDeletedExpense }, { path: '/', maxAge: 7 * 24 * 60 * 60 }); // Expires in 7 days
  };

  // Function to add a new row
  const addExpenseRow = () => {
    setExpenses([...expenses, { description: '', amount: 0, frequency: '' }]);
  };

  // Delete a row from the list of expenses
  const deleteExpenseRow = (index: number) => {
    const deletedExpense = expenses[index];
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses); // Update the expenses list
    setLastDeletedExpense(deletedExpense); // Store the last deleted expense
  };

  // Function to restore the last deleted expense
  const undoDelete = () => {
    if (lastDeletedExpense) {
      setExpenses([...expenses, lastDeletedExpense]);
      setLastDeletedExpense(null); // Clear the last deleted expense
    }
  };

  // Function to handle change in the inputs
  const handleExpenseChange = (index: number, field: 'description' | 'amount' | 'frequency', value: string) => {
    // Create a new array with the updated expense data
    const updatedExpenses = [...expenses];

    if (field === 'amount') {
      // Ensure the value is a number for the 'amount' field
      updatedExpenses[index][field] = parseFloat(value);
    } else if (field === 'description') {
      // Tt's a description (a string)
      updatedExpenses[index][field] = value;
    } else {
      updatedExpenses[index][field] = value;
    }

    // Update state with the new expenses array
    setExpenses(updatedExpenses);
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
  // Filter out NaN so blank fields don't mess up calculations
  useEffect(() => {
    // Calcuate total expenses based on frequency
    let monthlyTotal = expenses.reduce((sum, expense) => {
      let amount = Number.isNaN(expense.amount) ? 0 : expense.amount;
      let frequencyMultiplier = 0;

      // Determine multiplier based on frequency
      if (expense.frequency === 'weekly') {
        frequencyMultiplier = 4.33; // Average weeks per month
      } else if (expense.frequency === 'biweekly') {
        frequencyMultiplier = 2.17; // Average biweeks per month
      } else if (expense.frequency === 'monthly') {
        frequencyMultiplier = 1; // Monthly already
      } else if (expense.frequency === 'yearly') {
        frequencyMultiplier = 1 / 12; // Convert yearly to monthly
      }

      // Apply the frequency multiplier to the expense amount and accumulate the total
      return sum + amount * frequencyMultiplier;
    }, 0);

    setTotalMonthlyExpenses(monthlyTotal);
    setTotalYearlyExpenses(monthlyTotal * 12); // Yearly total is just the monthly total multiplied by 12
  }, [expenses]);

  // Calculate monthly and yearly disposable income when expense or income changes
  useEffect(() => {
    setMonthlyDisposableIncome(monthlyIncome - totalMonthlyExpenses);
    setYearlyDisposableIncome(yearlyIncome - totalYearlyExpenses);
  }, [totalMonthlyExpenses, totalYearlyExpenses, monthlyIncome, yearlyIncome]);

  // Save data to cookies whenever income frequency, income amount, or expenses change
  useEffect(() => {
    saveToCookies();
  }, [incomeFrequency, incomeAmount, expenses, lastDeletedExpense]);

  // HTML
  return (
    // Main container for budget screen
    <div className="budget-container">
      {/* Section for user to input all information */}
      <div className="input-section-budget">
        {/* Section for user to specify income*/}
        <div className="income-container">
          {/* Income frequency drop down*/}
          <h1>Income</h1>
          <div className="form-group-input-income">
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
          <div className="form-group-input-income">
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
            <div className="form-group-input-expenses" key={index}>
              <button type="button" className="delete-expense-button" onClick={() => deleteExpenseRow(index)}>
                Delete
              </button>
              <select id="expenseFrequency" value={expense.frequency} onChange={(e) => handleExpenseChange(index, 'frequency', e.target.value)}>
                <option value="">Select Frequency</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <input id="expenseDescription" type="text" placeholder="Expense Name" value={expense.description} onChange={(e) => handleExpenseChange(index, 'description', e.target.value)} />
              <input id="expenseAmount" type="number" placeholder="Amount" value={expense.amount} onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)} />
            </div>
          ))}
          {/* Add expense button */}
          <button className="add-expense-button" onClick={addExpenseRow}>
            Add Expense
          </button>
          {/* Undo Button */}
          {lastDeletedExpense && (
            <button className="delete-expense-undo-button" onClick={undoDelete}>
              Undo Last Delete
            </button>
          )}
        </div>
        {/* Results / calculated values */}
      </div>
      {/* Put results in a table */}
      <div className="output-container-budget">
        <h1>Results</h1>
        <table className="results-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Monthly ($)</th>
              <th>Yearly ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Income</td>
              <td>{calculateIncome().monthly.toFixed(2)}</td>
              <td>{calculateIncome().yearly.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Expenses</td>
              <td>{totalMonthlyExpenses.toFixed(2)}</td>
              <td>{totalYearlyExpenses.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Disposable</td>
              <td>{monthlyDisposableIncome.toFixed(2)}</td>
              <td>{yearlyDisposableIncome.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Budget;
