var bitcore = require("bitcore-lib")
var Explorer = require('bitcore-explorers');
var PublicKey = bitcore.PublicKey;
var PrivateKey = bitcore.PrivateKey;
function privkey(){
    return new bitcore.PrivateKey().toString()
}
var k1=new PublicKey("03F6C1CC3C8D287DC377C0F9DD16B07241CA7DDE082349B3B935ED949C785C2934")
var k2=new PublicKey("03939F87935F23DA1F0BA54F63C5FFB2540DC0B3582F5ED908C218848CDC0A7FF8")
var k3=new PublicKey("031E6AA15F7525F163E83BE1C219D481E062E81783A4E845FDABD1527068DFF04D")

var privkeys = [
    new PrivateKey("92hk57waxhwH3rUkC4xrb3WZQUJrMcY2gDmuLUFrojF5Ahbf93d"),
    new PrivateKey("93BbqHDYjkXZVNv1aTkWjxbBNXkhJPqp3CFQpLoWubVtiXeu163")
]
var pubkey=[
    new PublicKey(k1),
    new PublicKey(k2),
    new PublicKey(k3)
]
var msaddr;
var msscript;
var pk= new PrivateKey("93BbqHDYjkXZVNv1aTkWjxbBNXkhJPqp3CFQpLoWubVtiXeu163");

function generatorMs(k1,k2,k3){
var mysign = new PrivateKey(pk);
console.log(pubkey);
console.log(privkeys);
var redeemScript = bitcore.Script.buildMultisigOut(pubkey, 2);
msscript = redeemScript.toScriptHashOut();
console.log(msscript);
msaddr = msscript.toAddress('testnet');
console.log('address', msaddr);
console.log('data', msscript.getData());
return msaddr,msscript;
}
var result=generatorMs();
console.log("Address  and  script "+ "    " + msaddr + "     "  +  msscript);



function verifyMs(msaddr,msscript,servaddr,servscript){
    var addressString = msaddr.toString();
    var scriptString = msscript.toString();
    console.log(scriptString)
if(scriptString!==servscript){
    console.log("Different script");
    return false
} 
if(addressString!==servaddr){
    console.log("Different address");
    return false
}
if(scriptString==servscript && addressString==servaddr ) {
        console.log ("Equal script  and address verifyMs-------");
        return true
}   
}
var servaddr ="2MxfW9Mr3XSy8KvLW4NK4iUQ6RH5RgHmYqq"; 
var servscript="OP_HASH160 20 0x3b7019483a229b81911d31e02907ba72e777e254 OP_EQUAL";
var verify= verifyMs(msaddr,msscript,servaddr,servscript);
