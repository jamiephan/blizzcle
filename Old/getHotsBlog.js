const fetch = require('node-fetch');
const $ = require('cheerio');

var pageNum = 10 //94
var a = new Promise(function(resolve, reject){

	var blogs = []
	for (var i = 1; i < pageNum; i++) {
		var blog = []
		fetch(`https://us.battle.net/heroes/en/blog/infinite?page=${i}`)
		.then((d)=>d.text())
		.then(function(d){
			// Whole pae with few posts
			$("article", d).each(function() {
				// Each post
				var title = $(this).find(".news-list__item__title").text().trim()
				var thumbnail = "https:" + $(this).find(".news-list__item__thumbnail").find("img").attr("src")
				var description = $(this).find(".news-list__item__description").text().trim()
				var link = "https://us.battle.net" + $(this).find(".news-list__item__title").find("a").attr("href")
				var timestamp = Date.parse($(this).find(".publish-date").attr("title")) 
				blog.push({
					title: title,
					thumbnail: thumbnail,
					description: description,
					link: link,
					timestamp: timestamp
				})
			});

		})

		blogs.push(blog)
	}

	for(;;){
		if ((pageNum - 1) == blogs.length) {
			resolve(blogs)
			break;
		}
		console.log((pageNum - 1))
		console.log(blogs.length)
	}
})

a.then((d)=>console.log(d))
