
const fetch = require('node-fetch');
const $ = require('cheerio');

const { HTMLBuilder, JSONBuilder } = require('./Builders');
const { Logger, LoggerVerbosity } = require('./Loggers');
const defaultify = require('./defaultify');

const logger = new Logger();

// TODO: ADD split request so prevent gatway error | start fron nth post

class Blizzcle {
  constructor(options = {}) {
    // Init Options

    this.verbose = defaultify(options.verbose, false);
    this.count = defaultify(options.count, 1);
    this.detail = defaultify(options.detail, false);
    this.filename = defaultify(options.filename, undefined);
    this.filetype = defaultify(options.filetype, undefined);
    this.game = defaultify(options.game.toLowerCase(), 'heroes-of-the-storm');
    this.language = defaultify(options.language.toLowerCase(), 'en-us');
    this.rawdata = defaultify(options.rawdata, false);
    this.color = defaultify(options.color, true);
    // Init Logger
    logger.set(console.log, this.color,
      this.verbose ? LoggerVerbosity.verbose : LoggerVerbosity.minimal);

    // Debug log all settings
    logger.debug(`Settings: ${
      JSON.stringify({
        verbose: this.verbose,
        count: this.count,
        detail: this.detail,
        filename: this.filename,
        filetype: this.filetype,
        game: this.game,
        language: this.language,
        rawdata: this.rawdata,
        color: this.color,
      })}`);
  }

  async get() {
    await this._getPages().then((page) => {
      page.forEach((article) => {
        this.pages.push(...this._parse(article.html));
      });
    }).catch((e) => { throw e; });

    this.pages.sort((x, y) => y.id - x.id);

    this.pages = this.count === 0 ? this.pages : this.pages.slice(0, this.count);
    if (this.detail || this.filename !== undefined) {
      await this._detailtify().catch((e) => { throw e; });
    }
    return this.pages;
  }

  async save() {
    // Check File Name
    if (typeof this.filename === 'undefined') {
      logger.error('filename is not defined');
      throw new Error('filename is not defined');
    }

    if (typeof this.filetype === 'undefined') {
      if (/\.(json|html?)$/i.test(this.filename)) {
        this.filetype = this.filename.match(/\.(json|html?)$/i)[1].toLowerCase();
        logger.debug(`File type detected as "${this.filetype}"`);
      } else {
        this.filetype = 'json';
        logger.warn('File type not detected, fallback to json.');
      }
    }

    // Get Data
    let data = await this.get().catch((e) => {
      throw e;
    });

    // Sort the data via id
    data = data.sort((a, b) => a.id - b.id);

    // Save As JSON
    if (this.filetype.toLowerCase() === 'json') {
      const JSONFile = new JSONBuilder(data, this.game, this.filename);
      JSONFile.build();
      return JSONFile.save();
    }

    // Save as HTML
    if (this.filetype.toLowerCase() === 'html') {
      const HTMLFile = new HTMLBuilder(data, this.game, this.filename);
      HTMLFile.build();
      return HTMLFile.save();
    }
    logger.error('Unable to save file');
    throw new Error('Unable to save file');
  }

  _download(type, data) {
    const domain = 'https://news.blizzard.com';
    let param = '';
    Object.entries(data).forEach((x) => {
      if (param !== '') {
        param += '&';
      }
      param += `${x[0]}=${x[1]}`;
    });

    const URL = `${domain}/${this.language}/blog/${type}?${param}&__NO_CACHE__=${+new Date()}`;

    return fetch(URL)
      .then((r) => {
        if (!r.ok) {
          throw Error(r.statusText);
        }
        return r.json();
      })
      .catch((e) => {
        throw Error(e);
      });
  }

