var bitcore = require("bitcore-lib")
var Explorer = require('bitcore-explorers');
var PublicKey = bitcore.PublicKey;
var PrivateKey = bitcore.PrivateKey;
function privkey(){
    return new bitcore.PrivateKey().toString()
}
var pubkey=[
    new PublicKey("03F6C1CC3C8D287DC377C0F9DD16B07241CA7DDE082349B3B935ED949C785C2934"),
    new PublicKey("03939F87935F23DA1F0BA54F63C5FFB2540DC0B3582F5ED908C218848CDC0A7FF8"),
    new PublicKey("031E6AA15F7525F163E83BE1C219D481E062E81783A4E845FDABD1527068DFF04D")
]
var privkeys = [
    new PrivateKey("92hk57waxhwH3rUkC4xrb3WZQUJrMcY2gDmuLUFrojF5Ahbf93d"),
    new PrivateKey("93BbqHDYjkXZVNv1aTkWjxbBNXkhJPqp3CFQpLoWubVtiXeu163")
]
var mysign = new PrivateKey("93BbqHDYjkXZVNv1aTkWjxbBNXkhJPqp3CFQpLoWubVtiXeu163");
console.log(pubkey);
console.log(privkeys);
var redeemScript = bitcore.Script.buildMultisigOut(pubkey, 2)
var script = redeemScript.toScriptHashOut()
console.log(script.toString())
var msadd = script.toAddress('testnet');
console.log('address', msadd);
console.log('data', script.getData());

// async function getutxo(){
//   var client = new Explorer.Insight('testnet');
//   client.getUnspentUtxos
// }

async function getAddressBalance(address) {
    return new Promise((resolve, reject) => {
      const client = new Explorer.Insight('testnet');


      client.getUnspentUtxos(address, (error, utxos) => {
        if (error) {
          reject({
            result: false,
            value: error
          });
          console.log(error);
        } else {
          // console.log(utxos);
          // get balance
          let balance = bitcore.Unit.fromSatoshis(0).toSatoshis();
          for (let index = 0; index < utxos.length; ++index) {
            balance += bitcore.Unit.fromSatoshis(parseInt(utxos[index]['satoshis'])).toSatoshis();
          }

          resolve({
            result: true,
            value: {
              utxos,
              balance
            }
          });
          return;
        }
      });
    });
}


// var utxo;
// getAddressBalance(msadd.toString()).then((results)=>{
//   utxos = results
// });

// async function myprint() { 
//   console.log('utxo', utxo);
//   console.log('utxo', utxo);
//   console.log('utxo', utxo);
// }
// myprint();
// setTimeout(myprint, 3000);
// var threshold = 2;

var utxo = [
  {
     "address":"2MxfW9Mr3XSy8KvLW4NK4iUQ6RH5RgHmYqq",
     "txid":"1542d88bf9c1ecffffa43ee88661c32cff816b6fe610d751e14767ca8210eafc",
     "vout":1,
     "scriptPubKey":"a9143b7019483a229b81911d31e02907ba72e777e25487",
     "amount":0.91388706,
     "satoshis":91388706,
     "height":1325783,
     "confirmations":19
  }
]
var transaction = new bitcore.Transaction()
    .from(utxo, pubkey, 2)
    .change(msadd)
    .to("mxyz4QWQb39Qg1YnDzQHTzsDnUKfP77C4L", 51388706)
    .sign(privkeys);
console.log(transaction.toObject());
// console.log('transaction:', transaction.checkedSerialize());
var signature = transaction.getSignatures(mysign)[0];
console.log(signature);

//var texto = assert(script.toString() === 'OP_HASH160 20 0x620a6eeaf538ec9eb89b6ae83f2ed8ef98566a03 OP_EQUAL');
//console.log("resultado" , texto)

//console.log(address)
// console.log(new bitcore.PrivateKey())