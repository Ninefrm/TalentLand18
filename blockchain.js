const  SHA256 = require('crypto-js/SHA256');

class Block{
  constructor(data){
    this.index = 0;
    this.data = data;
    this.date = Date.now();
    this.previousHash = '';
    this.hash = this.createHash();
  }

  createHash(){
    let hash = SHA256(JSON.stringify(this.data)+this.date).toString();
    return hash;
  }
}
class Blockchain{
  constructor(){
    this.chain = [this.createBlockGenesis()];
  }

  createBlockGenesis(){
      return new Block({ name: 'Genesis'});
  }

  addBlock(newBlock){
    let previousBlock = this.getLastestBlock();
    newBlock.index = previousBlock.index+1;
    newBlock.previousHash = previousBlock.hash;
    //newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  getLastestBlock(){
    return this.chain[this.chain.length-1];
  }
}


//Ejercicio
block01 = new Block({from: 'User1', monto: 10});
block02 = new Block({from: 'User2', monto: 20});
block03 = new Block({from: 'User3', monto: 30});

console.log(block01);

bc_talent = new Blockchain;
bc_talent.addBlock(block01);
bc_talent.addBlock(block02);
bc_talent.addBlock(block03);

console.log(bc_talent);