  async _getPages() {
    this.pages = [];
    const promises = [];
    logger.debug('Downloading Page 1 for metadata and its content.');
    const page1 = await this._download('list', {
      pageNum: 1,
      community: this.game,
    }).catch((e) => {
      throw e;
    });
    this.pages.push(...this._parse(page1.html));
    this.metadata = {
      totalCount: page1.totalCount,
      game: typeof page1.community === 'undefined' ? 'All' : page1.community.slug,
    };

    let articleCount = this.metadata.totalCount;

    logger.debug(`Community name : ${this.metadata.game}`);
    logger.debug(`Total article count in "${this.metadata.game}": ${this.metadata.totalCount}`);

    if (this.count !== 0) {
      articleCount = this.count;
      logger.debug(`Number of articles will be extracted: ${articleCount}`);
    }
    const pagesToFetch = Math.ceil((articleCount - 30) / 30);
    logger.debug(`Number of extra pages to be fetched: ${pagesToFetch}`);

    for (let i = 0; i < pagesToFetch; i++) {
      logger.debug(`Fetching extra page: ${i + 1} / ${pagesToFetch} ...`);

      promises.push(
        this._download('list', {
          pageNum: i + 2,
          community: this.game,
        }),
      );
    }
    logger.debug(`Waiting ${promises.length} requests to be completed...`);
    return Promise.all(promises);
  }


  // eslint-disable-next-line class-methods-use-this
  _parse(p) {
    const json = [];
    // Blogs in feature
    $('.GalleryItem', p).each(function parseGallery() {
      const title = $(this)
        .find('div.TextOverflow')
        .text()
        .trim();
      const thumbnail = `https:${
        $(this)
          .find('div.Card-image')
          .css('background-image')
          .replace('url(', '')
          .replace(')', '')
          .replace(/"/gi, '')}`;
      const description = null;
      const link = $(this)
        .find('a.ArticleLink')
        .attr('href');
      const timestamp = $(this)
        .find('span.ArticleListItem-footerTimestamp')
        .text()
        .trim();
      const commentCount = 0;
      const id = parseInt(
        $(this)
          .find('a.ArticleLink')
          .attr('data-article-id'),
        10,
      );
      json.push({
        title,
        thumbnail,
        description,
        link: /^https?:\/\//i.test(link) ? link : `https://news.blizzard.com${link}`,
        timestamp,
        commentCount: commentCount || 0,
        id,
      });
    });

    // Blogs in list

    $('.ArticleListItem', p).each(function parseArticle() {
      const title = $(this)
        .find('h3.ArticleListItem-title')
        .text()
        .trim();
      const thumbnail = `https:${
        $(this)
          .find('div.ArticleListItem-image')
          .css('background-image')
          .replace('url(', '')
          .replace(')', '')
          .replace(/"/gi, '')}`;
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
          .trim(),
        10,
      );
      const id = parseInt(
        $(this)
          .find('a.ArticleLink')
          .attr('data-article-id'),
        10,
      );
      json.push({
        title,
        thumbnail,
        description,
        link: /^https?:\/\//i.test(link) ? link : `https://news.blizzard.com${link}`,
        timestamp,
        commentCount: commentCount || 0,
        id,
      });
    });
    return json;
  }

  async _detailtify() {
    logger.debug('Downloading details to each post');
    const promises = [];
    for (let i = 0; i < this.pages.length; i++) {
      const post = this.pages[i];
      logger.debug(`Fetching Details of the post ${post.id} (${post.title})`);
      promises.push(
        this._download('detail', {
          blogId: post.id,
          full: false,
        }),
      );
    }

    logger.debug(`Waiting ${promises.length} request to be completed...`);
    const details = await Promise.all(promises).catch((e) => { throw e; });
    for (let i = 0; i < details.length; i++) {
      const detail = details[i];
      const timestampStr = $('article', detail.html)
        .find('.ArticleDetail-bylineDate')
        .attr('title');
      const body = $('article', detail.html).find('.ArticleDetail-content');
      const timestamp = +new Date(timestampStr);
      this.pages[i].timestamp = timestamp;
      this.pages[i].bodyHTML = body.html().trim();
      this.pages[i].body = body.text().trim();
      if (this.rawdata) {
        this.pages[i]._rawData = details;
      }
    }
  }

  // _log(message) {
  //   if (this.verbose) {
  //     console.log(`[${+Date.now()}] ${message}`);
  //   }
  // }
}

module.exports = Blizzcle;
