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
    let data = '', previous_hash = '';
    let pow = POW.generate(data, previous_hash, this.difficulty);
    let block = new Block(data, previous_hash, pow.nonce, pow.hash);
    this.itens = [block];
  }

  addBlock(block) {
    if (this.verifyBlockValidity(block)) {
      this.itens.push(block);
    }
  }

  verifyBlockValidity(block) {
    return true;
  }

  createBlock(data){
    if(typeof(data) === 'object') data = JSON.stringify(data);
    let latest_block = this.getLatestBlock();
    let pow = POW.generate(data, latest_block.hash, this.difficulty);

    let block = new Block(data, latest_block.hash, pow.nonce, pow.hash);
    console.log('Block created');

    this.itens.push(block);
    return block;
  }
}

module.exports = function () {
  if (!chain) chain = new Chain();
  return chain;
}
