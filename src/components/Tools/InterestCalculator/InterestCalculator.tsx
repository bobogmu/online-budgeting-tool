import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    BarChart,
    Bar
} from 'recharts';

import './InterestCalculator.css';

interface FormData {
  initialInvestment: string;
  annualContribution: string;
  monthlyContribution: string;
  interestRate: string;
  investmentLength: string;
}

interface CalculatorResult {
  endingBalance: number;
  totalPrincipal: number;
  totalContributions: number;
  interestEarned: number;
}

interface StepConfig {
  key: keyof FormData;
  label: string;
  description: string;
  validate: (value: string) => boolean;
}

const stepsConfig: StepConfig[] = [
  {
    key: 'initialInvestment',
    label: 'Initial Investment',
    description: 'Enter the amount you are starting with (0 to 100,000,000).',
    validate: (value: string) => {
      const num = parseFloat(value);
      return !isNaN(num) && num >= 0 && num <= 100000000;
    }
  },
  {
    key: 'annualContribution',
    label: 'Annual Contribution',
    description: 'Enter your annual contribution (0 to 100,000,000).',
    validate: (value: string) => {
      const num = parseFloat(value);
      return !isNaN(num) && num >= 0 && num <= 100000000;
    }
  },
  {
    key: 'monthlyContribution',
    label: 'Monthly Contribution',
    description: 'Enter your monthly contribution (0 to 1,000,000).',
    validate: (value: string) => {
      const num = parseFloat(value);
      return !isNaN(num) && num >= 0 && num <= 1000000;
    }
  },
  {
    key: 'interestRate',
    label: 'Interest Rate (%)',
    description: 'Enter the annual interest rate (0 to 100%).',
    validate: (value: string) => {
      const num = parseFloat(value);
      return !isNaN(num) && num >= 0 && num <= 100;
    }
  },
  {
    key: 'investmentLength',
    label: 'Investment Length (months)',
    description: 'Enter the number of months (1 to 1200).',
    validate: (value: string) => {
      const num = parseFloat(value);
      return !isNaN(num) && num > 0 && num <= 1200;
    }
  }
];

