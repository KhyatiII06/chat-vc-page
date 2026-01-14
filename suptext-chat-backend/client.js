const socket = io();

const msgInput = document.getElementById('msg-input');
const sendBtn = document.getElementById('send-btn');
const chatWindow = document.getElementById('chat-window');

socket.emit('join', window.USER_INFO);

sendBtn.addEventListener('click', () => {
  const msg = msgInput.value.trim();
  if (msg !== '') {
    socket.emit('message', msg);
    msgInput.value = '';
  }
});

socket.on('message', ({ username, country, msg }) => {
  const div = document.createElement('div');
  div.innerHTML = `<strong>${username} (${country}):</strong> ${msg}`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

socket.on('join-msg', ({ username, country }) => {
  const div = document.createElement('div');
  div.innerHTML = `<em>${username} (${country}) joined the chat</em>`;
  chatWindow.appendChild(div);
});

socket.on('leave-msg', ({ username, country }) => {
  const div = document.createElement('div');
  div.innerHTML = `<em>${username} (${country}) left the chat</em>`;
  chatWindow.appendChild(div);
});
