const channel = window.dprj.pusher.subscribe('chat-lobby');
const listingChannel = window.dprj.pusher.subscribe('game-listing');

const messageBox = document.querySelector('#message-box');
const chatArea = document.querySelector('#messages');
const gameList = document.querySelector('#game-list');

let userId = undefined;
// It's possible that a message could be received before this happened but :shrug:
fetch('/users/whoami', {
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
})
  .then((response) => response.json())
  .then(({ id }) => (userId = id))
  .catch((error) => {
    console.error('Failed to retrive current user id:', error);
  });

channel.bind('message', ({ message, timestamp, user }) => {
  const div = document.createElement('div');
  console.log('userId', userId, 'user.id', user.id);
  div.setAttribute('class', `message ${userId === user.id ? 'me' : 'not-me'}`);

  const image = `<img class="user-icon" src="https://www.gravatar.com/avatar/${user.hash}?s=30" alt="${user.fullname}" />`;
  const ts = `<b><span data-livestamp="${timestamp}"></span></b>`;

  if (userId !== user.id) {
    div.innerHTML = `${image}${ts} ${message}`;
  } else {
    div.innerHTML = `${message} ${ts}${image}`;
  }

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

document.querySelector('#message-submit').addEventListener('click', () => {
  sendMessage();
});

listingChannel.bind('added', ({ id, name }) => {
  const li = document.createElement('li');
  li.setAttribute('id', `join-game-${id}`);
  li.innerHTML = `<a href="/games/${id}/join"> Join ${name}</a>`;

  gameList.appendChild(li);
});
