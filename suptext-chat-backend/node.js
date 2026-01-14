const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const app = express();
require('dotenv').config();

const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO Chat Handling
io.on('connection', (socket) => {
  console.log('🟢 New user connected');

  socket.on('joinRoom', ({ username, country }) => {
    socket.username = username;
    socket.country = country;
    socket.broadcast.emit('message', {
      username: 'System',
      country: '',
      message: `${username} from ${country} has joined the chat.`,
    });
  });

  socket.on('chatMessage', (msg) => {
    io.emit('message', {
      username: socket.username,
      country: socket.country,
      message: msg,
    });
  });

  socket.on('disconnect', () => {
    io.emit('message', {
      username: 'System',
      country: '',
      message: `${socket.username} has left the chat.`,
    });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Suptext server running on port ${PORT}`));
