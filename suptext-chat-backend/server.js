const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  let user = {};

  socket.on('join', ({ username, country }) => {
    user = { username, country };
    socket.join(country); // Join country-based room
    socket.to(country).emit('join-msg', { username, country }); // Notify room only
  });

  socket.on('message', (msg) => {
    if (user.country) {
      io.to(user.country).emit('message', {
        username: user.username,
        country: user.country,
        msg,
      });
    }
  });

  socket.on('disconnect', () => {
    if (user.country) {
      socket.to(user.country).emit('leave-msg', {
        username: user.username,
        country: user.country,
      });
    }
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`✅ Suptext Chatroom Server running on http://localhost:${PORT}`);
});
