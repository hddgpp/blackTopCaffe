// components/OrderGenerator/BudgetInput.jsx
import React, { useState } from 'react';
import './OrderGenerator.css';

const BudgetInput = ({ onGenerateSuggestions, isLoading }) => {
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (budget && !isLoading) {
      onGenerateSuggestions(parseInt(budget));
    }
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setBudget(value);
    }
  };

  const handleKeyPress = (e) => {
    // Allow Enter key to submit form
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="budget-input-container">
      <form onSubmit={handleSubmit} className="budget-form">
        <div className="budget-input-group">
          <label htmlFor="budget" className="budget-label">
            What's your budget?
          </label>
          <div className="input-wrapper">
           <input
            type="text"
            inputMode="numeric"  
            pattern="[0-9]*"    
            id="budget"
            value={budget}
            onChange={handleBudgetChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter amount"
            className="budget-input"
            maxLength="3"
            disabled={isLoading}
          />
            <span className="currency-symbol">DH</span>
          </div>
          <p className="budget-hint">
            Enter your budget in DH to get AI-powered menu suggestions
          </p>
        </div>
        
        <button 
          type="submit" 
          className={`generate-btn ${!budget || isLoading ? 'disabled' : ''}`}
          disabled={!budget || isLoading}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              Generating Suggestions...
            </>
          ) : (
            'Get AI Suggestions'
          )}
        </button>
      </form>
    </div>
  );
};

export default BudgetInput;