'use strict';
const fetch = require('node-fetch');
const $ = require('cheerio');
const fs = require('fs');

class Blizzcle {
  constructor(options = {}) {
    this.verbose = typeof options.verbose === 'undefined' ? false : options.verbose;
    this.count = typeof options.count === 'undefined' ? 0 : parseInt(options.count);
    this.detail = typeof options.detail === 'undefined' ? false : options.detail;
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
      this.pages = this.count == 0 ? this.pages : this.pages.slice(0, this.count);
      if (this.detail) {
        await this._detailtify().catch(reject);
      }
      resolve(this.pages);
    });
  }

  async save(options = {}) {
    if (typeof options.filename === 'undefined') {
      throw new Error('filename is not defined');
    }

    this.type = typeof options.type === 'undefined' ? 'json' : options.type;
    if (!['json', 'html'].includes(this.type.toLowerCase())) {
      throw new Error('File type can only be json or html.');
    }

    const arr = await this.get().catch(e => {
      throw e;
    });
    let data;
    if (this.type.toLowerCase() === 'json') {
      data = JSON.stringify(arr);
    } else {
      data = `<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width, initial-scale=1, shrink-to-fit=no"><link rel=stylesheet href=https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css integrity=sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4 crossorigin=anonymous><title>${
        this.game
      } Article Viewer</title><style>th{cursor:pointer}img{width:260px;height:130px}</style><script src=https://code.jquery.com/jquery-3.3.1.slim.min.js integrity=sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo crossorigin=anonymous></script><script src=https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js integrity=sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ crossorigin=anonymous></script><script src=https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js integrity=sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm crossorigin=anonymous></script><script src=http://cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js></script><script src=https://cdn.rawgit.com/tuupola/jquery_lazyload/2.x/lazyload.min.js></script></head><body><nav class="navbar navbar-light bg-light justify-content-between"><a class=navbar-brand>${
        this.game
      } Article Viewer</a><ul class=navbar-nav><a class=nav-link href=https://www.reddit.com/u/jamiephan>(by /u/jamiephan)</a></ul></nav><div class=container id=blogs><div class=row><div class="col s12"><h1>Blogs</h1></div></div><div class=row><div class="col s4"><input id=blog-search type=text class="search form-control" placeholder=Search autocomplete=off></div></div><div class=row><div class="col s12"><table class="table table-hover"><thead><tr><th scope=col data-sort=hash data-asc=asc onclick=sort(this)>#</th><th scope=col>Thumbnail</th><th scope=col data-sort=title data-asc=asc onclick=sort(this)>Blog Title</th><th scope=col data-sort=date data-asc=asc onclick=sort(this)>Date (UTC)</th></tr></thead><tbody class=list>`;
      for (let i = 0; i < arr.length; i++) {
        const entry = arr[i];
        data += `<tr><th scope=row class=hash>${i + 1}</th><td><img class=lazyload data-src=${entry.thumbnail} 
        src=https://dummyimage.com/260x130/a1a1a1/2b2b2b.gif /></td><td class=title><a href=${
          entry.link
        } target="_blank">${entry.title}</td></a><td class=dateStr>${new Date(entry.timestamp).getUTCFullYear()}-${(
          '0' + new Date(entry.timestamp).getMonth()
        ).slice(-2)}-${('0' + new Date(entry.timestamp).getUTCDate()).slice(-2)} ${(
          '0' + new Date(entry.timestamp).getUTCHours()
        ).slice(-2)}:${('0' + new Date(entry.timestamp).getUTCMinutes()).slice(
          -2
        )}</td><td class=date style=display:none>${entry.timestamp}</td></tr>`;
      }
      data += `</tbody></table></div></div></div><script>lazyload();var options={valueNames:["hash","title","date"]};var blogList=new List("blogs",options);function sort(a){blogList.sort(a.dataset.sort,{order:a.dataset.asc});a.dataset.asc=(a.dataset.asc=="asc"?"desc":"asc")};</script></body></html>`;
    }
    return new Promise(async (resolve, reject) => {
      fs.writeFile(
        this.filename,
        data,
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

  _download(type, data) {
    const domain = 'https://news.blizzard.com';
    let param = '';
    for (var key in data) {
      if (param != '') {
        param += '&';
      }
      param += key + '=' + encodeURIComponent(data[key]);
    }
    const URL = `${domain}/${this.language}/blog/${type}?${param}&__NO_CACHE__=${+new Date()}`;

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
    const page1 = await this._download('list', { pageNum: 1, community: this.game }).catch(e => {
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
    if (this.count !== 0) {
      articleCount = this.count;
      this._log(`Number of articles will be extracted: ${articleCount}`);
    }
    const pagesToFetch = Math.ceil((articleCount - 30) / 30);
    this._log(`Number of extra pages to be fetched: ${pagesToFetch}`);

    for (let i = 0; i < pagesToFetch; i++) {
      this._log(`Fetching extra page: ${i + 1} / ${pagesToFetch} ...`);

      promises.push(
        this._download('list', {
          pageNum: i + 2,
          community: this.game,
        })
      );
    }
    this._log(`Waiting ${promises.length} request to be completed...`);
    return await Promise.all(promises);
  }

  _parse(p) {
    const json = [];
    //Blogs in feature
    $('.GalleryItem', p).each(function() {
      const title = $(this)
        .find('div.TextOverflow')
        .text()
        .trim();
      const thumbnail =
        'https:' +
        $(this)
          .find('div.Card-image')
          .css('background-image')
          .replace('url(', '')
          .replace(')', '')
          .replace(/\"/gi, '');
      const description = null;
      const link = $(this)
        .find('a.ArticleLink')
        .attr('href');
      const timestamp = $(this)
        .find('span.ArticleListItem-footerTimestamp')
        .text()
        .trim();
      const commentCount = 0;
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

    // Blogs in list

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

  async _detailtify() {
    return new Promise(async (resolve, reject) => {
      this._log('Downloading details to each post');
      const promises = [];
      for (let i = 0; i < this.pages.length; i++) {
        const post = this.pages[i];
        this._log('Fetching Details of the post ' + post.id + ' (' + post.title + ')');
        promises.push(this._download('detail', { blogId: post.id, full: false }));
      }
      this._log(`Waiting ${promises.length} request to be completed...`);
      const details = await Promise.all(promises).catch(reject);

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
      }
      resolve(true);
    });
  }

  _log(message) {
    if (this.verbose) {
      console.log(`[${+Date.now()}] ${message}`);
    }
  }
}

module.exports = Blizzcle;
