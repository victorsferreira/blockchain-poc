const createHash = require('crypto').createHash;

class POW {
  static generate(previous_hash, data, difficulty=3) {
    let input = previous_hash + data;

    var id = POW.generateId();
    let sample = Array(difficulty).fill('0').join('');
    let hash = '', nonce = '';
    while (true) {
      nonce = id.toString(16);
      hash = POW.encrypt(input + nonce);
      if (hash.substr(0, difficulty) === sample) return { nonce, hash };
      else id++;
    }
  }

  static generateFromBlock(block, difficulty) {
    return POW.generate(block.previous_hash+block.data, difficulty);
  }

  static encrypt(input, hash_function = 'sha256') {
    return createHash(hash_function).update(input).digest('hex');
  }

  static random(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static generateId(){
    return Date.now() + POW.random(1, 1000000);
  }
}

module.exports = POW;