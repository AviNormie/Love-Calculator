const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://avisrivastava:aviissexy@cluster-main.nd18g.mongodb.net/love_calculator";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define a Schema
const resultSchema = new mongoose.Schema({
  username: String,
  crushName: String,
  compatibilityScore: Number, // Optional: if you calculate compatibility
  date: { type: Date, default: Date.now }
});

// Create a Model
const Result = mongoose.model('Result', resultSchema);

// POST Route to Save Data
app.post('/api/save-result', async (req, res) => {
  const { username, crushName } = req.body;

  if (!username || !crushName) {
    return res.status(400).json({ error: "Both username and crush name are required!" });
  }

  try {
    const compatibilityScore = Math.floor(Math.random() * 100) + 1; // Random compatibility for demo
    const newResult = new Result({ username, crushName, compatibilityScore });
    await newResult.save();

    res.status(201).json({ message: "Result saved successfully!", newResult });
  } catch (error) {
    res.status(500).json({ error: "Failed to save result" });
  }
});

// GET Route to Fetch All Results (Optional)
app.get('/api/results', async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
