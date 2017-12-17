var express = require("express")
var request = require("request")
var bodyparser = require("body-parser")

var app = express()
app.use(bodyparser.urlencoded({extended: true}))
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html")
})
app.post("/post", (req, res) => {
	res.redirect("/")
	request({
		method: "POST",
		url: req.body.webhook,
		json: {
			"content": req.body.message,
			"username": req.body.username,
			"avatar_url": req.body.avatar_url,
		}
	})
})

app.listen(process.env.PORT || 80, () => {
	console.log("Started server successfully")
})
