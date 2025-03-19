import { useState, useEffect } from 'react';
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

    interface ErrorState {
        initialInvestment?: string;
        annualContribution?: string;
        monthlyContribution?: string;
        interestRate?: string;
        investmentLength?: string;
    }

    const [errors, setErrors] = useState<ErrorState>({});
    const [endingBalance, setEndingBalance] = useState(0);
    const [totalPrincipal, setTotalPrincipal] = useState(0);
    const [totalContributions, setTotalContributions] = useState(0);
    const [interestOfInitial, setInterestOfInitial] = useState(0);
    const [interestOfContributions, setInterestOfContributions] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    useEffect(() => {
        const savedValues = {
            initialInvestment: localStorage.getItem('initialInvestment') || '',
            annualContribution: localStorage.getItem('annualContribution') || '',
            monthlyContribution: localStorage.getItem('monthlyContribution') || '',
            contributionTiming: localStorage.getItem('contributionTiming') || 'End',
            interestRate: localStorage.getItem('interestRate') || '',
            compound: localStorage.getItem('compound') || 'Annually',
            investmentLength: localStorage.getItem('investmentLength') || '',
        };

        // Set the state for all fields
        setInitialInvestment(savedValues.initialInvestment);
        setAnnualContribution(savedValues.annualContribution);
        setMonthlyContribution(savedValues.monthlyContribution);
        setContributionTiming(savedValues.contributionTiming);
        setInterestRate(savedValues.interestRate);
        setCompound(savedValues.compound);
        setInvestmentLength(savedValues.investmentLength);
    }, []);

    useEffect(() => {
        // Only attempt calculation if all fields are filled
        if (
            initialInvestment.trim() !== '' &&
            annualContribution.trim() !== '' &&
            monthlyContribution.trim() !== '' &&
            interestRate.trim() !== '' &&
            investmentLength.trim() !== ''
        ) {
            calculateInvestment();
        }
    }, [initialInvestment, annualContribution, monthlyContribution, interestRate, investmentLength, contributionTiming, compound]);





    const handleBlur = (key: string, value: string) => {
        localStorage.setItem(key, value);
    };

    const validateInputs = () => {
        // eslint-disable-next-line prefer-const
        let newErrors: {
            initialInvestment?: string; interestRate?: string; investmentLength?: string;
            annualContribution?: string; monthlyContribution?: string
        } = {};
        if (!initialInvestment || parseFloat(initialInvestment) < 0) newErrors.initialInvestment = 'Enter a valid initial investment';
        if (!annualContribution || parseFloat(annualContribution) < 0) newErrors.annualContribution = 'Enter a valid annual contribution';
        if (!monthlyContribution || parseFloat(monthlyContribution) < 0) newErrors.monthlyContribution = 'Enter a valid monthly contribution';
        if (!interestRate || parseFloat(interestRate) < 0) newErrors.interestRate = 'Enter a valid interest rate';
        if (!investmentLength || parseFloat(investmentLength) <= 0) newErrors.investmentLength = 'Enter a valid investment length';
        if (parseFloat(initialInvestment) > 1000000000) newErrors.initialInvestment = 'Initial investment max value is 1,000,000,000';
        if (parseFloat(annualContribution) > 1000000000) newErrors.annualContribution = 'Annual contribution max value is 1,000,000,000';
        if (parseFloat(monthlyContribution) > 1000000000) newErrors.monthlyContribution = 'Monthly contribution max value is 1,000,000,000';
        if (parseFloat(interestRate) > 1000) newErrors.interestRate = 'Interest rate max value is 1,000';
        if (parseFloat(investmentLength) > 10000) newErrors.investmentLength = 'Investment length max value is 10,000';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const compoundOptions = ['Annually', 'Semi-Annually', 'Quarterly', 'Monthly', 'Daily', 'Continuously'];
    const timingOptions = ['Beginning', 'End'];

    const calculateInvestment = () => {
        if (!validateInputs()) return;

        const P = parseFloat(initialInvestment) || 0;
        const r = (parseFloat(interestRate) || 0) / 100;
        const t = parseFloat(investmentLength) / 12 || 0;
        const totalMonths = parseFloat(investmentLength) || 0;
        const monthlyContrib = parseFloat(monthlyContribution) || 0;
        const annualContrib = parseFloat(annualContribution) || 0;

        let A, interestOnInitial, contribTotal = 0, interestOnContribs = 0;

        if (compound === 'Continuously') {
            A = P * Math.exp(r * t);
            interestOnInitial = A - P;

            for (let i = 1; i <= totalMonths; i++) {
                let factor = Math.exp(r * ((totalMonths - i) / 12)) - 1;
                if (contributionTiming === 'Beginning') factor *= Math.exp(r / 12);
                contribTotal += monthlyContrib;
                interestOnContribs += monthlyContrib * factor;
            }

            for (let i = 1; i <= t; i++) {
                let factor = Math.exp(r * (t - i)) - 1;
                if (contributionTiming === 'Beginning') factor *= Math.exp(r);
                contribTotal += annualContrib;
                interestOnContribs += annualContrib * factor;
            }
        } else {
            const n = compound === 'Annually' ? 1 : compound === 'Semi-Annually' ? 2 :
                compound === 'Quarterly' ? 4 : compound === 'Monthly' ? 12 : 365;
            A = P * Math.pow(1 + r / n, n * t);
            interestOnInitial = A - P;

            for (let i = 1; i <= totalMonths; i++) {
                let factor = Math.pow(1 + r / n, n * ((totalMonths - i) / 12)) - 1;
                if (contributionTiming === 'Beginning') factor *= 1 + r / n;
                contribTotal += monthlyContrib;
                interestOnContribs += monthlyContrib * factor;
            }

            for (let i = 1; i <= t; i++) {
                let factor = Math.pow(1 + r / n, n * (t - i)) - 1;
                if (contributionTiming === 'Beginning') factor *= 1 + r / n;
                contribTotal += annualContrib;
                interestOnContribs += annualContrib * factor;
            }
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

                {/* Initial Investment */}
                <div className="input-group">
                    <label>Initial Investment:</label>
                    <div className="input-wrapper">
                        <span className="dollar-sign">$</span>
                        <input
                            type="number"
                            value={initialInvestment}
                            onChange={(e) => setInitialInvestment(e.target.value)}
                            onBlur={() => handleBlur('initialInvestment', initialInvestment)}
                        />
                    </div>
                    {errors.initialInvestment && <p className="error-text">{errors.initialInvestment}</p>}
                </div>

                {/* Annual Contribution */}
                <div className="input-group">
                    <label>Annual Contribution:</label>
                    <div className="input-wrapper">
                        <span className="dollar-sign">$</span>
                        <input
                            type="number"
                            value={annualContribution}
                            onChange={(e) => setAnnualContribution(e.target.value)}
                            onBlur={() => handleBlur('annualContribution', annualContribution)}
                        />
                    </div>
                    {errors.annualContribution && <p className="error-text">{errors.annualContribution}</p>}
                </div>

                {/* Monthly Contribution */}
                <div className="input-group">
                    <label>Monthly Contribution:</label>
                    <div className="input-wrapper">
                        <span className="dollar-sign">$</span>
                        <input
                            type="number"
                            value={monthlyContribution}
                            onChange={(e) => setMonthlyContribution(e.target.value)}
                            onBlur={() => handleBlur('monthlyContribution', monthlyContribution)}
                        />
                    </div>
                    {errors.monthlyContribution && <p className="error-text">{errors.monthlyContribution}</p>}
                </div>

                {/* Contribution Timing */}
                <label>Contribution Timing:</label>
                <select
                    className="dropdown"
                    value={contributionTiming}
                    onChange={(e) => setContributionTiming(e.target.value)}
                    onBlur={() => handleBlur('contributionTiming', contributionTiming)}
                >
                    {timingOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                {/* Interest Rate */}
                <div className="input-group">
                    <label>Interest Rate (% per year):</label>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        onBlur={() => handleBlur('interestRate', interestRate)}
                    />
                    {errors.interestRate && <p className="error-text">{errors.interestRate}</p>}
                </div>

                {/* Compounding */}
                <label>Compounding:</label>
                <select
                    className="dropdown"
                    value={compound}
                    onChange={(e) => setCompound(e.target.value)}
                    onBlur={() => handleBlur('compound', compound)}
                >
                    {compoundOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                {/* Investment Length */}
                <div className="input-group">
                    <label>Investment Length (months):</label>
                    <input
                        type="number"
                        value={investmentLength}
                        onChange={(e) => setInvestmentLength(e.target.value)}
                        onBlur={() => handleBlur('investmentLength', investmentLength)}
                    />
                    {errors.investmentLength && <p className="error-text">{errors.investmentLength}</p>}
                </div>

                <button onClick={calculateInvestment}>Calculate</button>
            </div>

            {/* Output Section */}
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
