const fs = require("fs");
const blogs = JSON.parse(fs.readFileSync("blogs.json", "utf8"))

var patchNotes = []

for (var i = 0; i < blogs.length; i++) {
	let blog = blogs[i]
	let title = blog.title
	if (title.toLowerCase().includes("")) {
		patchNotes.push(blog)
		
	}
}

// WTF JS
function getActualMonth(index){
	return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"][index]
}

// Decending

patchNotes.sort(function(a,b){
	return b.timestamp - a.timestamp
})

var _2014 = 0
var _2015 = 0
var _2016 = 0
var _2017 = 0
var _2018 = 0

for (var i = 0; i < patchNotes.length; i++) {
	let patch = patchNotes[i]
	let time = new Date(patch.timestamp)

	switch (time.getFullYear()) {
		case 2014:
			_2014+=1
			break;
		case 2015:
			_2015+=1
			break;
		case 2016:
			_2016+=1
			break;
		case 2017:
			_2017+=1
			break;
		case 2018:
			_2018+=1
			break;
		default:
			// statements_def
			break;
	}


	// console.log(`${time.getFullYear()}-${getActualMonth(time.getMonth())}-${time.getDate()} `);
	// 
	// console.log(`${patch.title}\n${patch.link}`)
}
// console.log(_2015)

function reddit(){

	// Sort Decending
	blogs.sort(function(a,b){
	return  b.timestamp - a.timestamp
})
	// Reddit post gen
	console.log("|Title|Date|Link")
	console.log("|:--|:--|:--|")
	for (var i = 0; i < blogs.length; i++) {
		let blog = blogs[i]
		let date = new Date(blog.timestamp)
		let dateStr = `${date.getDate()}/${getActualMonth(date.getMonth())}/${date.getFullYear()}`
		console.log(`|${blog.title}|${dateStr}|[link](${blog.link})|`)
	}
}
reddit()

const exec = require('child_process').exec
exec(`node ${__dirname}/${__filename} >> a.md`)