const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const models = require("./db/schema");
const path = require("path");


app.use(bodyParser.json({extended: true}));
app.use("/assets", express.static("public"));

app.get("/api/extractions", (req, res) => {
	models.Extraction.find({}).then(function(extractions){
		res.json(extractions)
	});
});

app.get("/api/extractions/:name", (req, res) => {
	models.Extraction.findOne(req.params).then(function(extraction){
		res.json(extraction)
	});
});

//new sample
app.post("/api/extractions/:name/samples", (req, res) => {
	models.Extraction.findOne({name: req.params.name}).then(function(extraction) {
		models.Sample.create(req.body).then(function(sample) {
			extraction.samples.push(sample)
			extraction.save().then(function(extraction){
				res.json(extraction);
			});
		});
	});
});

app.get("/api/extractions/:name/samples/:id", (req, res) => {
	models.Extraction.findOne({ name: req.params.name }).then(function(extraction) {
 		let sample = extraction.samples.find(function(sample){
            return sample.id === req.params.id
 		});
 		res.json(sample)
	});
 });

//edit sample
app.put("/api/extractions/:name/samples/:id", (req, res) => {
	models.Extraction.findOne({name: req.params.name}).then(function(extraction){
		let sample = extraction.samples.find((sample) =>{
			return sample.id == req.params.id
		});
		sample.name = req.body.name;
		sample.notes = req.body.notes;
		sample.analyst = req.body.analyst;
		sample.strs = req.body.strs;
		sample.mito = req.body.mito;
		sample.priority = req.body.priority;
		sample.cleaned = req.body.cleaned;
		sample.sampled = req.body.sampled;
		extraction.save().then(function(extraction){
			res.json(extraction);
		})
	});
});

//delete sample
app.delete("/api/extractions/:name/samples/:id", (req, res) => {
	models.Extraction.findOne({name: req.params.name}).then(function(extraction){
		let sample = extraction.samples.find((sample) =>{
			return sample.id == req.params.id
		});
	for(let i=0; i<extraction.samples.length; i++){
		if(extraction.samples[i].id == sample.id){
		}
	}	
		extraction.save().then(function(){
			res.json({success: true});
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