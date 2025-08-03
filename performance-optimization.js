// Performance optimization: Cache frequently accessed data
const cache = new Map();

function optimizedFunction(key) {
  // Check cache first for better performance
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  // Expensive computation
  const result = expensiveComputation(key);
  
  // Cache the result for future fast access
  cache.set(key, result);
  
  return result;
}

function expensiveComputation(key) {
  // Simulate expensive operation
  return `Processed: ${key}`;
}

module.exports = { optimizedFunction }; 