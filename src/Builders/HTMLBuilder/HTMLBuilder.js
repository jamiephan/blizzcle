const fs = require('fs');
const HTMLDateBuilder = require('./HTMLDateBuilder');

class HTMLBuilder {
  /**
   *
   * @param {Array} data The data returned from Blizzcle
   * @param {String} game The name of the game
   * @param {String} filename The filename to be stored
   * @param {Function} logger The logging function
   */

  constructor(data = [], game = '', filename = 'blizzcle') {
    this.data = data;
    this.game = game;
    this.filename = filename;

    this._html = '';
  }

  build() {
    this._addHead();
    for (let i = 0; i < this.data.length; i++) {
      const entry = this.data[i];
      this._html += `<tr><th scope=row class=hash>${entry.id + 1}</th><td><img class=lazyload data-src=${
        entry.thumbnail
      }
        src=https://dummyimage.com/260x130/a1a1a1/2b2b2b.gif?text=Loading.... /></td><td class=title><a href=${
  entry.link
} target="_blank">${entry.title}</td></a><td class=dateStr>${new HTMLDateBuilder(
  entry.timestamp,
).format()}</td><td class=date style=display:none>${entry.timestamp}</td></tr>`;
    }
    this._addEnd();
  }

  async save() {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        this.filename,
        this._html,
        {
          encoding: 'utf8',
        },
        (e) => {
          if (e) reject(e);
          else resolve(this.filename);
        },
      );
    });
  }

  _addHead() {
    this._html += `<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width, initial-scale=1, shrink-to-fit=no"><link rel=stylesheet href=https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css><title>${this.game} Article Viewer</title><style>th{cursor:pointer}img{width:260px;height:130px}</style><script src=https://code.jquery.com/jquery-3.3.1.slim.min.js></script><script src=https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js></script><script src=https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js></script><script src=http://cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js></script><script src=https://cdn.rawgit.com/tuupola/jquery_lazyload/2.x/lazyload.min.js></script></head><body><nav class="navbar navbar-light bg-light justify-content-between"><a class=navbar-brand>${this.game} Article Viewer</a><ul class=navbar-nav><a class=nav-link href=https://www.reddit.com/u/jamiephan>(by /u/jamiephan)</a></ul></nav><div class=container id=blogs><div class=row><div class="col s12"><h1>Blogs</h1></div></div><div class=row><div class="col s4"><input id=blog-search type=text class="search form-control" placeholder=Search autocomplete=off></div></div><div class=row><div class="col s12"><table class="table table-hover"><thead><tr><th scope=col data-sort=hash data-asc=asc onclick=sort(this)>#</th><th scope=col>Thumbnail</th><th scope=col data-sort=title data-asc=asc onclick=sort(this)>Blog Title</th><th scope=col data-sort=date data-asc=asc onclick=sort(this)>Date (UTC)</th></tr></thead><tbody class=list>`;
  }

  _addEnd() {
    this._html += ' </tbody> </table> </div></div></div><script>lazyload(); var options={valueNames: ["hash", "title", "date"]}; var blogList=new List("blogs", options); function sort(a){blogList.sort(a.dataset.sort,{order: a.dataset.asc}); a.dataset.asc=(a.dataset.asc=="asc" ? "desc" : "asc")}; </script></body></html>';
  }
}

module.exports = HTMLBuilder;
