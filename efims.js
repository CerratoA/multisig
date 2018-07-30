var _ = require('lodash')
var bitcore = require('bitcore-lib') 

//var network = bitcore.network
var totalKeys = 3
var requiredSignatures = 2


const COIN = 100000000

let coin_data = {
    "efin": {
        "mainnet": {
            network_data: {
                name: "efin/mainnet",
                alias: "efin livenet",
                pubkeyhash: 0x21,
                privatekey: 0x5c,
                scripthash: 0x3c,
                pubkey: 0x011c3bed,
                privkey: 0x011c3488
            },
            
        }
        
    }
}

let desired_coin_data = coin_data["efin"]
console.log(coin_data)
var network=bitcore.Networks.add(desired_coin_data["mainnet"].network_data);

function getNewUser(){
    var obj = {};
    obj.privkey = new bitcore.PrivateKey("efin/mainnet");
    obj.pubkey = new bitcore.PublicKey(obj.privkey);
    obj.address = obj.pubkey.toAddress();
    console.log(obj);
    return obj
}
//getNewUser()

 var parties= [
    {   PrivKey: "c4bb93ef44d223935f2c50b1c22b4bebca28d2b5783b7a32355c857a6a1fa6c8",
        pubkey: "031541f365c0c425c0bf6d3829f1a3921dbea8b77a01522e74cd2167b5db3825ff",
        address:"Address: ENDkhiVeBMH5TKUoNMwQVskaB4jFsAh4TV"
    },
    {   Privkey:'a57fdb31a65f95c66aeba024afdd088fb9bf1c7b9f1d7177f5f490808d751077',
        pubkey:"0229dafc35ecbf9514e4645071d1f449478d8443e5fd9d6e581ed508d8f2be3ac0",
        address:"Eb9egLtWomx1oDhg6oABHQrsDkNHkaYEtc"
    },
    {   PrivKey:'18a6425a125543e8f5241943c31ac852fc2fb2dafc34feff668defb4662f8106',
        pubkey:"02eb1b36f0916fa07f7a6f144979e549187e17e2e549cf1c16c609c0ace91eecdc",
        address:"EYDJf53qumHeRUQkMCxxPSAhquKHL9rWT1"
    }
]
 

var pubkeys = [
    parties[0].pubkey,
    parties[1].pubkey,
    parties[2].pubkey
]





// multisig address
var address = bitcore.Address(pubkeys, requiredSignatures, network)
console.log(" Address MS  ", address)
// get utxo from external source (chromanode, insight, blockr...)

var utxo = {
  txId: '9500bed37ae3deaec7357d67864a57e193b2f0c87906cd17f28a2b0218495879',
  outputIndex: 0,
  address: address.toString(),
  script: bitcore.Script(address).toHex(),
  satoshis: 50*COIN
}

// create tx
var txObj = bitcore.Transaction()
  .from(utxo, pubkeys, requiredSignatures)
  //address generada  y pegada
  .to('EWzxuptz9pVMYpBqkoDkMCiB1tk7dYzXFi', utxo.satoshis)
  //.to('n3E3sYxTwz4FCU3LdUnKiiG1PTcPC654Za', utxo.satoshis)
  .toObject()
console.log("Objeto   ",Object)
// Alice sign tx
var sigAliceObj = bitcore.Transaction(txObj).getSignatures(parties[0].PrivKey)[0]
console.log("sigAliceObj   ", sigAliceObj)
// Bob sign tx
var sigBobObj = bitcore.Transaction(txObj).getSignatures(parties[2].PrivKey)[0]
console.log("sigBobObj   ", sigBobObj)
// apply Alice and Bob signatures
var tx = bitcore.Transaction(txObj)
  .applySignature(sigAliceObj)
  .applySignature(sigBobObj)
  console.log("Transaction    ",tx)
  console.log('fully signed?', tx.isFullySigned())
