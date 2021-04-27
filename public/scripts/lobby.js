const channel = window.dprj.pusher.subscribe('chat-lobby');

const messageBox = document.querySelector('#message-box');
const chatArea = document.querySelector('#messages');

channel.bind('message', ({ message, timestamp }) => {
  console.log(message);
  const div = document.createElement('div');
  div.innerHTML = `<b>${moment(timestamp).fromNow()}</b> ${message}`;

  chatArea.appendChild(div);
});

const sendMessage = () => {
  const message = messageBox.value;
  messageBox.value = '';

  fetch('/chat/0', {
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    body: JSON.stringify({ message }),
  })
    .then((_) => console.log('message sent'))
    .catch(console.log);
};

messageBox.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    sendMessage();
  }
});

document.querySelector('#message-submit').addEventListener('click', (event) => {
  sendMessage();
});
