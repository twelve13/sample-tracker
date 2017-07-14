const express = require("express");
const app = express();
//const bodyParser = require("body-parser");
const models = require("./db/schema");
const path = require("path");

//app.use(bodyParser.json({extended: true}));
app.use("/assets", express.static("public"));

app.get("/api/samples", (req, res) => {

	models.Sample.find({}).then(function(samples){
		res.json(samples)
	});
});

//this is what links the app to the index.html
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(4000, () => {
	console.log("app listening on port 4000")
});