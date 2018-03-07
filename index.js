var websocket = require('./websocket');
var chain = require('./chain');
var server = require('./server');

const ARGS = {};
let arg_name = '', arg_value = '', current_arg = '';
for (let i = 2, length = process.argv.length; i < length; i++) {
  current_arg = process.argv[i];
  if (current_arg.substr(0, 2) == '--') {
    arg_name = current_arg.substr(2);
    if (process.argv[i + 1]) {
      arg_value = process.argv[i + 1];
      i++;
    } else arg_value = true;

    ARGS[arg_name] = arg_value;
  }
}

if (ARGS.peers) {
  ARGS.peers = ARGS.peers.split(',').map((peer) => {
    return peer.trim();
  });
}

const transactions = [];
var blockchain = chain();
var socket = websocket(parseInt(ARGS.port), ARGS.peers, (message) => {
  console.log('Message', message)

  let type = message.type;
  switch (type) {
    case 'BLOCKCHAIN': {

    }

    case 'LATEST_BLOCK': {

    }

    case 'NEW_BLOCK': {

    }

    case 'NEW_TRANSACTION': {
      transactions.push(message.payload.transaction);
    }
  }
});

// setTimeout(() => {
//   blockchain.itens.push(1);
//   blockchain.itens.push(31);
//   blockchain.itens.push(15);
// }, 3000)
