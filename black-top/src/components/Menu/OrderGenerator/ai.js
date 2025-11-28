
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

function findBestMatch(itemName, availableItems) {
  const cleanName = itemName.toLowerCase().trim();
  

  const exactMatch = availableItems.find(item => 
    item.name.toLowerCase().trim() === cleanName
  );
  if (exactMatch) return exactMatch;

  // Removing accents and special characters
  const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedTarget = normalize(cleanName);
  
  const matches = availableItems.map(item => {
    const normalizedItem = normalize(item.name.toLowerCase().trim());
    let score = 0;

    if (normalizedItem.includes(normalizedTarget) || normalizedTarget.includes(normalizedItem)) {
      score += 50;
    }

    const targetWords = normalizedTarget.split(/\s+/);
    const itemWords = normalizedItem.split(/\s+/);
    
    const matchingWords = targetWords.filter(word => 
      itemWords.some(itemWord => itemWord.includes(word) || word.includes(itemWord))
    );
    score += matchingWords.length * 10;

    const lengthDiff = Math.abs(normalizedItem.length - normalizedTarget.length);
    score -= lengthDiff * 0.5;

    const commonSubs = {
      'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
      'à': 'a', 'â': 'a', 'ä': 'a',
      'î': 'i', 'ï': 'i',
      'ô': 'o', 'ö': 'o',
      'ù': 'u', 'û': 'u', 'ü': 'u',
      'ç': 'c'
    };

    let substitutedTarget = normalizedTarget;
    Object.entries(commonSubs).forEach(([accent, normal]) => {
      substitutedTarget = substitutedTarget.replace(new RegExp(accent, 'g'), normal);
    });

    let substitutedItem = normalizedItem;
    Object.entries(commonSubs).forEach(([accent, normal]) => {
      substitutedItem = substitutedItem.replace(new RegExp(accent, 'g'), normal);
    });

    if (substitutedItem === substitutedTarget) {
      score += 30;
    }

    return { item, score };
  }).filter(match => match.score > 5); // Only consider matches with some score

  // Return best match
  if (matches.length > 0) {
    matches.sort((a, b) => b.score - a.score);
    console.log(`Fuzzy match: "${itemName}" → "${matches[0].item.name}" (score: ${matches[0].score})`);
    return matches[0].item;
  }

  return null;
}

const commonItemMappings = {
  // French/English variations
  'latté': 'Latte',
  'cappucino': 'Cappuccino', 
  'expresso': 'Espresso',
  'chocolate': 'Chocolat',
  'crepe': 'Crêpe',
  'waffle': 'Gaufre',
  
  // Plural/singular
  'donut': 'Donut',
  'pancakes': 'Pancake',
  'crepes': 'Crêpe',
  'waffles': 'Gaufre',
  
  // Common typos
  'late': 'Latte',
  'cappuchino': 'Cappuccino',
  'moca': 'Mocha',
  'caramell': 'Caramel'
};

function validateAndCorrectPrices(suggestions, availableItems) {
  return suggestions.map(suggestion => {
    if (!suggestion.items || !Array.isArray(suggestion.items)) {
      return null;
    }

    // Find actual menu items and calculate real total
    const actualItems = suggestion.items.map(itemName => {
      const normalizedInput = itemName.toLowerCase().trim();
      if (commonItemMappings[normalizedInput]) {
        const mappedItem = availableItems.find(item => 
          item.name === commonItemMappings[normalizedInput]
        );
        if (mappedItem) {
          console.log(`Common mapping: "${itemName}" → "${mappedItem.name}"`);
          return mappedItem;
        }
      }

      const matchedItem = findBestMatch(itemName, availableItems);
      return matchedItem;
    }).filter(Boolean);

    const uniqueItems = [];
    const seenNames = new Set();
    actualItems.forEach(item => {
      if (!seenNames.has(item.name)) {
        uniqueItems.push(item);
        seenNames.add(item.name);
      }
    });

    const actualTotal = uniqueItems.reduce((total, item) => {
      return total + extractPrice(item.price);
    }, 0);

    const aiPrice = suggestion.totalPrice || 0;
    const priceDifference = Math.abs(actualTotal - aiPrice);
    const priceIsAccurate = priceDifference <= 5; // Allow 5DH tolerance

    let correctedReasoning = suggestion.reasoning;
    
    if (!priceIsAccurate && actualTotal <= aiPrice) {
      correctedReasoning = `${suggestion.reasoning} (Price corrected from ${aiPrice}DH)`;
    }

    console.log(`Price validation: AI=${aiPrice}DH, Actual=${actualTotal}DH, Accurate=${priceIsAccurate}`);

    return {
      items: uniqueItems.map(item => item.name),
      totalPrice: actualTotal, 
      remainingBudget: suggestion.remainingBudget,
      reasoning: correctedReasoning,
      wasPriceCorrected: !priceIsAccurate,
      originalAiPrice: aiPrice
    };
  }).filter(suggestion => 
    suggestion && 
    suggestion.items.length > 0
  );
}

