/**
 * A function to check and return a given default value if tests does not pass.
 * @param {Any} variable The original variable to be checked
 * @param {Any} defaultValue The default value to be set if test does not pass
 */
const defaultify = (variable, defaultValue) => {
  if (variable === '') return defaultValue;
  if (variable === undefined) return defaultValue;
  if (variable === null) return defaultValue;
  if (parseInt(variable, 10) < 0) return defaultValue;
  if (typeof variable === 'undefined') return defaultValue;

  return variable;
};
module.exports = defaultify;
