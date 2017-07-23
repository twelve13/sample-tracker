const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const models = require("./db/schema");
const path = require("path");


app.use(bodyParser.json({extended: true}));
app.use("/assets", express.static("public"));

//list all extractions
app.get("/api/extractions", (req, res) => {
	models.Extraction.find({}).then(function(extractions){
		res.json(extractions)
	});
});

//show one extraction
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

//show a sample
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
		if(sample.cleaned){
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = (today.getHours()-4) + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+' '+time;
		}
		sample.cleaned_date = dateTime;
		if(sample.sampled){
		var today2 = new Date();
		var date2 = today2.getFullYear()+'-'+(today2.getMonth()+1)+'-'+today2.getDate();
		var time2 = (today2.getHours()-4) + ":" + today2.getMinutes() + ":" + today2.getSeconds();
		var dateTime2 = date2+' '+time2;
		}
		sample.sampled_date = dateTime2;
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
 			extraction.samples.splice(i, 1)
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