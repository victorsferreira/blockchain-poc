const ws = require('ws');
var websocket = null;

class WebSocket{
  constructor(port, peers){
    console.log('websocket created');

    this.sockets = [];
    this.server = new ws.Server({port: port});

    this.server.on('connection', (socket)=>{
      console.log('connection')
      this.connect(socket);
    });

    peers.forEach((peer) => {
      var socket = new ws(peer);

      socket.on('open', ()=>{
        console.log('open');
        this.connect(socket);
      });

      socket.on('error', () => {
        console.log('connection failed')
      });
    });
  }

  function write(socket, message){
    socket.send(JSON.stringify(message));
  }

  function broadcast(message){
    this.sockets.forEach(socket => write(socket, message));
  }

  connect(ws){
    this.sockets.push(ws);

    ws.on('message', (data) => {
      var message = JSON.parse(data);
      console.log('Received message' + JSON.stringify(message));
      // handle
    });

    ws.on('close', () =>{
      this.disconnect(ws);
    });

    ws.on('error', () => {
      this.disconnect(ws);
    });
  }

  disconnect(ws){
    this.sockets.splice(this.sockets.indexOf(ws), 1);
  }
}

module.export = function(port, peers){
  if(!websocket) websocket = new WebSocket(port, peers || []);
  return websocket;
};
