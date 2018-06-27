var libImport = require('../lib/index.js');
var exchangeHelpers = new libImport.exchangeHelpersImport();

//Sample Order with Amount
var sampleOrder = {
    amount: 100
}

var quantityObject = exchangeHelpers.quantityTotal(sampleOrder,0.2,0.3);
console.log( " total= " + "  " + quantityObject.totalsale +"  " + "fee= " + "  " + quantityObject.fee + "   "+ "guarantee =" +"  "+ quantityObject.guarantee );
console.log("Objeto1 =" + JSON.stringify(quantityObject));

var subtotalbuy = exchangeHelpers.quantitySubtotal(sampleOrder,0.1,0.2)
console.log( " subtotal= " + "  " + subtotalbuy.subtotal +"  " + "fee= " + "  " + subtotalbuy.fee +"  " + "guarantee =" +"  "+ subtotalbuy.guarantee );
console.log("Objeto2 =" + JSON.stringify(subtotalbuy));


var verifySale= exchangeHelpers.verinforSale(quantityObject,150)
var verifyBuy= exchangeHelpers.verinforBuy(subtotalbuy,30)
    