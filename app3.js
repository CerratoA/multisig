var bitcore = require("bitcore-lib")
var Explorer = require('bitcore-explorers');
var PublicKey = bitcore.PublicKey;
var PrivateKey = bitcore.PrivateKey;
function privkey(){
    return new bitcore.PrivateKey()
}

//15rzCMz4yR4YrKXrkT81dZhjYSggQitf4p
//KyRe146cCSRU24Jo5ijTNqDDw3rthC3VsK6aZAaXzvZoTpwoCN5D

//1ACzqUNxH5WvHidPujsqEAdcjz4zcqjXAT
//KysLRBQwnH2zX6ykLoa4c15vi6ymwsdWosNG1zHFpwK4PnMBoHzU

//1AB99SYBgYvEDRxuW37K1JFzVjEarjUMvc
//L2Ec9EHKy5C1uark6Zw21F9CdJUN9KrNuDHw62fojyKRyHJdcceX

var keys = [
    new PrivateKey("92hk57waxhwH3rUkC4xrb3WZQUJrMcY2gDmuLUFrojF5Ahbf93d", 'testnet'),
    new PrivateKey("93BbqHDYjkXZVNv1aTkWjxbBNXkhJPqp3CFQpLoWubVtiXeu163", 'testnet'),
    new PrivateKey("92wLqxREvAHmQ2JiAdnccnYJ9USmzMotmPj44QT1vkJuvx6r6gN",'testnet')  
]
console.log(keys);

var pkeys = [
  new PublicKey("03939F87935F23DA1F0BA54F63C5FFB2540DC0B3582F5ED908C218848CDC0A7FF8",{network: 'testnet'}),
  new PublicKey("03F6C1CC3C8D287DC377C0F9DD16B07241CA7DDE082349B3B935ED949C785C2934",{network: 'testnet'}),
  new PublicKey("031E6AA15F7525F163E83BE1C219D481E062E81783A4E845FDABD1527068DFF04D",{network: 'testnet'})
]
console.log(pkeys);

// var pubkey=[
//     new PublicKey("03F6C1CC3C8D287DC377C0F9DD16B07241CA7DDE082349B3B935ED949C785C2934"),
//     new PublicKey("03939F87935F23DA1F0BA54F63C5FFB2540DC0B3582F5ED908C218848CDC0A7FF8"),
//     new PublicKey("031E6AA15F7525F163E83BE1C219D481E062E81783A4E845FDABD1527068DFF04D")
// ]
// var privkeys = [
//     new PrivateKey("92hk57waxhwH3rUkC4xrb3WZQUJrMcY2gDmuLUFrojF5Ahbf93d"),
//     new PrivateKey("93BbqHDYjkXZVNv1aTkWjxbBNXkhJPqp3CFQpLoWubVtiXeu163")
// ]
// var mysign = new PrivateKey("93BbqHDYjkXZVNv1aTkWjxbBNXkhJPqp3CFQpLoWubVtiXeu163");
// console.log(pubkey);
// console.log(privkeys);
var redeemScript = bitcore.Script.buildMultisigOut(pkeys, 2)
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


var newpkeys = [
    keys[0],
    keys[1]
]
var transaction = new bitcore.Transaction()
    .from(utxo, pkeys, 2)
    .change(msadd)
    .to("mudg6aHnRgPeJk6F5SBLnVPdmGZjeXJC5w", 51388706)
    .sign(newpkeys);
console.log(transaction.toObject());
// console.log('transaction:', transaction.checkedSerialize());
var signature = transaction.getSignatures(keys[0])[0];
console.log(signature);

//var texto = assert(script.toString() === 'OP_HASH160 20 0x620a6eeaf538ec9eb89b6ae83f2ed8ef98566a03 OP_EQUAL');
//console.log("resultado" , texto)

//console.log(address)
// console.log(new bitcore.PrivateKey())