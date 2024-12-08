const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection and other routes
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define schema and model
const resultSchema = new mongoose.Schema({
  username: String,
  crushName: String,
  compatibilityScore: Number,
  date: { type: Date, default: Date.now }
});
const Result = mongoose.model('Result', resultSchema);

// POST route to save result
app.post('/api/save-result', async (req, res) => {
  const { username, crushName } = req.body;

  if (!username || !crushName) {
    return res.status(400).json({ error: "Both username and crush name are required!" });
  }

  try {
    const compatibilityScore = Math.floor(Math.random() * 100) + 1;
    const newResult = new Result({ username, crushName, compatibilityScore });
    await newResult.save();
    res.status(201).json({ message: "Result saved successfully!", newResult });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to save result" });
  }
});

// Start the server
module.exports = app;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
