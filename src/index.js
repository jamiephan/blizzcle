'use strict';
const fetch = require('node-fetch');
const $ = require('cheerio');
const fs = require('fs');

class BlizzBlogAPI {
  constructor(options = {}) {
    this.verbose = typeof options.verbose === 'undefined' ? false : options.verbose;
    this.maxCount = typeof options.maxCount === 'undefined' ? 0 : parseInt(options.maxCount);
    this.filename = typeof options.filename === 'undefined' ? 'blizz' : options.filename;
    this.game = typeof options.game === 'undefined' ? 'heroes-of-the-storm' : options.game.toLowerCase();
    this.language = typeof options.language === 'undefined' ? 'en-us' : options.language.toLowerCase();
  }

  async get() {
    return new Promise(async (resolve, reject) => {
      await this._getPages()
        .then(a => {
          a.forEach(d => {
            this.pages.push(...this._parse(d.html));
          });
        })
        .catch(e => {
          reject(e);
        });
      this.pages = this.maxCount == 0 ? this.pages : this.pages.slice(0, this.maxCount);
      resolve(this.pages);
    });
  }

  async saveJSON() {
    return new Promise(async (resolve, reject) => {
      const arr = await this.get().catch(reject);
      fs.writeFile(
        this.filename,
        JSON.stringify(arr),
        {
          encoding: 'utf8',
        },
        e => {
          if (e) reject(e);
          else resolve(true);
        }
      );
    });
  }

  _download(pageNumber) {
    const domain = 'https://news.blizzard.com';
    const URL = `${domain}/${this.language}/blog/list?pageNum=${pageNumber}&community=${this.game}`;
    return fetch(URL)
      .then(r => {
        if (!r.ok) {
          throw Error(r.statusText);
        }
        return r.json();
      })
      .catch(e => {
        throw Error(e);
      });
  }

  async _getPages() {
    this.pages = [];
    const promises = [];
    this._log('Downloading Page 1 for metadata and its content.');
    const page1 = await this._download(1).catch(e => {
      throw e;
    });
    this.pages.push(...this._parse(page1.html));

    this.metadata = {
      totalCount: page1.totalCount,
      game: typeof page1.community == 'undefined' ? 'All' : page1.community.slug,
    };

    let articleCount = this.metadata.totalCount;
    this._log(`Community name : ${this.metadata.game}`);
    this._log(`Total article count in "${this.metadata.game}": ${this.metadata.totalCount}`);
    if (this.maxCount !== 0) {
      articleCount = this.maxCount;
      this._log(`Number of articles will be extracted: ${articleCount}`);
    }
    const pagesToFetch = Math.ceil((articleCount - 30) / 30);
    this._log(`Number of extra pages to be fetched: ${pagesToFetch}`);

    for (let i = 0; i < pagesToFetch; i++) {
      this._log(`Fetching extra page: ${i + 1} / ${pagesToFetch} ...`);
      // const json = await this._download(i + 2).catch(e => {
      //   throw e;
      // });
      promises.push(this._download(i + 2));
      // this.pages.push(this._parse(json.html));
    }
    return await Promise.all(promises);
  }

  _parse(p) {
    const json = [];
    $('.ArticleListItem', p).each(function() {
      const title = $(this)
        .find('h3.ArticleListItem-title')
        .text()
        .trim();
      const thumbnail =
        'https:' +
        $(this)
          .find('div.ArticleListItem-image')
          .css('background-image')
          .replace('url(', '')
          .replace(')', '')
          .replace(/\"/gi, '');
      const description = $(this)
        .find('.ArticleListItem-description')
        .text()
        .trim();
      const link = $(this)
        .find('a.ArticleLink')
        .attr('href');
      const timestamp = $(this)
        .find('span.ArticleListItem-footerTimestamp')
        .text()
        .trim();
      const commentCount = parseInt(
        $(this)
          .find('.ArticleCommentCount-count')
          .text()
          .trim()
      );
      var id = parseInt(
        $(this)
          .find('a.ArticleLink')
          .attr('data-article-id')
      );
      json.push({
        title,
        thumbnail,
        description,
        link: /^https?:\/\//i.test(link) ? link : 'https://news.blizzard.com' + link,
        timestamp,
        commentCount: commentCount ? commentCount : 0,
        id,
      });
    });
    return json;
  }

  _log(message) {
    if (this.verbose) {
      console.log(`[${+Date.now()}] ${message}`);
    }
  }
}

module.exports = BlizzBlogAPI;
