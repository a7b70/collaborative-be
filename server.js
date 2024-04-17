const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow your front end origin to connect
    methods: ["GET", "POST"], // Allowed HTTP methods
  }
});

// Use cors middleware to allow cross-origin requests
app.use(cors());

app.get('/', (req, res) => {
  res.send('Real-time Canvas App');
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data); // Emit to all but the sender
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

