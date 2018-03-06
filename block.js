const POW = require('./pow');

class Block {
  constructor(data, previous_hash) {
    this.hash = '';
    this.previous_hash = previous_hash;    
    this.timestamp = Date.now();
    this.nonce = '';

    this.setData(data);
  }

  // generateProofOfWork(difficulty = 3) {
  //   POW.generate(input, difficulty);
  // }

  setData(data) {
    if (typeof (data) === 'object') data = JSON.stringify(data);
    this.data = data;
  }

  setHash(hash) {
    this.hash = hash;
  }

  setNonce(nonce) {
    this.nonce = nonce;
  }
}

module.exports = Block;
