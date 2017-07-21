const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const models = require("./db/schema");
const path = require("path");

app.use(bodyParser.json({extended: true}));
app.use("/assets", express.static("public"));

//show all samples
app.get("/api/samples", (req, res) => {
	models.Sample.find({}).then(function(samples){
		res.json(samples)
	});
});

//new sample
app.post("/api/samples", (req, res) => {
	models.Sample.create(req.body).then(function(sample) {
		res.json(sample);
	});
});

//show particular sample
app.get("/api/samples/:name", (req, res) => {
	models.Sample.findOne(req.params).then(function(sample){
		res.json(sample)
	});
});

//edit sample
app.put("/api/samples/:name", (req, res) => {
	models.Sample.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).then(function(sample) {
		res.json(sample);
	});
});

//delete sample
app.delete("/api/samples/:name", (req, res) => {
	models.Sample.findOneAndRemove({name: req.params.name}).then(function(){
		res.json({success: true})
	});
});


//show all extractions
app.get("/api/extractions", (req, res) => {
	models.Extraction.find({}).then(function(extractions){
		res.json(extractions)
	});
});

//show particular extraction
app.get("/api/extractions/:name", (req, res) => {
	models.Extraction.findOne(req.params).populate("samples").then(function(extraction){
		res.json(extraction)
	});
});

//edit extraction
app.put("/api/extractions/:name", (req, res) => {
	models.Extraction.findOne({name: req.params.name}).then(function(extraction){
		extraction.name = req.body.name;
		extraction.goal_date = req.body.goal_date;
		extraction.analyst = req.body.analyst;
		extraction.samples = [ObjectId("59724ac0f06cf1d4f475")]
		extraction.save().then(function(extraction){
		res.json(extraction);
		});
	});
});

//this is what links the app to the index.html
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(4000, () => {
	console.log("app listening on port 4000")
});