function StepByStepInterestCalculator() {
  const [formData, setFormData] = useState<FormData>({
    initialInvestment: '',
    annualContribution: '',
    monthlyContribution: '',
    interestRate: '',
    investmentLength: ''
  });

    const [lineChartData, setLineChartData] = useState<
        { month: number; year: string; balance: number }[]
    >([]);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [chartType, setChartType] = useState("pie");

  // On mount: load saved data from localStorage.
  useEffect(() => {
    const storedData: FormData = {
      initialInvestment: localStorage.getItem('initialInvestment') || '',
      annualContribution: localStorage.getItem('annualContribution') || '',
      monthlyContribution: localStorage.getItem('monthlyContribution') || '',
      interestRate: localStorage.getItem('interestRate') || '',
      investmentLength: localStorage.getItem('investmentLength') || ''
    };
    setFormData(storedData);
  }, []);

  // Update input value and save to localStorage.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    localStorage.setItem(name, value);
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Validate the current step�s input.
  const validateCurrentStep = (): boolean => {
    const currentConfig = stepsConfig[currentStep];
    const value = formData[currentConfig.key];
    if (!currentConfig.validate(value)) {
      setErrors((prev) => ({
        ...prev,
        [currentConfig.key]: `Please enter a valid value for ${currentConfig.label.toLowerCase()}`
      }));
      return false;
    }
    return true;
  };

  // Go to the next step if the current input is valid.
  const nextStep = () => {
    if (validateCurrentStep() && currentStep < stepsConfig.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Allow jumping between steps.
  const jumpToStep = (index: number) => {
    if (index < currentStep) {
      setCurrentStep(index);
    } else if (index === currentStep) {
      return;
    } else {
      if (validateCurrentStep()) {
        setCurrentStep(index);
      }
    }
  };

  // Calculation logic (triggered manually by the user).
    const calculateResults = () => {
        // Validate every field.
        let valid = true;
        stepsConfig.forEach((step) => {
            if (!step.validate(formData[step.key])) {
                valid = false;
                setErrors((prev) => ({
                    ...prev,
                    [step.key]: `Please enter a valid value for ${step.label.toLowerCase()}`
                }));
            }
        });
        if (!valid) return;

        const P = parseFloat(formData.initialInvestment);
        const r = parseFloat(formData.interestRate) / 100;
        const t = parseFloat(formData.investmentLength) / 12;
        const annualContrib = parseFloat(formData.annualContribution);
        const monthlyContrib = parseFloat(formData.monthlyContribution);

        // Basic compound calculation.
        const A = P * Math.pow(1 + r, t);
        const totalContrib = annualContrib * t + monthlyContrib * parseFloat(formData.investmentLength);
        const interestEarned = A - P;
        const endingBalance = A + totalContrib + interestEarned;

        // Get total months and monthly interest rate
        const numMonths = parseFloat(formData.investmentLength);
        const monthlyInterestRate = r / 12;
        let balanceSim = P; // Starting with your initial principal
        const simulationData = [];

        // Simulate the investment balance month by month
        for (let i = 1; i <= numMonths; i++) {
            // Add your monthly contribution first
            balanceSim += monthlyContrib;

            // Add your annual contribution at the end of each year
            if (i % 12 === 0) {
                balanceSim += annualContrib;
            }

            // Apply monthly interest
            balanceSim *= (1 + monthlyInterestRate);

            // Capture the balance for this month (convert the month into a year value for clarity if desired)
            simulationData.push({
                month: i,
                // You could also include a "year" property if you prefer:
                year: (i / 12).toFixed(1),
                balance: parseFloat(balanceSim.toFixed(2))
            });
        }

        // Store the simulation data for the line chart
        setLineChartData(simulationData);

        // Then save your existing totals as before:
        setResult({
            endingBalance,
            totalPrincipal: P,
            totalContributions: totalContrib,
            interestEarned
        });
    }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentStep < stepsConfig.length - 1) {
        nextStep();
      } else {
        calculateResults();
      }
    }
  };

  return (
    <div className="calculator-container">
      {/* Left Section: Progress Bar & Input Area */}
      <div className="input-section">
        <div className="progress-bar">
          {stepsConfig.map((step, index) => {
            let className = 'progress-step';
            if (index === currentStep) {
              className += ' current';
            } else if (index < currentStep) {
              className += ' completed';
            } else {
              className += ' not-done';
            }
            return (
              <div key={index} className={className} onClick={() => jumpToStep(index)}>
                {step.label}
              </div>
            );
          })}
        </div>
        <div className="input-box">
          <h2>{stepsConfig[currentStep].label}</h2>
          <p>{stepsConfig[currentStep].description}</p>
          <input type="number" name={stepsConfig[currentStep].key} value={formData[stepsConfig[currentStep].key]} onChange={handleInputChange} onKeyDown={handleKeyDown} />
          {errors[stepsConfig[currentStep].key] && <p className="error-text">{errors[stepsConfig[currentStep].key]}</p>}
          <div className="button-group">
            {currentStep > 0 && <button onClick={() => setCurrentStep(currentStep - 1)}>Back</button>}
                      {currentStep < stepsConfig.length - 1 ? (
                          <button className="btn-custom-blue" onClick={nextStep}>
                              Next
                          </button>
                      ) : (
                          <button className="btn-custom-blue" onClick={calculateResults}>
                              Calculate
                          </button>
                      )}
          </div>
          {/* The Recalculate button will appear only after a calculation is done */}
          {result && (
            <div className="recalc-container">
              <button onClick={calculateResults}>Recalculate</button>
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Output (only renders if there is a result) */}
          {result && (
              <div className="output-section">
                  <div className="results-box">
                      {/* Results text and data */}
                      <h2>Results</h2>
                      <p>Ending Balance: ${result.endingBalance.toFixed(2)}</p>
                      <p>Total Principal: ${result.totalPrincipal.toFixed(2)}</p>
                      <p>Total Contributions: ${result.totalContributions.toFixed(2)}</p>
                      <p>Total Interest Earned: ${result.interestEarned.toFixed(2)}</p>

                      {/* Chart container with rounded box styling (from .output-section & .results-box) */}
                      <div className="chart-container">
                          {chartType === "pie" && (
                              <PieChart width={400} height={300}>
                                  <Pie
                                      data={[
                                          { name: 'Principal', value: result.totalPrincipal, color: '#007bff' },
                                          { name: 'Contributions', value: result.totalContributions, color: '#28a745' },
                                          { name: 'Interest', value: result.interestEarned, color: '#dc3545' }
                                      ]}
                                      cx="50%"
                                      cy="50%"
                                      outerRadius={100}
                                      dataKey="value"
                                  >
                                      {['#007bff', '#28a745', '#dc3545'].map((color, index) => (
                                          <Cell key={`cell-${index}`} fill={color} />
                                      ))}
                                  </Pie>
                                  <Tooltip />
                                  <Legend />
                              </PieChart>
                          )}

                          {chartType === "line" && (
                              <LineChart
                                  width={500}
                                  height={300}
                                  data={lineChartData}
                              >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis
                                      dataKey="month"
                                      label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                                  />
                                  <YAxis
                                      label={{ value: 'Balance ($)', angle: -90, position: 'insideLeft' }}
                                  />
                                  <Tooltip formatter={(value) => `$${value}`} />
                                  <Legend />
                                  <Line
                                      type="monotone"
                                      dataKey="balance"
                                      name="Total Balance"
                                      stroke="#4d9fc9"
                                      activeDot={{ r: 8 }}
                                  />
                              </LineChart>
                          )}


                          {chartType === "bar" && (
                              <BarChart
                                  width={500}  // Increased width
                                  height={300}
                                  data={[
                                      { name: 'Principal', value: result.totalPrincipal },
                                      { name: 'Contributions', value: result.totalContributions },
                                      { name: 'Interest', value: result.interestEarned }
                                  ]}
                              >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Bar dataKey="value" fill="#4d9fc9" />
                              </BarChart>
                          )}

                      </div>

                      {/* Chart toggle buttons (moved below the chart) */}
                      <div className="chart-toggle">
                          <button
                              onClick={() => setChartType("pie")}
                              className={chartType === "pie" ? "active" : ""}
                          >
                              Pie
                          </button>
                          <button
                              onClick={() => setChartType("line")}
                              className={chartType === "line" ? "active" : ""}
                          >
                              Line
                          </button>
                          <button
                              onClick={() => setChartType("bar")}
                              className={chartType === "bar" ? "active" : ""}
                          >
                              Bar
                          </button>
                      </div>
                  </div>
              </div>
          )}

    </div>
  );
}

export default StepByStepInterestCalculator;
