const fetch = require('node-fetch');
const $ = require('cheerio');
const fs = require('fs');

const pageNumber = 2;

function parse(c) {
  const jsons = [];

  $('.ArticleListItem', c).each(function() {
    // Each post
    var title = $(this)
      .find('h3.ArticleListItem-title')
      .text()
      .trim();
    var thumbnail =
      'https:' +
      $(this)
        .find('div.ArticleListItem-image')
        .css('background-image')
        .replace('url(', '')
        .replace(')', '')
        .replace(/\"/gi, '');
    var description = $(this)
      .find('.ArticleListItem-description')
      .text()
      .trim();
    var link = $(this)
      .find('a.ArticleLink')
      .attr('href');
    var timestamp = $(this)
      .find('span.ArticleListItem-footerTimestamp')
      .text()
      .trim();
    var commentCount = parseInt(
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
    jsons.push({
      title: title,
      thumbnail: thumbnail,
      description: description,
      link: link.includes('.com') || link.includes('.net') ? link : 'https://news.blizzard.com' + link,
      timestamp: timestamp,
      commentCount: commentCount ? commentCount : 0,
      id,
    });
  });
  return jsons;
}

async function download() {
  const pages = [];
  const sizePerRequest = 30; //Max 30
  console.log(`Set page size per request = ${sizePerRequest}`);
  console.log('Downloading Page 1 to get meta data.');
  const page1 = await fetch(
    `https://news.blizzard.com/en-us/blog/list?pageNum=1&pageSize=${sizePerRequest}&community=heroes-of-the-storm`
  ).then(k => k.json());
  pages.push(parse(page1.html));
  const totalArticle = page1.totalCount;
  console.log(`Total Articles count: ${totalArticle}`);
  // totalArticle = 100
  const pagesToFetch = Math.ceil((totalArticle - sizePerRequest) / sizePerRequest) + 2;
  console.log(`Pages to be fetched: ${pagesToFetch - 1}`);

  for (i = 2; i < pagesToFetch; i++) {
    console.log(`Downloading Page ${i} / ${pagesToFetch - 1}`);
    const json = await fetch(
      `https://news.blizzard.com/en-us/blog/list?pageNum=${i}&pageSize=${sizePerRequest}&community=heroes-of-the-storm`
    ).then(k => k.json());
    pages.push(parse(json.html));
  }

  arr = [];
  pages.forEach(a => {
    a.forEach(b => {
      arr.push(b);
    });
  });
  return new Promise((res, rej) => {
    res(arr);
  });
}

async function app() {
  var blogs = await download();

  fs.writeFile(__dirname + '\\blogs1.json', JSON.stringify(blogs), function() {
    console.log(' ╔══════════════════════════════════════════════════════════════════╗');
    console.log(' ║ _    _       _    _____ ____  _                      _____ _____ ║');
    console.log(' ║| |  | |     | |  / ____|  _ \\| |               /\\   |  __ \\_   _|║');
    console.log(' ║| |__| | ___ | |_| (___ | |_) | | ___   __ _   /  \\  | |__) || |  ║');
    console.log(' ║|  __  |/ _ \\| __|\\___ \\|  _ <| |/ _ \\ / _` | / /\\ \\ |  ___/ | |  ║');
    console.log(' ║| |  | | (_) | |_ ____) | |_) | | (_) | (_| |/ ____ \\| |    _| |_ ║');
    console.log(' ║|_|  |_|\\___/ \\__|_____/|____/|_|\\___/ \\__, /_/    \\_\\_|   |_____|║');
    console.log(' ║                                        __/ |                     ║');
    console.log(' ║                                       |___/                      ║');
    console.log(' ╚══════════════════════════════════════════════════════════════════╝');
    console.log(`Finished writing file to "${__dirname}\\blogs.json".`);
    console.log(`Total number of blogs: ${blogs.length}`);
    console.log('');
    console.log(`Oldest blog title: ${blogs[blogs.length - 1].title}`);
    console.log(`  ►Brief Description -> ${blogs[blogs.length - 1].description}`);
    console.log(`  ►Link -> ${blogs[blogs.length - 1].link}`);
    console.log('');
    console.log(`Latest blog title: ${blogs[0].title}`);
    console.log(`  ►Brief Description -> ${blogs[0].description}`);
    console.log(`  ►Link -> ${blogs[0].link}`);
  });
}

app();
