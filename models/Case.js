const mongoose = require("mongoose");

const suspectSchema = new mongoose.Schema({
    name: String,
    relation: String,
    motives: [String],
    evidence: String,
    alibi: String,
    eyewitness: String,
    mental_state: String,
});

const caseSchema = new mongoose.Schema({
    crime_scene: String,
    killer: String,
    suspects: [suspectSchema],
});

const Case = mongoose.model("Case", caseSchema);
module.exports = Case;