const fs = require('fs');

class JSONBuilder {
  /**
   *
   * @param {Array} data The data returned from Blizzcle
   * @param {String} game The name of the game
   * @param {String} filename The filename to be stored
  */
  constructor(data = [], game = '', filename = 'blizzcle') {
    this.data = data;
    this.game = game;
    this.filename = filename;

    this._json = {};
  }

  build() {
    this._json = JSON.stringify(this.data);
  }

  async save() {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        this.filename,
        this._json,
        {
          encoding: 'utf8',
        },
        (e) => {
          if (e) reject(e);
          else resolve(`File ${this.filename} created successfully.`);
        },
      );
    });
  }
}

module.exports = JSONBuilder;
