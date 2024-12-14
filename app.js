const express = require("express");
const connectDB = require("./db");
const Case = require("./models/Case");

const app = express();
connectDB();
app.use(express.json());

app.get("/api/random-case", async (req, res) => {
    try {
        const randomCase = await Case.aggregate([{ $sample: { size: 1 } }]);
        res.json(randomCase[0]);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));