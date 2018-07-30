var bitcore = require("bitcore-lib");
var PublicKey = bitcore.PublicKey;

function multiSigHelper() {
    this.generatorMs = function(ownerPubKey,takerPubKey,arbitraitorPubKey){
        var pubKeysArray = [];
        pubKeysArray.push(this.genPublicKey(ownerPubKey));
        pubKeysArray.push(this.genPublicKey(takerPubKey));
        pubKeysArray.push(this.genPublicKey(arbitraitorPubKey));
        console.log(pubKeysArray);
        var redeemScript = bitcore.Script.buildMultisigOut(pubKeysArray, 2);
        return redeemScript;
    }
    this.genPublicKey = function(pubkeyString){
        return new PublicKey(pubkeyString);
    }
    this.getMSAddress = function(redeemScript){
        return redeemScript.toScriptHashOut().toAddress('tokenpay/mainnet');
    }
    
    this.getMSScript = function(redeemScript){
        return redeemScript.toScriptHashOut();
    }
    
    this.verifyMs = function(redeemScript,servaddr,servscript){
        var addressString = this.getMSAddress(redeemScript).toString();
        var scriptString = this.getMSScript(redeemScript).toString();
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
}

module.exports = multiSigHelper;