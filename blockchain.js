const SHA256 = require('crypto-js/SHA256');

class Block{

	constructor(data){
		this.index = 0;
		this.data = data;
		this.date = Date.now();
		this.previousHash = '';
    this.nonce = 0;
		this.hash = this.createHash();
	}

	createHash(){
		const hash = SHA256(JSON.stringify(this.data)+this.date+this.nonce).toString();
		return hash;
	}
  mineBlock(difficulty){
    console.log('Mining...')
    while(this.hash.substring(0,difficulty)!='0'.repeat(difficulty){
      this.nonce++
      this.hash = this.createHash();
    }
    console.log('BLOCK MINED:'+this.hash)
  }
}

class Blockchain{
	constructor(){
		this.chain = [];
		this.createBlockGenesis();
    this.pow = 4;
	}

	createBlockGenesis(){
		const block_init = new Block({ name: 'Genesis'});
		this.addBlock(block_init);
	}

	addBlock(newBlock){
		if (this.chain.length != 0){
			let previousBlock = this.getLatestBlock();
			newBlock.index = previousBlock.index + 1;
			newBlock.previousHash = previousBlock.hash;
      newBlock.mineBlock(this.pow); 
		}
		this.chain.push(newBlock);
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	static validateChain(chain){
		return chain.every((currentBlock)=>{
			if( currentBlock.index > 0){
				const previousBlock = chain[currentBlock.index - 1];

		        if (previousBlock.index + 1 !== currentBlock.index) {
		            return false;
		        }
		        if (currentBlock.previousHash !== previousBlock.hash) {
		            return false;
		        }
			}

			if (currentBlock.hash !== currentBlock.createHash()) {
	            console.log('Alguien modificó el contenido');
	            return false;
	        }

	        return true;
    })

	}
}


// Ejercicio
block01 = new Block({ from: 'Brian', monto: 345 });
block02 = new Block({ from: 'Mario', monto: 124 });
block03 = new Block({ from: 'José', monto: 654 });

bc_talento = new Blockchain;
bc_talento.addBlock(block01);
bc_talento.addBlock(block02);
bc_talento.addBlock(block03);

console.log(bc_talento);
console.log(Blockchain.validateChain(bc_talento.chain))

bc_talento.chain[2].data = { nada: 0}

console.log(bc_talento);
console.log(Blockchain.validateChain(bc_talento.chain))
