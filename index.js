var websocket = require('./websocket');

const ARGS = {};
let arg_name='', arg_value='', current_arg = '';
for(let i=2, length = process.argv.length; i<length; i++){
  current_arg = process.argv[i];
  if(current_arg.substr(0,2)=='--'){
    arg_name = current_arg.substr(2);
    if(process.argv[i+1]){
      arg_value = process.argv[i+1];
      i++;
    }else arg_value = true;

    ARGS[arg_name] = arg_value;
  }
}

if(ARGS.peers) {
  ARGS.peers = ARGS.peers.split(',').map((peer)=>{
    return peer.trim();
  });
}

var websocket_server = websocket(ARGS.port, ARGS.peers).server;
