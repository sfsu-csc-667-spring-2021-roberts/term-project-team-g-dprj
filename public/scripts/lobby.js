const listingChannel = window.dprj.pusher.subscribe('game-listing');

const gameList = document.querySelector('#game-list');

listingChannel.bind('added', ({ id, name }) => {
  const li = document.createElement('li');
  li.setAttribute('id', `join-game-${id}`);
  li.innerHTML = `<a href="/games/${id}/join"> Join ${name}</a>`;

  gameList.appendChild(li);
});
