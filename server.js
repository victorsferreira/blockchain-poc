var express = require('express');
var app = express();
var blockchain = null;

app.get('/block', (req, res, next) => {
    res.json(blockchain.itens);
});

module.exports = function (port, _blockchain) {
    blockchain = _blockchain;
    app.listen(port);
};