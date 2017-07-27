const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/sample-tracker");

mongoose.connection.on("error", err => {
	console.log(err);
});

mongoose.connection.once("open", () => {
	console.log("database has been connected");
});

const SampleSchema = new mongoose.Schema({
	name: String,
	notes: String,
	strs: Boolean,
	mito: Boolean,
	priority: Boolean,
	analyst: String,
	cleaned: Boolean,
	sampled: Boolean,
	updated: String,
});

const ExtractionSchema = new mongoose.Schema({
	name: String,
	goal_date: String,
	analyst: String,
	notes: String,
	bbp_added: Boolean,
	extracted: Boolean,
	updated: String,
	archived: Boolean,
	samples : [SampleSchema]
});


var Extraction = mongoose.model("Extraction", ExtractionSchema);
var Sample = mongoose.model("Sample", SampleSchema);

module.exports = {
	Extraction: Extraction,
	Sample: Sample
};