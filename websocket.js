const ws = require('ws');
var websocket = null;

class WebSocket {
  constructor(port, peers, handler) {
    console.log('WebSocket created.', 'Port: ', port);

    this.sockets = [];
    this.server = new ws.Server({ port: port });
    this.handler = handler;

    this.server.on('connection', (socket, req) => {
      console.log('A new peer has connected');
      this.connect(socket);
    });

    this.addPeers(peers);
  }

  addPeers(peers) {
    if (!Array.isArray(peers)) peers = [peers];

    peers.forEach((peer) => {
      var socket = new ws(peer);

      socket.on('open', () => {
        console.log('A new connection was opened with peer: ', peer);
        this.connect(socket);
      });

      socket.on('error', (err) => {
        console.log('connection failed', err)
      });
    });
  }

  createMessage(type, data) {
    return JSON.stringify({ type, payload: data });
  }

  write(socket, message) {
    socket.send(message);
  }

  broadcast(message) {
    this.sockets.forEach(socket => this.write(socket, message));
  }

  connect(ws) {
    this.sockets.push(ws);

    ws.on('message', (data) => {
      var message = JSON.parse(data);
      this.handler(message.type, message.payload);
    });

    ws.on('close', () => {
      console.log('A connection with a peer was closed');
      this.disconnect(ws);
    });

    ws.on('error', () => {
      console.log('Error connecting to a peer');
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
