//var bitcore=require('bitcore-mnemonic-instance/node_modules/particl-bitcore-lib');
//var bitcore=require('particl-bitcore-lib');
var _ = require('lodash')
var bitcore = require('bitcore-lib') 
var btcLibraryImport = require('MultisigLibraryBTC');
var btcLibrary = btcLibraryImport.multiSigHelperImport;

//var network = bitcore.network
var totalKeys = 3;
var requiredSignatures = 2;

const COIN = 100000000;

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
        address:"ENDkhiVeBMH5TKUoNMwQVskaB4jFsAh4TV"
    },
    {   Privkey:'a57fdb31a65f95c66aeba024afdd088fb9bf1c7b9f1d7177f5f490808d751077',
        pubkey:"0229dafc35ecbf9514e4645071d1f449478d8443e5fd9d6e581ed508d8f2be3ac0",
        address:"Eb9egLtWomx1oDhg6oABHQrsDkNHkaYEtc"
    },
    {   PrivKey:'18a6425a125543e8f5241943c31ac852fc2fb2dafc34feff668defb4662f8106',
        pubkey:"02eb1b3//6f0916fa07f7a6f144979e549187e17e2e549cf1c16c609c0ace91eecdc",
        address:"EYDJf53qumHeRUQkMCxxPSAhquKHL9rWT1"
    }
]
 

var pubkeys = [
    parties[0].pubkey,
    parties[1].pubkey,
    parties[2].pubkey
]
var msAddress;
var msScript;

function createMS(){
    var redeemScript = btcLibrary.generatorMs(parties[0].pubkey,parties[1].pubkey,parties[2].pubkey)
    msAddress = btcLibrary.getMSAddress(redeemScript);
    msScript = btcLibrary.getMSScript(redeemScript).toString();
    return ;
};
//createMS()
   
 function createEfinMs(){
    msAddress = bitcore.Address(pubkeys, requiredSignatures, network)
    msScript= bitcore.Script(msAddress).toString();
    return ;
    }
createEfinMs()
 console.log( "Address  MS  ", msAddress); 
 console.log( "Script  MS  ", msScript);
// Address  MS Efin     RPYJqCVuSjwNAWUL6jMWebSQZQy8L4eM9v
 var utxo = {
  txId: 'fd12d9632ac42dd5f02ee420feb2277458d90c0a76a144b711fa5fb23eecc358',
  outputIndex: 0,
  address: msAddress.toString(),
  script: msScript,
  satoshis: 500000000
}
var Object;//
var stObj;

function signTX(){
var txObj = new bitcore.Transaction()
    .from(utxo, pubkeys, requiredSignatures)
    //address generada  y pegada
    .to('EYDJf53qumHeRUQkMCxxPSAhquKHL9rWT1', utxo.satoshis-10000)
    .toObject()
    .sign(parties[0].PrivKey);
    var serialized = txObj.toObject();
    //console.log( " 1111" , JSON.stringify(serialized))
    stObj = serialized;
    secondSign(stObj);
}

function secondSign(txObj){
    //requires obj generated from previous sign not hex
    var txObj= new bitcore.Transaction(txObj)
    //second signature
    .sign(parties[2].PrivKey);
    var serialized = txObj.toString();
    //console.log('txHex', JSON.stringify(txObj.toObject()))
    console.log('fully signed?', txObj.isFullySigned())
}

signTX();