export async function generateMenuSuggestions(availableItems, budget, activeCategory, isLowBudget = false) {
  try {
    console.log('Sending to AI:', { 
      budget, 
      itemsCount: availableItems.length, 
      category: activeCategory,
      isLowBudget 
    });

    const menuData = availableItems.map(item => ({
      name: item.name,
      price: item.price,
      description: item.description || ""
    }));

    const systemPrompt = isLowBudget 
      ? `You are a cafe menu expert at Blacktop Coffee. The user has a LIMITED budget.
         Suggest 1-2 affordable items that fit within their budget.
         
         CRITICAL RULES FOR LOW BUDGET:
         - Suggest 1-2 items MAXIMUM
         - Total price MUST be less than or equal to budget
         - Use EXACT item names from this list: ${availableItems.map(item => item.name).join(', ')}
         - Focus on best value items
         - Single items are acceptable
         - Return ONLY valid JSON
         
         JSON FORMAT:
         {
           "suggestions": [
             {
               "items": ["Exact Item Name"],
               "totalPrice": 35,
               "reasoning": "Why this is good value"
             }
           ]
         }`
      : `You are a cafe menu expert at Blacktop Coffee. The user provides a budget in DH and available menu items.
         Suggest 2-3 smart combinations that fit within their budget.
         
         CRITICAL RULES:
         - Total price MUST be less than or equal to budget
         - Use EXACT item names from this list: ${availableItems.map(item => item.name).join(', ')}
         - For 2-item combinations: ALWAYS pair ONE drink with ONE dessert/food item
         - For 3-item combinations: Include variety (drink + food + maybe another item)
         - NEVER suggest multiple drinks only or multiple desserts only
         - Prefer logical pairings (coffee + pastry, tea + crepe, smoothie + donut)
         - Consider item descriptions for complementary flavors
         - Return ONLY valid JSON, no other text or explanations
         
         REQUIRED JSON FORMAT:
         {
           "suggestions": [
             {
               "items": ["Exact Drink Name", "Exact Food Name"],
               "totalPrice": 65,
               "reasoning": "Brief explanation why this combo works well"
             }
           ]
         }`;

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user", 
            content: `Budget: ${budget}DH. 
            Current category: ${activeCategory}.
            Available menu items: ${JSON.stringify(menuData)}.
            Please suggest combinations that fit my budget.`
          }
        ],
        max_tokens: 1500,
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const aiContent = data.choices[0].message.content;
    console.log('AI Raw Response:', aiContent);

    let parsed;
    try {
      parsed = JSON.parse(aiContent);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      throw new Error('AI returned invalid JSON format');
    }
    
    if (!parsed.suggestions || !Array.isArray(parsed.suggestions)) {
      throw new Error('Invalid AI response format: missing suggestions array');
    }

    const validatedSuggestions = validateAndCorrectPrices(parsed.suggestions, availableItems);

    const budgetValidSuggestions = validatedSuggestions.filter(suggestion => 
      suggestion.totalPrice <= budget
    );

    console.log('Final validated suggestions:', budgetValidSuggestions);
    return budgetValidSuggestions;

  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
}

export function extractPrice(priceString) {
  return parseInt(priceString.replace('DH', '').trim());
}