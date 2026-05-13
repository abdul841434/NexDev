const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: '🚀 NexDev Backend is Live!' });
});

io.on('connection', (socket) => {
  console.log('✅ Developer connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('❌ Developer disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('🔥 Server running on http://localhost:5000');
});