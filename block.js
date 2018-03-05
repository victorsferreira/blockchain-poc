const POW = require('./pow');

class Block {
  constructor(previous_hash, data = '') {
    this.hash = '';
    this.previous_hash = previous_hash;
    this.data = this.setData(data);
    this.timestamp = Date.now();
    this.nonce = '';
  }

  generateProofOfWork(difficulty=3) {
    POW.generate(input, difficulty);
  }

  setData(data){
    if(typeof(data) === 'object') data = JSON.stringify(data);
    this.data = data;
  }
}

module.exports = Block;
