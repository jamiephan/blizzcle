"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),LoggerColors=/*#__PURE__*/function(){function a(){(0,_classCallCheck2["default"])(this,a)}return(0,_createClass2["default"])(a,null,[{key:"Black",/**
     * Convert string into ANSI Black colored code
     * @param {String} str String to be converted into ANSI colored stri
     */value:function Black(a){return"\x1B[30m"+a+"\x1B[0m"}/**
   * Convert string into ANSI Red colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"Red",value:function Red(a){return"\x1B[31m"+a+"\x1B[0m"}/**
   * Convert string into ANSI Green colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"Green",value:function Green(a){return"\x1B[32m"+a+"\x1B[0m"}/**
   * Convert string into ANSI Yellow colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"Yellow",value:function Yellow(a){return"\x1B[33m"+a+"\x1B[0m"}/**
   * Convert string into ANSI Blue colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"Blue",value:function Blue(a){return"\x1B[34m"+a+"\x1B[0m"}/**
   * Convert string into ANSI Magenta colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"Magenta",value:function Magenta(a){return"\x1B[35m"+a+"\x1B[0m"}/**
   * Convert string into ANSI Cyan colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"Cyan",value:function Cyan(a){return"\x1B[36m"+a+"\x1B[0m"}/**
   * Convert string into ANSI White colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"White",value:function White(a){return"\x1B[37m"+a+"\x1B[0m"}/**
     * Convert string into ANSI Bright Black colored code
     * @param {String} str String to be converted into ANSI colored stri
     */},{key:"BrightBlack",value:function BrightBlack(a){return"\x1B[90m"+a+"\x1B[0m"}/**
   * Convert string into ANSI ReBright d colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"BrightRed",value:function BrightRed(a){return"\x1B[91m"+a+"\x1B[0m"}/**
   * Convert string into ANSI GrBright een colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"BrightGreen",value:function BrightGreen(a){return"\x1B[92m"+a+"\x1B[0m"}/**
   * Convert string into ANSI YeBright llow colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"BrightYellow",value:function BrightYellow(a){return"\x1B[93m"+a+"\x1B[0m"}/**
   * Convert string into ANSI BlBright ue colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"BrightBlue",value:function BrightBlue(a){return"\x1B[94m"+a+"\x1B[0m"}/**
   * Convert string into ANSI MaBright genta colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"BrightMagenta",value:function BrightMagenta(a){return"\x1B[95m"+a+"\x1B[0m"}/**
   * Convert string into ANSI CyBright an colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"BrightCyan",value:function BrightCyan(a){return"\x1B[96m"+a+"\x1B[0m"}/**
   * Convert string into ANSI WhBright ite colored code
   * @param {String} str String to be converted into ANSI colored string
   */},{key:"BrightWhite",value:function BrightWhite(a){return"\x1B[97m"+a+"\x1B[0m"}}]),a}();module.exports=LoggerColors;