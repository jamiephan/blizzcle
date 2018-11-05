// if (typeof window == "undefined") {
    const fetch = require('node-fetch');
    const $ = require('cheerio');
    const fs = require("fs");
// }

var pageNum = 150
var blogs = []
var promises = []

for (var i = 1; i < (pageNum + 1); i++) {
    promises.push(fetch(`https://heroesofthestorm.com/en-us/blog/infinite/?page=${i}`)
        .then((d) => d.text()))

}

Promise.all(promises).then(function(d) {

    for (var i = 0; i < d.length; i++) {

        $("article", d[i]).each(function() {
            // Each post
            var title = $(this).find(".news-list__item__title").text().trim()
            var thumbnail = "https:" + $(this).find(".news-list__item__thumbnail").find("img").attr("src")
            var description = $(this).find(".news-list__item__description").text().trim()
            var link = $(this).find(".news-list__item__title").find("a").attr("href")
            var timestamp = Date.parse($(this).find(".publish-date").attr("title"))
            blogs.push({
                title: title,
                thumbnail: thumbnail,
                description: description,
                link: (link.includes(".com") || link.includes(".net") ? link : "https://us.battle.net" + link),
                timestamp: timestamp
            })
        });
    }

    handle(blogs)

})


function handle(blogs) {

    blogs.sort(function(a, b) {
        return a.timestamp - b.timestamp
    })

    fs.writeFile(__dirname + "\\blogs.json", JSON.stringify(blogs), function(){

        console.log(" ╔══════════════════════════════════════════════════════════════════╗")
        console.log(" ║\ \_\ \ \ \ \_\ \ \ \ \ \ \ \_\ \ \ \ \_\_\_\_\_\ \_\_\_\_\ \ \_\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \_\_\_\_\_\ \_\_\_\_\_\ ║")
        console.log(" ║\|\ \|\ \ \|\ \|\ \ \ \ \ \|\ \|\ \ \/\ \_\_\_\_\|\ \ \_\ \\\|\ \|\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \/\\\ \ \ \|\ \ \_\_\ \\\_\ \ \ \_\|║")
        console.log(" ║\|\ \|\_\_\|\ \|\ \_\_\_\ \|\ \|\_\|\ \(\_\_\_\ \|\ \|\_\)\ \|\ \|\ \_\_\_\ \ \ \_\_\ \_\ \ \ \/\ \ \\\ \ \|\ \|\_\_\)\ \|\|\ \|\ \ ║")
        console.log(" ║\|\ \ \_\_\ \ \|\/\ \_\ \\\|\ \_\_\|\\\_\_\_\ \\\|\ \ \_\ \<\|\ \|\/\ \_\ \\\ \/\ \_\`\ \|\ \/\ \/\\\ \\\ \|\ \ \_\_\_\/\ \|\ \|\ \ ║")
        console.log(" ║\|\ \|\ \ \|\ \|\ \(\_\)\ \|\ \|\_\ \_\_\_\_\)\ \|\ \|\_\)\ \|\ \|\ \(\_\)\ \|\ \(\_\|\ \|\/\ \_\_\_\_\ \\\|\ \|\ \ \ \ \_\|\ \|\_\ ║")
        console.log(" ║\|\_\|\ \ \|\_\|\\\_\_\_\/\ \\\_\_\|\_\_\_\_\_\/\|\_\_\_\_\/\|\_\|\\\_\_\_\/\ \\\_\_\,\ \/\_\/\ \ \ \ \\\_\\\_\|\ \ \ \|\_\_\_\_\_\|║")
        console.log(" ║\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \_\_\/\ \|\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ ║")
        console.log(" ║\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \|\_\_\_\/\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ ║")
        console.log(" ╚══════════════════════════════════════════════════════════════════╝")
        console.log(`Finished writing file to "${__dirname}\\blogs.json".`)
        console.log(`Total number of blogs: ${blogs.length}`)
        console.log("")
        console.log(`Newest blog title: ${blogs[blogs.length-1].title}`)
        console.log(`  ►Brief Description -> ${blogs[blogs.length-1].description}`)
        console.log(`  ►Link -> ${blogs[blogs.length-1].link}`)
        console.log("")
        console.log(`Oldest blog title: ${blogs[0].title}`)
        console.log(`  ►Brief Description -> ${blogs[0].description}`)
        console.log(`  ►Link -> ${blogs[0].link}`)



    });

}