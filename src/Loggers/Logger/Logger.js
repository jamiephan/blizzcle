const LoggerColors = require('./LoggerColors');
const LoggerVerbosity = require('./LoggerVerbosity');

class Logger {
  /**
   * Initialise the settings
   * @param {Function} stdout Function to output the message
   * @param {Boolean} useColor Whether to use ANSI Color code
   * @param {Number} verbosity Verbosity of the Log (From LoggerVerbosity Class)
   */
  constructor(
    stdout = console.log,
    useColor = true,
    verbosity = LoggerVerbosity.minimal,
  ) {
    this.stdout = stdout;
    this.useColor = useColor;
    this.verbosity = verbosity;
  }

  /**
   * Override the settings
   * @param {Function} stdout Function to output the message
   * @param {Boolean} useColor Whether to use ANSI Color code
   * @param {Number} verbosity Verbosity of the Log (From LoggerVerbosity Class)
   */
  set(
    stdout = console.log,
    useColor = true,
    verbosity = LoggerVerbosity.minimal,
  ) {
    this.stdout = stdout;
    this.useColor = useColor;
    this.verbosity = verbosity;
  }

  /**
     * Specify a string to be outputted into STDOUT.
     * @param {String} str A string to be logged
     */
  log(str) {
    if (this.useColor) {
      this.stdout(str);
    } else {
      // eslint-disable-next-line no-control-regex
      const regex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
      this.stdout(str.replace(regex, ''));
    }
  }

  /**
   * Print a String in a debug style.
   * @param {String} str Specify a string to be printed as debug styled
   */
  debug(str) {
    if (this.verbosity === LoggerVerbosity.minimal) return;
    let output = str;
    output = LoggerColors.BrightBlue('Debug: ') + output;
    output = Logger._addTimeStamp(output);
    this.log(output);
  }

  /**
   * Print a String in a error style.
   * @param {String} str Specify a string to be printed as error styled
   */
  error(str) {
    if (this.verbosity === LoggerVerbosity.minimal) return;
    let output = str;
    output = LoggerColors.BrightRed('Error: ') + output;
    output = Logger._addTimeStamp(output);
    this.log(output);
  }

  /**
   * Print a String in a warning style.
   * @param {String} str Specify a string to be printed as warning styled
   */
  warn(str) {
    if (this.verbosity === LoggerVerbosity.minimal) return;
    let output = str;
    output = LoggerColors.BrightYellow('Warn: ') + output;
    output = Logger._addTimeStamp(output);
    this.log(output);
  }

  static _addTimeStamp(str) {
    return `[${LoggerColors.BrightMagenta(+new Date())}] - ${str}`;
  }
}

module.exports = Logger;
