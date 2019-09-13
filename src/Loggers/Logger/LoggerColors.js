class LoggerColors {
  /**
     * Convert string into ANSI Black colored code
     * @param {String} str String to be converted into ANSI colored stri
     */
  static Black(str) {
    const color = '\x1b[30m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI Red colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static Red(str) {
    const color = '\x1b[31m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI Green colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static Green(str) {
    const color = '\x1b[32m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI Yellow colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static Yellow(str) {
    const color = '\x1b[33m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI Blue colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static Blue(str) {
    const color = '\x1b[34m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI Magenta colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static Magenta(str) {
    const color = '\x1b[35m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI Cyan colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static Cyan(str) {
    const color = '\x1b[36m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI White colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static White(str) {
    const color = '\x1b[37m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
     * Convert string into ANSI Bright Black colored code
     * @param {String} str String to be converted into ANSI colored stri
     */
  static BrightBlack(str) {
    const color = '\x1b[90m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI ReBright d colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static BrightRed(str) {
    const color = '\x1b[91m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI GrBright een colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static BrightGreen(str) {
    const color = '\x1b[92m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI YeBright llow colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static BrightYellow(str) {
    const color = '\x1b[93m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI BlBright ue colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static BrightBlue(str) {
    const color = '\x1b[94m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI MaBright genta colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static BrightMagenta(str) {
    const color = '\x1b[95m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI CyBright an colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static BrightCyan(str) {
    const color = '\x1b[96m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }

  /**
   * Convert string into ANSI WhBright ite colored code
   * @param {String} str String to be converted into ANSI colored string
   */
  static BrightWhite(str) {
    const color = '\x1b[97m';
    const reset = '\x1b[0m';
    return color + str + reset;
  }
}

module.exports = LoggerColors;
