"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),LoggerColors=require("./LoggerColors"),LoggerVerbosity=require("./LoggerVerbosity"),Logger=/*#__PURE__*/function(){/**
   * Initialise the settings
   * @param {Function} stdout Function to output the message
   * @param {Boolean} useColor Whether to use ANSI Color code
   * @param {Number} verbosity Verbosity of the Log (From LoggerVerbosity Class)
   */function a(){var b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:console.log,c=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],d=2<arguments.length&&void 0!==arguments[2]?arguments[2]:LoggerVerbosity.minimal;(0,_classCallCheck2["default"])(this,a),this.stdout=b,this.useColor=c,this.verbosity=d}/**
   * Override the settings
   * @param {Function} stdout Function to output the message
   * @param {Boolean} useColor Whether to use ANSI Color code
   * @param {Number} verbosity Verbosity of the Log (From LoggerVerbosity Class)
   */return(0,_createClass2["default"])(a,[{key:"set",value:function set(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:console.log,b=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:LoggerVerbosity.minimal;this.stdout=a,this.useColor=b,this.verbosity=c}/**
     * Specify a string to be outputted into STDOUT.
     * @param {String} str A string to be logged
     */},{key:"log",value:function log(a){if(this.useColor)this.stdout(a);else{// eslint-disable-next-line no-control-regex
var b=/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;this.stdout(a.replace(b,""))}}/**
   * Print a String in a debug style.
   * @param {String} str Specify a string to be printed as debug styled
   */},{key:"debug",value:function debug(b){if(this.verbosity!==LoggerVerbosity.minimal){var c=b;c=LoggerColors.BrightBlue("Debug: ")+c,c=a._addTimeStamp(c),this.log(c)}}/**
   * Print a String in a error style.
   * @param {String} str Specify a string to be printed as error styled
   */},{key:"error",value:function error(b){if(this.verbosity!==LoggerVerbosity.minimal){var c=b;c=LoggerColors.BrightRed("Error: ")+c,c=a._addTimeStamp(c),this.log(c)}}/**
   * Print a String in a warning style.
   * @param {String} str Specify a string to be printed as warning styled
   */},{key:"warn",value:function warn(b){if(this.verbosity!==LoggerVerbosity.minimal){var c=b;c=LoggerColors.BrightYellow("Warn: ")+c,c=a._addTimeStamp(c),this.log(c)}}}],[{key:"_addTimeStamp",value:function _addTimeStamp(a){return"[".concat(LoggerColors.BrightMagenta(+new Date),"] - ").concat(a)}}]),a}();module.exports=Logger;