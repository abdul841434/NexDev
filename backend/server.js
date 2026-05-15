require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const authRoutes = require("./src/authRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" }
});

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.get("/", (req, res) => {
  res.json({ message: "🚀 NexDev Backend is Live!" });
});

// Socket.io
io.on("connection", (socket) => {
  console.log("✅ Developer connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("❌ Developer disconnected:", socket.id);
  });
});

// Start server
server.listen(5000, () => {
  console.log("🔥 Server running on http://localhost:5000");
});