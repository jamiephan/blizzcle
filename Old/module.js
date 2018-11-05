const fetch = require('node-fetch');
const $ = require('cheerio');

class blog {

	constructor(){
		this._pagenumber = 10
	}

	getBlogs(){
		return new Promise(function(rs, rj){

			setTimeout(function(){
				rs(this._pagenumber)
			}, 1000)


		})
	}

}

module.exports = blog