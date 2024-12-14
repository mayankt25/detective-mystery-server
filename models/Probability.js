const mongoose = require("mongoose");

const probabilitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    trueProbability: { type: Number, required: true },
    falseProbability: { type: Number, required: true },
});

const Probability = mongoose.model("Probability", probabilitySchema);

module.exports = Probability;
