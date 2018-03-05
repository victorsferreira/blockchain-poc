var chain = null;

class Chain{
  constructor(){
    // generate genesis
    this.itens = [];
  }

  getLatestBlock(){
    return this.itens[this.itens.length - 1];
  }
}

module.exports = function(){
  if(!chain) chain = new Chain();
  return chain;
}
