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
      console.log(obj);
      return obj
  }
 // getNewUser()
  
  var parties= [
    {   PrivKey: "24269c6cec69ff18a734becca70808e2a38bcd805eaa2e0a8cdb34bc687a054a",
        pubkey: "02339a428227800b953b44213f1976ba6ae85463df34ab79e68095a28d04b0f212",
        address:"TMViLQForxxUTviLEByfNWsDuN9myWVgVx"
    },
    {   Privkey:'58b95644ffd5622f836301a46c7d6448d8a14746743b8a3abeee2c0c1f45ce87',
        pubkey:"025f5b3f0df2e580ff721b8e29f8a5fb163df7d885612df66cf137fd338830409a",
        address:"TFAnFiaxsYXRVAy7y343JcQXHKctazR9Qp"
    },
    {   PrivKey:'d5e2fa375b0d9cf9816f33603ff24135e59a2ddf4593eb6faac57fc317a4b1b5',
        pubkey:"031674e3576def565b221f9c35a2fd4e93f6867405a671ffba12de9ea483ab5e3d",
        address:"TPxaMENNrNUq8MZTUSWEf5uMJ69Pvg3gsK"
    }
]
 
var pubkeys = [
    parties[0].pubkey,
    parties[1].pubkey,
    parties[2].pubkey
]
//console.log(pubkeys); 

//  ESTA  FUNCION  MULTISIG FUNCIONA  PARA BITCOIN Y EFIN  PERO NO PARA TOKEN PAY  POR TANTO
// USAR  LA  SIGUIENTE  FUNCION  createTpayMs
//function createMS(){
  //  var multisig = {};
    //var redeemScript = btcLibrary.generatorMs(parties[0].pubkey,parties[1].pubkey,parties[2].pubkey)
    //multisig.msAddress = btcLibrary.getMSAddress(redeemScript);
    //multisig.msScript = btcLibrary.getMSScript(redeemScript).toString();
    //console.log('msdata', multisig);
    //msAddress=multisig.msAddress
    //return msAddress
//};
//createMS()

var msAddress;
var msScript;
function createTpayMs(){
var multisig={}
multisig.msAddress = bitcore.Address(pubkeys, requiredSignatures, network)
multisig.msScript= bitcore.Script(multisig.msAddress).toHex();
msAddress=multisig.msAddress
msScript=multisig.msScript
console.log( "Address  MS  ", multisig.msAddress); 
console.log( "Script  MS  ", multisig.msScript); 
return multisig;
}
createTpayMs()

var utxo = {
    txId: "f788a679f943f119ed94959c6e2eb69115758f374edc96fda3397577062d263d",
    outputIndex: 0,
    address: msAddress.toString(),
    //script: bitcore.Script(msAddress).toHex(),
    script:msScript,
    satoshis: 50*COIN
  }
  
  
  
  var Object;
  var stObj;
  
  function signTX(){
  var txObj = new bitcore.Transaction()
      .from(utxo, pubkeys, requiredSignatures)
      //address generada  y pegada
      .to("TGxjdtn76KaFYSGnNT99s567axVv4BMxVf" ,utxo.satoshis)
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
  }
  
  signTX();
  
    
