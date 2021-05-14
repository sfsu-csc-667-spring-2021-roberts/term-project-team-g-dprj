const listingChannel = window.dprj.pusher.subscribe(`game-lobby-${gameId}`);

const gameList = document.querySelector('#players-list');

listingChannel.bind('added', ({ fullname, hash, gameFull, gameId }) => {
  console.log({ fullname, hash, gameFull, gameId });

  if (gameFull) {
    window.location = `/games/${gameId}`;
  } else {
    const li = document.createElement('li');
    li.innerHTML = `<img class="user-icon" src="https://www.gravatar.com/avatar/${hash}?s=30" alt="${fullname}" /> ${fullname}`;

    gameList.appendChild(li);
  }
});
