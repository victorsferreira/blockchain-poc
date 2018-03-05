const createHash = require('crypto').createHash;

class POW{
  static function generate(input, difficulty) {
      var id = 0;
      while (true) {
          var nonce = id.toString(16);

          var hash = POW.encrypt(input+nonce);

          if (hash.substr(0,input) === '000') return nonce;
          else id++;
      }
  }

  static encrypt(input, hash_function = 'sha256'){
    return createHash(hash_function).update(input).digest('hex');
  }
}

module.exports = POW;
