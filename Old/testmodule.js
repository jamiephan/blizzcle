const blog = require("./module.js")
const a = new blog()

a.getBlogs().then(d=>{console.log(d)})