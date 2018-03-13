var express = require('express');
var body_parser = require('body-parser');
var Message = require('./message');
var app = express();
var blockchain = null;
var socket = null;

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.get('/block', (req, res, next) => {
  console.log('blocks', blockchain.itens)
    res.json(blockchain.itens);
});

app.post('/', (req, res, next) => {
      res.send('Data successfully received');
      const block = blockchain.createBlock(req.body);
      socket.broadcast(socket.createMessage(Message.NEW_BLOCK, block));
});

app.post('/peer', (req, res, next) => {
    socket.addPeers(req.body.host);
    res.send('Peer added');
});

module.exports = function (port, _blockchain, _socket) {
    blockchain = _blockchain;
    socket = _socket;

    app.listen(port, function(){
      console.log('HTTP server running on port ', port);
    });

    return app;
};
