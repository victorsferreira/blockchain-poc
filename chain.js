const Block = require('./block');
const POW = require('./pow');

var chain = null;

class Chain {
  constructor() {
    this.itens = [];
    this.difficulty = 3;

    this.setGenesisBlock();
  }

  getLatestBlock() {
    return this.itens[this.itens.length - 1];
  }

  setGenesisBlock() {
    let block = new Block('', '');
    let pow = POW.generateFromBlock(block, this.difficulty);
    
    block.setHash(pow.hash);
    block.setNonce(pow.nonce);
    console.log('proof of work generated', pow)

    this.itens = [block]; 
  }

  createBlock(data){
    let pow_start_timestamp = Date.now();
    console.log('Creating a new block from: ', data);
    let latest_block = this.getLatestBlock();
    let block = new Block(data, latest_block.hash);
    console.log('Generating a Proof of Work: ', pow_start_timestamp);
    let pow = POW.generateFromBlock(block, this.difficulty);
    console.log('Proof of Work was found: ', (Date.now() - pow_start_timestamp) / 1000, 'seconds');
    
    block.setHash(pow.hash);
    block.setNonce(pow.nonce);

    this.itens.push(block);
  }
}

module.exports = function () {
  if (!chain) chain = new Chain();
  return chain;
}
