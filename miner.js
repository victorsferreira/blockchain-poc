const POW = require('./pow');

class Miner {
    constructor(socket, blockchain) {
        this.pool = [];
        this.socket = null;
        this.blockchain = null;

        this.difficulty = 3;
    }

    start() {
        let data = this.pool.pop();
        if (!data) {
            // no data to work on
            setTimeout(() => {
                this.start();
            }, 1000);
        } else {
            this.handleData(data);
        }
    }

    handleData(data) {
        let latest_block = this.blockchain.getLatestBlock();
        let pow = POW.generate(data, latest_block.hash, this.difficulty);

        let block = new Block(data, latest_block.hash, pow.nonce, pow.hash);

        this.blockchain.addBlock(block);
    }
}

module.exports = new Miner();