"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),HTMLDateBuilder=/*#__PURE__*/function(){/**
   * Generare timestamp from data
   * @param {number} timestamp Timestamp from Data
   */function a(){var b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;(0,_classCallCheck2["default"])(this,a),this.timestamp=new Date(b)}/**
   * A method to formate the date and generate the string.
   * YYYY = Year in UTC.
   * MM   = Month in UTC (Added +1 due to JS starts with 0).
   * DD   = Date in UTC.
   * hh   = Hours in UTC.
   * mm   = Minutes in UTC.
   * ss   = Seconds in UTC.
   * @param {String} str A template string to be used in formatting the Date.
   */return(0,_createClass2["default"])(a,[{key:"format",value:function format(){var b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"YYYY-MM-DD hh:mm:ss";return b.replace("YYYY",this.timestamp.getUTCFullYear()).replace("MM",a._appendZero(this.timestamp.getUTCMonth()+1)).replace("DD",a._appendZero(this.timestamp.getUTCDate())).replace("hh",a._appendZero(this.timestamp.getUTCHours())).replace("mm",a._appendZero(this.timestamp.getUTCMinutes())).replace("ss",a._appendZero(this.timestamp.getUTCSeconds()))}}],[{key:"_appendZero",value:function _appendZero(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:1;return 10>a?"0".concat(a):a.toString()}}]),a}();module.exports=HTMLDateBuilder;