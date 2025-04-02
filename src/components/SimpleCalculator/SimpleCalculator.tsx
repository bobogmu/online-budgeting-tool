import React, { useState } from 'react';
import './SimpleCalculator.css';

const SimpleCalculator: React.FC = () => {
  const [input, setInput] = useState('0');

  const handleButtonClick = (value: string) => {
    if (input === '0') {
      setInput(value);
    } else {
      setInput(input + value);
    }
  };

  const handleClear = () => {
    setInput('0');
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput('Error');
    }
  };

  return (
    <div className="simple-calculator">
      <div className="simple-calculator-display">{input}</div>
      <div className="simple-calculator-buttons">
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
          <button className="simple-calculator-button" key={btn} onClick={() => (btn === '=' ? handleCalculate() : handleButtonClick(btn))}>
            {btn}
          </button>
        ))}
        <button onClick={handleClear} className="clear">
          C
        </button>
      </div>
    </div>
  );
};

export default SimpleCalculator;
