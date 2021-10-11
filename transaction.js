var Tx = require('ethereumjs-tx').Transaction;
const Web3 = require("web3");
const web3 = new Web3('https://ropsten.infura.io/v3/db5c0b850bb74906ac0c7855445e11e3');

const address1 = '0xe65D6a0cc00C926A3a3187F6921273Af023d5cDC';
const address2 = '0x0704Ffeac316795aA7aFE7a0b0A3Db0Dc25F62f2';
const privateKey1 = '180689739963eb31fa0b6a10d5698fe7b7ce32c4639a9daa0d55fc809ec79dcd';
const privateKey2 = 'f064e9bf47c35eeb223dfea3fad984e460f4d4faae68c13788a43d848e2173e1';

const privateKey_1 = Buffer.from(privateKey1, 'hex');
const privateKey_2 = Buffer.from(privateKey2, 'hex');

web3.eth.getTransactionCount(address1, (err, txCount) =>{
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       address2,
    value:    web3.utils.toHex(web3.utils.toWei('0.001', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')) 
  }

  // Sign the transaction
  const tx = new Tx(txObject, {'chain': 'ropsten'}) 
  tx.sign(privateKey_1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})


