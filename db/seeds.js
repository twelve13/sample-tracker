const Schema = require("./schema.js");

const Extraction = Schema.Extraction;
const Sample = Schema.Sample;

Extraction.remove({}, err => {
	if(err){
		console.log(err);
	}
});

Sample.remove({}, err => {
	if(err){
		console.log(err);
	}
});


const sample1 = new Sample({
	name: "ABC1701-0001-E01",
	notes: "clean well",
	strs: true,
	mito: true,
	priority: false,
	analyst: "CC",
	cleaned: false,
	sampled: false
});

const sample2 = new Sample({
	name: "ABC1701-0002-E01",
	notes: "sample the teeth",
	strs: true,
	mito: true,
	priority: false,
	analyst: "CC",
	cleaned: false,
	sampled: false
});

const sample3 = new Sample({
	name: "ABC1701-0003-E01",
	strs: true,
	mito: false,
	priority: false,
	analyst: "CC",
	cleaned: false,
	sampled: false
});

const sample4 = new Sample({
	name: "DEF1701-0001-E01",
	notes: "clean well",
	strs: true,
	mito: true,
	priority: false,
	analyst: "XYZ",
	cleaned: false,
	sampled: false
});

const sample5 = new Sample({
	name: "DEF1701-0002-E01",
	notes: "sample 5g",
	strs: false,
	mito: true,
	priority: true,
	analyst: "XYZ",
	cleaned: false,
	sampled: false
});


const unassigned = new Extraction({
	name: "Unassigned",
	goal_date: "7/31/17",
	analyst: "CC",
	bbp_added: false,
	extracted: false,
	samples: [sample1, sample2, sample3, sample4, sample5]
})

const ext1 = new Extraction({
	name: "071417-EXT1",
	goal_date: "7/17/17",
	analyst: "CC",
	bbp_added: false,
	extracted: false
});

const ext2 = new Extraction({
	name: "071417-EXT2",
	goal_date: "7/17/17",
	analyst: "ABC",
	bbp_added: false,
	extracted: false
});

const extractions = [unassigned, ext1, ext2];

extractions.forEach((extraction, i) => {
	extraction.save((err, extraction) => {
		if(err){
			console.log(err)
		} else {
			console.log(`${extraction} was saved to the database`)
		}
	});
});