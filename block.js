const POW = require('./pow');

class Block {
  constructor(data, previous_hash, nonce, hash) {
    this.hash = '';
    this.previous_hash = previous_hash;    
    this.timestamp = Date.now();
    this.nonce = '';

    this.setData(data);
  }

  setData(data) {
    if (typeof (data) === 'object') data = JSON.stringify(data);
    this.data = data;
  }
}

module.exports = Block;
