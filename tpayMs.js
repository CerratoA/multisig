var _ = require('lodash')
var bitcore = require('bitcore-lib') 
var btcLibraryImport = require('MultisigLibraryBTC');
var btcLibrary = btcLibraryImport.multiSigHelperImport;
var bitcoin = require('bitcoinjs-lib')
var totalKeys = 3;
var requiredSignatures = 2;

const COIN = 100000000;

  coin_data = {
    tokenpay: {
      mainnet: {
        network_data: {
          name: 'tokenpay/mainnet',
          alias: 'tokenpay livenet',
          pubkeyhash: 0x41,
          privatekey: 0xb3,
          scripthash: 0x7e,
          xpubkey: 0x0488B21E,
          xprivkey: 0x0488ADE4
        },
        
      }
    }
  }
  
  //desired_coin_data = this.coin_data['tokenpay'];
  
 let desired_coin_data = coin_data["tokenpay"];
  console.log(coin_data)
  var network=bitcore.Networks.add(desired_coin_data["mainnet"].network_data);
  
  function getNewUser(){
      var obj = {};
      obj.privkey = new bitcore.PrivateKey("tokenpay/mainnet");
      obj.pubkey = new bitcore.PublicKey(obj.privkey);
      obj.address = obj.pubkey.toAddress();
      console.log("PPPP",obj);
      return obj
  }
  //getNewUser()
  
  var parties= [
    {   PrivKey: "526270d3c14594910cb04d095db52ca865e8a3309f0256cc9a9cbc9bcfc9e89f",
        pubkey: "03c381e95db90bfbfd9cb2153d3563cbe31f5f0248b91095c9ea93526ab1072b22",
        address:"TRZW9GFkJkfN7MFLkLxvpojUZkkVSUDQAR"
    },
    {   Privkey:'e7aa5d86f64c41d0407f19fad6d097408f1c67acf8dcf5bb9def6620b64bf009',
        pubkey:"0317a079316f0e8113da94f1c845102d4966e49ee2d1389f36cd0c0265e1d2d3f9",
        address:  "TCVPmkFoqm81ZZ29nw2WhGGTKHavyXTmMk"

    },
    {   PrivKey:'aee9688bffb7b51faf5b162180a646a1c7bed5ada896ed3d5b04b7f1d58feb49',
        pubkey:"02bd1188ef459948775f1dc8b95cd9d3b5a023327445c81b0e826f3ec6580bffcd",
        address:"TG7wxGXLMpc1joYqnYJAJE3zWBPRM8yduv"
    }
  ]



var pubkeys = [
    parties[0].pubkey,
    parties[1].pubkey,
    parties[2].pubkey
]
//console.log(pubkeys); 
function createMS(){
    var redeemScript = btcLibrary.generatorMs(parties[0].pubkey,parties[1].pubkey,parties[2].pubkey)
    msAddress = btcLibrary.getMSAddress(redeemScript);
    msScript = btcLibrary.getMSScript(redeemScript).toString();
    return ;
};
//createMS()

var msAddress;
var msScript;

function createTpayMs(){
    msAddress = bitcore.Address(pubkeys, requiredSignatures, network)
    msScript= bitcore.Script(msAddress).toString();
    return ;
    }
createTpayMs()
 console.log( "Address  MS  ", msAddress); 
 console.log( "Script  MS  ", msScript);

var utxo = {
    txId: "91018cc26124fd44859428b66ca43e9fc93bc94c31d748148b0eb1d1305701e5",
    outputIndex: 1,
    address: msAddress.toString(),
    //script: bitcore.Script(msAddress).toHex(),
    script:msScript,
    satoshis: 0.04000000*100000000
  }
  var Object;
  var stObj;
  
  function signTX(){
  var txObj = new bitcore.Transaction()
      .from(utxo, pubkeys, requiredSignatures)
      //address generada  y pegada
      .to("TMUKGYVZe2pY5jxVqnRYkNSa6yE79cB18s" ,utxo.satoshis)
      .sign(parties[0].PrivKey);
      var serialized = txObj.toObject();
      stObj = serialized;
      secondSign(stObj);
  }
  
  function secondSign(txObj){
      var txObj= new bitcore.Transaction(txObj)
      .sign(parties[2].PrivKey);
      var serialized = txObj.toString();
      console.log('txHex', serialized)
      console.log('fully signed?', txObj.isFullySigned())
     // console.log('Objeto-', txObj.toObject())
  }
  
  signTX();
  
    
