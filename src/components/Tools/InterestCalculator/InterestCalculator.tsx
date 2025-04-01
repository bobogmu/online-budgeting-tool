import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './InterestCalculator.css';

// Each step includes numeric bounds for validation.
const stepsConfig = [
    {
        key: 'initialInvestment',
        label: 'Initial Investment',
        description: 'Enter the amount you are starting with (0 to 1,000,000).',
        validate: (value) => {
            const num = parseFloat(value);
            return !isNaN(num) && num >= 0 && num <= 1000000;
        },
    },
    {
        key: 'annualContribution',
        label: 'Annual Contribution',
        description: 'Enter your annual contribution (0 to 1,000,000).',
        validate: (value) => {
            const num = parseFloat(value);
            return !isNaN(num) && num >= 0 && num <= 1000000;
        },
    },
    {
        key: 'monthlyContribution',
        label: 'Monthly Contribution',
        description: 'Enter your monthly contribution (0 to 100,000).',
        validate: (value) => {
            const num = parseFloat(value);
            return !isNaN(num) && num >= 0 && num <= 100000;
        },
    },
    {
        key: 'interestRate',
        label: 'Interest Rate (%)',
        description: 'Enter the annual interest rate (0 to 100%).',
        validate: (value) => {
            const num = parseFloat(value);
            return !isNaN(num) && num >= 0 && num <= 100;
        },
    },
    {
        key: 'investmentLength',
        label: 'Investment Length (months)',
        description: 'Enter the number of months (1 to 600).',
        validate: (value) => {
            const num = parseFloat(value);
            return !isNaN(num) && num > 0 && num <= 600;
        },
    },
];

function StepByStepInterestCalculator() {
    const [formData, setFormData] = useState({
        initialInvestment: '',
        annualContribution: '',
        monthlyContribution: '',
        interestRate: '',
        investmentLength: '',
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState(null);

    // On mount: load saved data from localStorage.
    useEffect(() => {
        const storedData = {
            initialInvestment: localStorage.getItem('initialInvestment') || '',
            annualContribution: localStorage.getItem('annualContribution') || '',
            monthlyContribution: localStorage.getItem('monthlyContribution') || '',
            interestRate: localStorage.getItem('interestRate') || '',
            investmentLength: localStorage.getItem('investmentLength') || '',
        };
        setFormData(storedData);
    }, []);

    // Update input value and save to localStorage.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Save change in state...
        setFormData({ ...formData, [name]: value });
        // ...and to localStorage so data persists.
        localStorage.setItem(name, value);
        // Clear any associated error.
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    // Validate the current step’s input.
    const validateCurrentStep = () => {
        const currentConfig = stepsConfig[currentStep];
        const value = formData[currentConfig.key];
        if (!currentConfig.validate(value)) {
            setErrors((prev) => ({
                ...prev,
                [currentConfig.key]: `Please enter a valid value for ${currentConfig.label.toLowerCase()}`,
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

    // Allow jumping between steps (you can adjust to prevent forward navigation if desired).
    const jumpToStep = (index) => {
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
                    [step.key]: `Please enter a valid value for ${step.label.toLowerCase()}`,
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

        setResult({
            endingBalance,
            totalPrincipal: P,
            totalContributions: totalContrib,
            interestEarned,
        });
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
                    <input
                        type="number"
                        name={stepsConfig[currentStep].key}
                        value={formData[stepsConfig[currentStep].key]}
                        onChange={handleInputChange}
                    />
                    {errors[stepsConfig[currentStep].key] && (
                        <p className="error-text">{errors[stepsConfig[currentStep].key]}</p>
                    )}
                    <div className="button-group">
                        {currentStep > 0 && (
                            <button onClick={() => setCurrentStep(currentStep - 1)}>Back</button>
                        )}
                        {currentStep < stepsConfig.length - 1 ? (
                            <button onClick={nextStep}>Next</button>
                        ) : (
                            <button onClick={calculateResults}>Calculate</button>
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
                        <h2>Results</h2>
                        <p>Ending Balance: ${result.endingBalance.toFixed(2)}</p>
                        <p>Total Principal: ${result.totalPrincipal.toFixed(2)}</p>
                        <p>Total Contributions: ${result.totalContributions.toFixed(2)}</p>
                        <p>Total Interest Earned: ${result.interestEarned.toFixed(2)}</p>
                        <div className="pie-chart-container">
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={[
                                        { name: 'Principal', value: result.totalPrincipal, color: '#007bff' },
                                        { name: 'Contributions', value: result.totalContributions, color: '#28a745' },
                                        { name: 'Interest', value: result.interestEarned, color: '#dc3545' },
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StepByStepInterestCalculator;
