const ws = require('ws');
var websocket = null;

class WebSocket {
  constructor(port, peers, handler) {
    console.log('WebSocket created.', 'Port: ', port);

    this.sockets = [];
    this.server = new ws.Server({ port: port });
    this.handler = handler;

    this.server.on('connection', (socket) => {
      console.log('connection')
      this.connect(socket);
    });

    peers.forEach((peer) => {
      var socket = new ws(peer);

      socket.on('open', () => {
        console.log('open');
        this.connect(socket);
      });

      socket.on('error', (err) => {
        console.log('connection failed', err)
      });
    });
  }

  write(socket, message) {
    socket.send(JSON.stringify(message));
  }

  broadcast(message) {
    this.sockets.forEach(socket => write(socket, message));
  }

  connect(ws) {
    this.sockets.push(ws);

    ws.on('message', (data) => {
      var message = JSON.parse(data);
      this.handler(message);
    });

    ws.on('close', () => {
      this.disconnect(ws);
    });

    ws.on('error', () => {
      this.disconnect(ws);
    });
  }

  disconnect(ws) {
    this.sockets.splice(this.sockets.indexOf(ws), 1);
  }
}

module.exports = function (port, peers, handler) {
  if (!websocket) websocket = new WebSocket(port, peers || [], handler);
  return websocket;
};
