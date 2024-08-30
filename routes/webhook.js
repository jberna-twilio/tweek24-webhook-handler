var express = require('express');
var router = express.Router();
var debug = require('debug')('callcentermonitoringapp:server');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', ws => {
  //ws.send('Connected to WebSocket');
  // Send updates to the client as required
});

/* /webhook route */
router.post('/', function(req, res, next) {
  const data = req.body;
  
  var message;

  debug(data);

  message = JSON.stringify(data);

  // Broadcast the data to all WebSocket clients
  wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
          client.send(message);
      }
  });

  //res.sendStatus(200);
  res.send('clients notified');
});

module.exports = router;
