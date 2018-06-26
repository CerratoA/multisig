var multiSigHelperImport = require("./multisig");
var multiSigHelper = new multiSigHelperImport();

var k1="03F6C1CC3C8D287DC377C0F9DD16B07241CA7DDE082349B3B935ED949C785C2934";
var k2="03939F87935F23DA1F0BA54F63C5FFB2540DC0B3582F5ED908C218848CDC0A7FF8";
var k3="031E6AA15F7525F163E83BE1C219D481E062E81783A4E845FDABD1527068DFF04D";

var msAddr = "2MxfW9Mr3XSy8KvLW4NK4iUQ6RH5RgHmYqq";
var msScript = "OP_HASH160 20 0x3b7019483a229b81911d31e02907ba72e777e254 OP_EQUAL";

var result= multiSigHelper.generatorMs(k1, k2, k3);
console.log('result', result.toScriptHashOut().toAddress('testnet'));
console.log("Address  and  script "+ "    " + result.toScriptHashOut().toAddress('testnet') + "     "  +  result.toScriptHashOut());


var servaddr ="2MxfW9Mr3XSy8KvLW4NK4iUQ6RH5RgHmYqq"; 
var servscript="OP_HASH160 20 0x3b7019483a229b81911d31e02907ba72e777e254 OP_EQUAL";
var verify= multiSigHelper.verifyMs(result,servaddr,servscript);
