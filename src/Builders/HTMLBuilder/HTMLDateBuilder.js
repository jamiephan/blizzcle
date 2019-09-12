class HTMLDateBuilder {
  /**
   * Generare timestamp from data
   * @param {number} timestamp Timestamp from Data
   */
  constructor(timestamp = 0) {
    this.timestamp = new Date(timestamp);
  }

  format(str = 'YYYY-MM-DD HH:MM:SS') {
    return str
      .replace('YYYY', this.timestamp.getUTCFullYear())
      .replace('MM', this._appendZero(this.timestamp.getUTCMonth() + 1))
      .replace('DD', this._appendZero(this.timestamp.getUTCDate()))
      .replace('HH', this._appendZero(this.timestamp.getUTCHours()))
      .replace('MM', this._appendZero(this.timestamp.getUTCMinutes()))
      .replace('SS', this._appendZero(this.timestamp.getUTCSeconds()));
  }

  static _appendZero(num = 1) {
    return num < 10 ? `0${num}` : num.toString();
  }
}

module.exports = HTMLDateBuilder;
