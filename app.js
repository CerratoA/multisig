var bitcoin = require('bitcore-lib');
var btcLibraryImport = require('MultisigLibraryBTC');
var btcLibrary = btcLibraryImport.multiSigHelperImport;

var parties = [
    {
        privkey: 'b35d45af7e2d85823d7ba6bf807be62961eb4f5832681333cf1d0b453e559193',
        pubkey: '03eb0aaf2049d734c96a98e4045fb14b526124c3d4c938e4626455d46ea02365da',
        address: 'mj8WhYB7TVFjHW3LvjeemnaFDnBGSM6jQP'
    },
    {
        privkey: '0f351345b650288ee00d07193d8b3127b17a4e69969ebe4e5e84e3ffe93535fb',
        pubkey: '02827ec40a1403bd02188f5196d9e0e9f82c7b8319472a54f11e51d0b3aebbb07d',
        address: 'mwuktgCn68dij8YENvqZqqnf9d1rDzDAfT'
    },
    {
        privkey: '6debe6a9c4afcc3f46d1a88f0b9aee40a2ef96bfb87d5896c95482597c709350',
        pubkey: '036c30b3cd779094b765ed8e3e5b2efb31289517cf563539a78688ac1cfffa3e5d',
        address: 'mkW5zeoNc6QafPELsGmu4CyPEL2Bc8RHTw'
    }
];

var pubkeys = [
    parties[0].pubkey,
    parties[1].pubkey,
    parties[2].pubkey
]
// DATOS  DE LA  TESTNET
var msData = {
    msAddress: '2N598o2Cj5Jt8mPW5PHdYykzcGkdvHkSepx',
    msScript: 'OP_HASH160 20 0x827aad81269ef45bdfdab57e1b04493f99fd5395 OP_EQUAL'
}
var utxo = {
    "txId" : "575deac55bfb0eb0968f15b519c5e0e32fcae506bb962d0595c21dc00dae01a9",
    "outputIndex" : 0,
    "address" : "2N598o2Cj5Jt8mPW5PHdYykzcGkdvHkSepx",
    "script" : "a914827aad81269ef45bdfdab57e1b04493f99fd539587",
    "satoshis" : 70506635
  };
  

function getNewUser(){
    var obj = {};
    obj.privkey = new bitcoin.PrivateKey('testnet');
    obj.pubkey = new bitcoin.PublicKey(obj.privkey);
    obj.address = obj.pubkey.toAddress();
    console.log( obj);
};
getNewUser()


function createMS(){
    var multisig = {};
    var redeemScript = btcLibrary.generatorMs(parties[0].pubkey,parties[1].pubkey,parties[2].pubkey)
    multisig.msAddress = btcLibrary.getMSAddress(redeemScript);
    multisig.msScript = btcLibrary.getMSScript(redeemScript).toString();
    console.log('msdata', multisig);
    return multisig
};
createMS()

var stObj;

function signTX(){
    var transaction = new bitcoin.Transaction()
    //requires all the pubkeys that were used to create the ms
    //requires the threshold to cash out
    .from(utxo, pubkeys, 2)
    .to('ms8s1nne9gtoteHqYd6HzEfpjWrc3rQLKd', 70505635)
    //can be sign 1 by 1 to send it from one user to the other
    .sign(parties[0].privkey);
    var serialized = transaction.toObject();
    stObj = serialized;
    // var serialized = transaction.toString();
    // console.log('txHex', serialized)
    console.log('txHex', JSON.stringify(serialized))
    secondSign(stObj);
}

