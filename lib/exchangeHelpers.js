function exchangeHelpers() {
    //quantitysale =cantidad que se vende, percfee1 = % de fee , percguaran1 =  % garantia 
    this.quantityTotal = function (order,percfee,percguaran) {
        var guarantee,fee,totalsale;
        var totalquantitysale={};
        guarantee = percguaran * order.amount;
        fee = percfee * order.amount;
        totalsale = guarantee + fee + order.amount;
        totalquantitysale.amount = order.amount;
        totalquantitysale.fee=fee;
        totalquantitysale.guarantee=guarantee;
        totalquantitysale.totalsale=totalsale;
        return totalquantitysale;
    }
    //quantitybuy =cantidad que se compra , percfee2 = % de fee , percguaran2 =  % garantia 
    this.quantitySubtotal = function (order,percfee,percguaran) {
        var guarantee, fee ,subtotal;
        var totalquantitybuy={};
        guarantee = percguaran * order.amount;
        fee = percfee * order.amount;
        subtotal=guarantee + fee;
        totalquantitybuy.fee=fee;
        totalquantitybuy.guarantee=guarantee;
        totalquantitybuy.subtotal=subtotal;
        return totalquantitybuy;
    }
    //La funcion verinforSale  comprueba la informacion que ha remitido el vendedor y la que tiene el Blockchain(Bc)
    this.verinforSale = function (totalquantitysale,txAmountSale){
        if(totalquantitysale.totalsale!==txAmountSale){
            console.log("Different quantitysale");
            return false
        } else {
            console.log("Equal quantitysale");
            return true
        }
    }
    // La funcion verinforBuy  comprueba la informacion que ha remitido el comprador y la que tiene el Blockchain(Bc)
    this.verinforBuy = function (totalquantitybuy,txAmountBuy){
        if(totalquantitybuy.subtotal!==txAmountBuy){
            console.log("Different quantitysale");
            return false
        } else {
            console.log("Equal quantitysale");
            return true
        }
    }
}

module.exports = exchangeHelpers;    