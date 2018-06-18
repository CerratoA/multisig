var bitcore = require("bitcore-lib")
var assert = require ("assert")
var PublicKey = bitcore.PublicKey
function privkey(){
    return new bitcore.PrivateKey().toString()
}
var priv1 = privkey();
var priv2 = privkey();
var priv3 = privkey();
console.log("priv1", priv1);
console.log("priv2", priv2);
console.log("priv3", priv3);
var pubkey=[
    new PublicKey("03F6C1CC3C8D287DC377C0F9DD16B07241CA7DDE082349B3B935ED949C785C2934"),
    new PublicKey("03939F87935F23DA1F0BA54F63C5FFB2540DC0B3582F5ED908C218848CDC0A7FF8"),
    new PublicKey("031E6AA15F7525F163E83BE1C219D481E062E81783A4E845FDABD1527068DFF04D")
]
console.log(pubkey);
var redeemScript = bitcore.Script.buildMultisigOut(pubkey, 2)
var script = redeemScript.toScriptHashOut()
console.log(script.toString())
//var texto = assert(script.toString() === 'OP_HASH160 20 0x620a6eeaf538ec9eb89b6ae83f2ed8ef98566a03 OP_EQUAL');
//console.log("resultado" , texto)

//console.log(address)
console.log(new bitcore.PrivateKey())