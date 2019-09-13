class HTMLDateBuilder {
  /**
   * Generare timestamp from data
   * @param {number} timestamp Timestamp from Data
   */
  constructor(timestamp = 0) {
    this.timestamp = new Date(timestamp);
  }

  /**
   * A method to formate the date and generate the string.
   * YYYY = Year in UTC.
   * MM   = Month in UTC (Added +1 due to JS starts with 0).
   * DD   = Date in UTC.
   * hh   = Hours in UTC.
   * mm   = Minutes in UTC.
   * ss   = Seconds in UTC.
   * @param {String} str A template string to be used in formatting the Date.
   */
  format(str = 'YYYY-MM-DD hh:mm:ss') {
    return str
      .replace('YYYY', this.timestamp.getUTCFullYear())
      .replace('MM', HTMLDateBuilder._appendZero(this.timestamp.getUTCMonth() + 1))
      .replace('DD', HTMLDateBuilder._appendZero(this.timestamp.getUTCDate()))
      .replace('hh', HTMLDateBuilder._appendZero(this.timestamp.getUTCHours()))
      .replace('mm', HTMLDateBuilder._appendZero(this.timestamp.getUTCMinutes()))
      .replace('ss', HTMLDateBuilder._appendZero(this.timestamp.getUTCSeconds()));
  }

  static _appendZero(num = 1) {
    return num < 10 ? `0${num}` : num.toString();
  }
}

module.exports = HTMLDateBuilder;