var txObj = {"hash":"15222e57deed80b494b115f36565b5581bcc9d0437e6be63e037dbb6685794bd","version":1,
            "inputs":[{"prevTxId":"575deac55bfb0eb0968f15b519c5e0e32fcae506bb962d0595c21dc00dae01a9",
                "outputIndex":0,"sequenceNumber":4294967295,
                "script":"00473044022036e99d43112af52e9c0a575d1b54aa99727e7c2960707c365a821c65ee60680c02205bc20c01e80b98303b794de0f48c1a5afc5fe86abc1691b4f4b030be6a53abdc014c69522102827ec40a1403bd02188f5196d9e0e9f82c7b8319472a54f11e51d0b3aebbb07d21036c30b3cd779094b765ed8e3e5b2efb31289517cf563539a78688ac1cfffa3e5d2103eb0aaf2049d734c96a98e4045fb14b526124c3d4c938e4626455d46ea02365da53ae",
                "scriptString":"OP_0 71 0x3044022036e99d43112af52e9c0a575d1b54aa99727e7c2960707c365a821c65ee60680c02205bc20c01e80b98303b794de0f48c1a5afc5fe86abc1691b4f4b030be6a53abdc01 OP_PUSHDATA1 105 0x522102827ec40a1403bd02188f5196d9e0e9f82c7b8319472a54f11e51d0b3aebbb07d21036c30b3cd779094b765ed8e3e5b2efb31289517cf563539a78688ac1cfffa3e5d2103eb0aaf2049d734c96a98e4045fb14b526124c3d4c938e4626455d46ea02365da53ae",
                "output":{"satoshis":70506635,"script":"a914827aad81269ef45bdfdab57e1b04493f99fd539587"},"threshold":2,
                "publicKeys":["02827ec40a1403bd02188f5196d9e0e9f82c7b8319472a54f11e51d0b3aebbb07d","036c30b3cd779094b765ed8e3e5b2efb31289517cf563539a78688ac1cfffa3e5d","03eb0aaf2049d734c96a98e4045fb14b526124c3d4c938e4626455d46ea02365da"],
              "signatures":[null,null,{"publicKey":"03eb0aaf2049d734c96a98e4045fb14b526124c3d4c938e4626455d46ea02365da","prevTxId":"575deac55bfb0eb0968f15b519c5e0e32fcae506bb962d0595c21dc00dae01a9",
                "outputIndex":0,"inputIndex":0,"signature":"3044022036e99d43112af52e9c0a575d1b54aa99727e7c2960707c365a821c65ee60680c02205bc20c01e80b98303b794de0f48c1a5afc5fe86abc1691b4f4b030be6a53abdc",
                "sigtype":1,
              }]
            }],
            "outputs":[{"satoshis":65506635,"script":"76a9147f73f34c37e8ec855010f997849a1937b501095488ac"}],"nLockTime":0};

var hex = '0100000001a901ae0dc01dc295052d96bb06e5ca2fe3e0c519b5158f96b00efb5bc5ea5d5700000000b400473044022036e99d43112af52e9c0a575d1b54aa99727e7c2960707c365a821c65ee60680c02205bc20c01e80b98303b794de0f48c1a5afc5fe86abc1691b4f4b030be6a53abdc014c69522102827ec40a1403bd02188f5196d9e0e9f82c7b8319472a54f11e51d0b3aebbb07d21036c30b3cd779094b765ed8e3e5b2efb31289517cf563539a78688ac1cfffa3e5d2103eb0aaf2049d734c96a98e4045fb14b526124c3d4c938e4626455d46ea02365da53aeffffffff014b8de703000000001976a9147f73f34c37e8ec855010f997849a1937b501095488ac00000000'

var hexFull = '0100000001a901ae0dc01dc295052d96bb06e5ca2fe3e0c519b5158f96b00efb5bc5ea5d5700000000fdfd0000483045022100c42f53d72c067986ad0b1264a2080a8ee758236fb137eb4735c0f545d9880fa60220378172707d283f4e933e92d0f6741cb86adeed37e479a3ab8529b21c99e8bbd201473044022036e99d43112af52e9c0a575d1b54aa99727e7c2960707c365a821c65ee60680c02205bc20c01e80b98303b794de0f48c1a5afc5fe86abc1691b4f4b030be6a53abdc014c69522102827ec40a1403bd02188f5196d9e0e9f82c7b8319472a54f11e51d0b3aebbb07d21036c30b3cd779094b765ed8e3e5b2efb31289517cf563539a78688ac1cfffa3e5d2103eb0aaf2049d734c96a98e4045fb14b526124c3d4c938e4626455d46ea02365da53aeffffffff014b8de703000000001976a9147f73f34c37e8ec855010f997849a1937b501095488ac00000000'

function secondSign(txObj){
    //requires obj generated from previous sign not hex
    var transaction = new bitcoin.Transaction(txObj)
    //second signature
    .sign(parties[1].privkey);
    var serialized = transaction.toString();
    console.log('txHex', JSON.stringify(transaction.toObject()))
    console.log('fully signed?', transaction.isFullySigned())
}

signTX();
// secondSign(stObj);