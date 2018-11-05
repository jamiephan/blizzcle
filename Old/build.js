require("./TEST.js")
const json = require("./blogs.json")
var fs = require('fs');
var stream = fs.createWriteStream("index.html");
stream.once('open', function(fd) {

stream.write(`<!doctype html>\n\r`)
stream.write(`<html lang="en">\n\r`)
stream.write(`	<head>\n\r`)
stream.write(`		<!-- Required meta tags -->\n\r`)
stream.write(`		<meta charset="utf-8">\n\r`)
stream.write(`		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n\r`)
stream.write(`		<!-- Bootstrap CSS -->\n\r`)
stream.write(`		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">\n\r`)
stream.write(`		<title>Heroes Blog Viewer</title>\n\r`)
stream.write(`		<style>\n\r`)
stream.write(`			th {\n\r`)
stream.write(`				cursor: pointer;\n\r`)
stream.write(`			}\n\r`)
stream.write(`			img {\n\r`)
stream.write(`				width: 260px;\n\r`)
stream.write(`				height: 130px;\n\r`)
stream.write(`			}\n\r`)
stream.write(`		</style>\n\r`)
stream.write(`		<!-- Optional JavaScript -->\n\r`)
stream.write(`		<!-- jQuery first, then Popper.js, then Bootstrap JS -->\n\r`)
stream.write(`		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>\n\r`)
stream.write(`		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>\n\r`)
stream.write(`		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>\n\r`)
stream.write(`		<script src="http://cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script>\n\r`)
stream.write(`		<script src="https://cdn.rawgit.com/tuupola/jquery_lazyload/2.x/lazyload.min.js"></script>\n\r`)
stream.write(`	</head>\n\r`)
stream.write(`	<body>\n\r`)
stream.write(`		<nav class="navbar navbar-light bg-light justify-content-between">\n\r`)
stream.write(`			<a class="navbar-brand">Hereos Blog Viewer</a>\n\r`)
stream.write(`			<ul class="navbar-nav">\n\r`)
stream.write(`				<a class="nav-link" href="https://www.reddit.com/u/jamiephan">(by /u/jamiephan)</a>\n\r`)
stream.write(`			</ul>\n\r`)
stream.write(`		</nav>\n\r`)
stream.write(`		\n\r`)
stream.write(`		<div class="container" id="blogs">\n\r`)
stream.write(`			<div class="row">\n\r`)
stream.write(`				<div class="col s12">\n\r`)
stream.write(`					<h1>Blogs</h1>\n\r`)
stream.write(`				</div>\n\r`)
stream.write(`			</div>\n\r`)
stream.write(`			<div class="row">\n\r`)
stream.write(`				<div class="col s4">\n\r`)
stream.write(`					<input id="blog-search" type="text" class="search form-control" placeholder="Search" autocomplete="off">\n\r`)
stream.write(`				</div>\n\r`)
stream.write(`			</div>\n\r`)
stream.write(`			<div class="row">\n\r`)
stream.write(`				<div class="col s12">\n\r`)
stream.write(`					<table class="table table-hover">\n\r`)
stream.write(`						<thead>\n\r`)
stream.write(`							<tr>\n\r`)
stream.write(`								<th scope="col" data-sort="hash" data-asc="asc" onclick="sort(this)">#</th>\n\r`)
stream.write(`								<th scope="col">Thumbnail</th>\n\r`)
stream.write(`								<th scope="col" data-sort="title" data-asc="asc" onclick="sort(this)">Blog Title</th>\n\r`)
stream.write(`								<th scope="col" data-sort="date" data-asc="asc" onclick="sort(this)">Date</th>\n\r`)
// stream.write(`								<th scope="col" data-sort="link" data-asc="asc" onclick="sort(this)">Link</th>\n\r`)
stream.write(`							</tr>\n\r`)
stream.write(`						</thead>\n\r`)
stream.write(`						<tbody class="list">\n\r`)
var months = []
for (var i = 0; i < 9; i++) {
	months.push("0" + (i+1))
}
for (var i = 0; i < 3; i++) {
	months.push("1" + (i))
}
for (var i = 0; i < json.length; i++) {
	let date = new Date(json[i].timestamp)
stream.write(`							<tr>\n\r`)
stream.write(`								<th scope="row" class="hash">${i+1}</th>\n\r`)
stream.write(`								<td class=""><img class="lazyload" data-src="${json[i].thumbnail}" src="placeholder.png"/></td>\n\r`)
stream.write(`								<td class="title"><a href="${json[i].link}">${json[i].title}</td></a>\n\r`)
stream.write(`								<td class="dateStr">${date.getDate()}/${months[date.getMonth()]}/${date.getFullYear()}</td>\n\r`)
stream.write(`								<td class="date" style="display:none">${json[i].timestamp}</td>\n\r`)
// stream.write(`								<td class="link">${json[i].link}</td>\n\r`)
stream.write(`							</tr>\n\r`)
}
stream.write(`						</tbody>\n\r`)
stream.write(`					</table>\n\r`)
stream.write(`				</div>\n\r`)
stream.write(`			</div>\n\r`)
stream.write(`		</div>\n\r`)
stream.write(`		<script>\n\r`)
stream.write(`			lazyload()\n\r`)
stream.write(`			var options = {\n\r`)
stream.write(`			  valueNames: [ 'hash', 'title', "date"]\n\r`)
stream.write(`			};\n\r`)
stream.write(`\n\r`)
stream.write(`			var blogList = new List('blogs', options);\n\r`)
stream.write(`\n\r`)
stream.write(`			function sort(sort){\n\r`)
stream.write(`				blogList.sort(sort.dataset.sort, {order: sort.dataset.asc})\n\r`)
stream.write(`				sort.dataset.asc = (sort.dataset.asc == "asc" ? "desc" : "asc")\n\r`)
stream.write(`			}\n\r`)
stream.write(`		</script>\n\r`)
stream.write(`	</body>\n\r`)
stream.write(`</html>\n\r`)

  stream.end();
});