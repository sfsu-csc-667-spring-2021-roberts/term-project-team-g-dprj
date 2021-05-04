const express = require('express');
const router = express.Router();

router.post('/:id', (request, response) => {
  const roomId = request.params.id;
  const message = request.body.message;

  request.app
    .get('pusher')
    .trigger(`chat-${roomId === '0' ? 'lobby' : roomId}`, 'message', { timestamp: Date.now(), message });
  response.json({ message: 'ok' });
});

module.exports = router;
