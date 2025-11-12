const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Enable CORS for frontend requests (if needed)
app.use(cors());

// ✅ Serve static files from 'frontend' folder
app.use(express.static(path.join(__dirname, "frontend")));

// ✅ Default route should serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ✅ Optional backend route
app.get("/api", (req, res) => {
  res.json({ message: "Chat Application Backend Running Successfully 🚀" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
