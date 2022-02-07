function isObject(value) {
  const valueType = typeof value;

  return valueType !== null && (valueType === 'object' || valueType === 'function');
}

function deepCopy(originalValue , map = new Map()) {
  if (typeof originalValue === 'function') return originalValue;

  if (typeof originalValue === 'symbol') {
    const newSymbol = Symbol(originalValue.description);

    return newSymbol;
  }

  if (originalValue instanceof Map) {
    const newMap = new Map();
    originalValue.forEach((value, key) => newMap.set(key, value));
    
    return newMap;
  }

  if (originalValue instanceof Set) {
    const newSet = new Set();
    originalValue.forEach(item => newSet.add(item));

    return newSet;
  }

  if (!isObject(originalValue)) return originalValue;

  const newObj = Array.isArray(originalValue) ? [] : {};
  if (map.has(originalValue)) return map.get(originalValue); 
  map.set(originalValue, newObj);

  for (const key in originalValue) {
    newObj[key] = deepCopy(originalValue[key], map);
  }

  const symbolList = Object.getOwnPropertySymbols(originalValue);
  if (symbolList.length > 0) {
    for (const symbol of symbolList) {
      newObj[symbol] = deepCopy(originalValue[symbol], map);
    }
  } 

  return newObj;
}

export { deepCopy };
