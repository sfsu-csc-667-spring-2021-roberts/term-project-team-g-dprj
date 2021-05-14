const express = require('express');
const md5 = require('md5');
const router = express.Router();

router.post('/:id', (request, response) => {
  const roomId = request.params.id;
  const message = request.body.message;

  request.app.get('pusher').trigger(`chat-${roomId === '0' ? 'lobby' : roomId}`, 'message', {
    timestamp: new Date().toISOString(),
    message,
    user: {
      ...request.user,
      hash: md5(request.user.email),
    },
  });
  response.json({ message: 'ok' });
});

module.exports = router;
