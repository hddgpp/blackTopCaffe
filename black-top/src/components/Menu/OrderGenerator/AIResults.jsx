// components/OrderGenerator/AIResults.jsx
import React from 'react';
import './OrderGenerator.css';

const AIResults = ({ suggestions, userBudget, generatedCategory, onClear, isLoading }) => {
  if (isLoading) {
    return (
      <div className="ai-results-loading">
        <div className="loading-spinner large"></div>
        <p>AI is finding the perfect combinations for you...</p>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  // Handle error states
  if (suggestions[0]?.isError) {
    const error = suggestions[0];
    return (
      <div className="ai-results-container error-state">
        <div className="error-header">
          <div className="error-icon">⚠️</div>
          <h3 className="error-title">Budget Alert</h3>
          <button onClick={onClear} className="clear-suggestions-btn">
            Clear
          </button>
        </div>
        
        <div className="error-content">
          <p className="error-message">{error.message}</p>
          {error.suggestion && (
            <p className="error-suggestion">{error.suggestion}</p>
          )}
          {error.minBudget && (
            <div className="budget-tip">
              <strong>Tip:</strong> Minimum budget for {generatedCategory} is {error.minBudget}DH
            </div>
          )}
        </div>
      </div>
    );
  }

  // Success state - display AI suggestions
  return (
    <div className="ai-results-container">
      <div className="ai-results-header">
        <h3 className="ai-results-title">
          AI Suggestions for {userBudget}DH
          {generatedCategory && generatedCategory !== 'all' && ` (${generatedCategory})`}
        </h3>
        <button onClick={onClear} className="clear-suggestions-btn">
          Clear
        </button>
      </div>
      
      <div className="suggestions-grid">
        {suggestions.map((combo, index) => (
          <div key={index} className="suggestion-card">
            <div className="suggestion-header">
              <span className="suggestion-number">Option {index + 1}</span>
              <span className="suggestion-total">{combo.totalPrice}DH</span>
            </div>
            
            <div className="suggestion-items">
              {combo.items.map((item, itemIndex) => (
                <div key={itemIndex} className="suggestion-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">{item.price}</span>
                </div>
              ))}
            </div>
            
            {combo.reasoning && (
              <div className="suggestion-reasoning">
                <p>{combo.reasoning}</p>
              </div>
            )}
            
            <div className="suggestion-footer">
              <span className="remaining-budget">
                Remaining: {combo.remainingBudget}DH
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIResults;