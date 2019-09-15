/**
 * A function to check and return a given default value if tests does not pass
 * @param {Any} variable The original variable to be checked
 * @param {Any} defaultValue The default value to be set
 */
const defaultifyValue = (variable, defaultValue) => {
  if (variable === '') return defaultValue;
  if (variable === undefined) return defaultValue;
  if (variable === null) return defaultValue;
  if (parseInt(variable, 10) < 0) return defaultValue;
  if (typeof variable === 'undefined') return defaultValue;

  return variable;
};

/**
 * A funtion to check and return a given default object if test does not pass
 * @param {Object} object The passed in object to be checked
 * @param {Object} defaultObject The default object to be set
 */
const defaultifyObject = (object, defaultObject) => {
  const finalObject = {};
  Object.entries(defaultObject).forEach((pair) => {
    const key = pair[0];
    const defaultValue = pair[1];

    if (Object.prototype.hasOwnProperty.call(object, key)) {
      // Have the key
      finalObject[key] = defaultifyValue(object[key], defaultValue);
    } else {
      finalObject[key] = defaultValue;
    }
  });
  return finalObject;
};


module.exports.defaultifyValue = defaultifyValue;
module.exports.defaultifyObject = defaultifyObject;
