const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, "frontend")));

// Root route → send chat UI
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// SOCKET.IO REAL-TIME CHAT
io.on("connection", (socket) => {
  console.log("🟢 User connected");

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg); // Broadcast message to everyone
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected");
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Chat server running on http://localhost:${PORT}`);
});
