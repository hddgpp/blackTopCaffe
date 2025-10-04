// components/OrderGenerator/OrderGenerator.jsx
import React, { useState, useRef } from 'react'; // 🆕 ADD useRef
import BudgetInput from './BudgetInput';
import AIResults from './AIResults';
import { generateMenuSuggestions } from './ai';
import './OrderGenerator.css';

const OrderGenerator = ({ activeCategory, menuItems, filterCategories }) => {
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userBudget, setUserBudget] = useState(0);
  const [generatedCategory, setGeneratedCategory] = useState('all');
  
  // 🆕 NEW: Ref for scrolling to results
  const resultsRef = useRef(null);

  // Function to extract numeric price from "35DH" string
  const extractPrice = (priceString) => {
    return parseInt(priceString.replace('DH', '').trim());
  };

  // Function to get current filtered items based on active category
  const getCurrentFilteredItems = () => {
    if (activeCategory === 'all') {
      return menuItems.flatMap(category => category.items);
    }
    
    const includedCategories = filterCategories[activeCategory].includes;
    return menuItems
      .filter(category => includedCategories.includes(category.category))
      .flatMap(category => category.items);
  };

  // 🆕 NEW: Smooth scroll function
  const scrollToResults = () => {
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100); // Small delay to ensure DOM is updated
  };

  // Budget validation function
  const validateBudget = (budget, availableItems) => {
    const pricedItems = availableItems.map(item => ({
      ...item,
      numericPrice: extractPrice(item.price)
    })).filter(item => item.numericPrice > 0);

    if (pricedItems.length === 0) {
      return { isValid: false, message: "No items available in this category." };
    }

    const minPrice = Math.min(...pricedItems.map(item => item.numericPrice));
    const avgPrice = pricedItems.reduce((sum, item) => sum + item.numericPrice, 0) / pricedItems.length;

    // ONLY reject if budget is less than absolute minimum
    if (budget < minPrice) {
      return { 
        isValid: false, 
        message: `Budget too low. Minimum item is ${minPrice}DH.`,
        suggestion: `Try ${minPrice}DH or more.`,
        minBudget: minPrice
      };
    }

    // For low budgets, just warn but don't reject
    if (budget < avgPrice) {
      console.log(`Budget ${budget}DH is low but acceptable. Minimum: ${minPrice}DH`);
      return { isValid: true, isLowBudget: true };
    }

    return { isValid: true };
  };

  // Simple combination finder (fallback when AI fails)
  const findCombinations = (items, budget) => {
    const pricedItems = items.map(item => ({
      ...item,
      numericPrice: extractPrice(item.price)
    })).filter(item => item.numericPrice > 0);

    const combinations = [];
    
    // Find combinations that fit budget
    for (let i = 0; i < Math.min(3, pricedItems.length); i++) {
      const combo = [];
      let total = 0;
      let attempts = 0;
      
      // Try to build a combination
      const shuffledItems = [...pricedItems].sort(() => Math.random() - 0.5);
      
      for (const item of shuffledItems) {
        if (total + item.numericPrice <= budget && !combo.find(c => c.name === item.name)) {
          combo.push(item);
          total += item.numericPrice;
          attempts++;
        }
        // Stop if we have a decent combo or tried enough items
        if (combo.length >= 1 && (total >= budget * 0.5 || attempts > 10)) break;
      }
      
      if (combo.length > 0) {
        combinations.push({
          items: combo,
          totalPrice: total,
          remainingBudget: budget - total,
          reasoning: "Great combination from our menu!"
        });
      }
    }
    
    return combinations.slice(0, 3);
  };

  // Main AI suggestion generator - UPDATED WITH SCROLL
  const generateSuggestions = async (budget) => {
    setIsLoading(true);
    setUserBudget(budget);
    setGeneratedCategory(activeCategory);
    
    try {
      const availableItems = getCurrentFilteredItems();
      
      // Validate budget before calling AI
      const budgetValidation = validateBudget(budget, availableItems);
      if (!budgetValidation.isValid) {
        setSuggestions([{
          isError: true,
          message: budgetValidation.message,
          suggestion: budgetValidation.suggestion,
          minBudget: budgetValidation.minBudget
        }]);
        scrollToResults(); // 🆕 SCROLL FOR ERRORS TOO
        return;
      }

      // Use the separate AI service with low budget flag
      const aiSuggestions = await generateMenuSuggestions(
        availableItems, 
        budget, 
        activeCategory,
        budgetValidation.isLowBudget
      );
      
      // Convert AI response to our format
      const combinations = aiSuggestions.map(combo => {
        const items = combo.items.map(itemName => 
          availableItems.find(item => item.name === itemName)
        ).filter(Boolean);

        return {
          items,
          totalPrice: combo.totalPrice,
          remainingBudget: budget - combo.totalPrice,
          reasoning: combo.reasoning
        };
      }).filter(combo => combo.items.length > 0);

      // Handle case where AI returns no valid combinations
      if (combinations.length === 0) {
        // Try fallback algorithm before giving up
        const fallbackCombinations = findCombinations(availableItems, budget);
        if (fallbackCombinations.length === 0) {
          setSuggestions([{
            isError: true,
            message: `No combinations found for ${budget}DH in ${activeCategory}.`,
            suggestion: `Try increasing your budget or select "All" categories.`
          }]);
          scrollToResults(); // 🆕 SCROLL FOR EMPTY RESULTS
          return;
        }
        setSuggestions(fallbackCombinations);
        scrollToResults(); // 🆕 SCROLL FOR FALLBACK RESULTS
        return;
      }

      console.log('AI Combinations:', combinations);
      setSuggestions(combinations);
      scrollToResults(); // 🆕 SCROLL FOR SUCCESS RESULTS

    } catch (error) {
      console.error('AI Generation Failed, using fallback:', error);
      const availableItems = getCurrentFilteredItems();
      const fallbackCombinations = findCombinations(availableItems, budget);
      
      // Handle fallback empty results
      if (fallbackCombinations.length === 0) {
        setSuggestions([{
          isError: true,
          message: `No combinations found for ${budget}DH.`,
          suggestion: "Try increasing your budget or changing categories."
        }]);
        scrollToResults(); // 🆕 SCROLL FOR FALLBACK ERRORS
        return;
      }
      
      setSuggestions(fallbackCombinations);
      scrollToResults(); // 🆕 SCROLL FOR FALLBACK SUCCESS
    } finally {
      setIsLoading(false);
    }
  };

  const clearSuggestions = () => {
    setSuggestions(null);
    setUserBudget(0);
    setGeneratedCategory('all');
  };

  return (
    <div className="order-generator-container">
      <BudgetInput 
        onGenerateSuggestions={generateSuggestions}
        isLoading={isLoading}
      />
      
      {/* 🆕 ADD REF TO RESULTS CONTAINER */}
      <div ref={resultsRef}>
        <AIResults 
          suggestions={suggestions}
          userBudget={userBudget}
          generatedCategory={generatedCategory}
          onClear={clearSuggestions}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default OrderGenerator;