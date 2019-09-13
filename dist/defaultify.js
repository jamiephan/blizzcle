"use strict";/**
 * A function to check and return a given default value if tests does not pass.
 * @param {Any} variable The original variable to be checked
 * @param {Any} defaultValue The default value to be set if test does not pass
 */var defaultify=function(a,b){return""===a?b:void 0===a?b:null===a?b:0>parseInt(a,10)?b:"undefined"==typeof a?b:a};module.exports=defaultify;