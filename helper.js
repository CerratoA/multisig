 //quantitysale =cantidad que se vende, percfee1 = % de fee , percguaran1 =  % garantia 
var quantitysale ,percfee1,percguaran1;
var guarantee1,fee1,totalsale;
var totalquantitysale={};
function quantityTotal(order,quantitysale,percfee1,percguaran1) {
    guarantee1=percguaran1*quantitysale;
    fee1=percfee1*quantitysale;
    totalsale=guarantee1+fee1+quantitysale;
    totalquantitysale.quantitysale=quantitysale;
    totalquantitysale.fee1=fee1;
    totalquantitysale.guarantee1=guarantee1;
    totalquantitysale.totalsale=totalsale;
    return totalquantitysale;
}
quantityTotal(null,50,0.2,0.3)
console.log( " total= " + "  " + totalquantitysale.totalsale +"  " + "fee1= " + "  " +fee1 + "   "+ "guarantee1 =" +"  "+ totalquantitysale.guarantee1 );
console.log("Objeto1 =" + totalquantitysale );
//quantitybuy =cantidad que se compra , percfee2 = % de fee , percguaran2 =  % garantia 

var quantitybuy ,percfee2,percguaran2;
var guarantee2, fee2 ,subtotal;
var totalquantitybuy={};
function quantitySubtotal(order,quantitybuy,percfee2,percguaran2) {
    guarantee2 = percguaran2*quantitybuy;
    fee2 = percfee2*quantitybuy;
    subtotal=guarantee2 + fee2;
    totalquantitybuy.fee2=fee2;
    totalquantitybuy.guarantee2=guarantee2;
    totalquantitybuy.subtotal=subtotal;
    return totalquantitybuy;
}
subtotalbuy=quantitySubtotal(null,50,0.25,0.7)
console.log( " subtotal= " + "  " + totalquantitybuy.subtotal +"  " + "fee2= " + "  " +fee2 +"  " + "guarantee2 =" +"  "+ totalquantitybuy.guarantee2 );
console.log("Objeto2 =" + totalquantitybuy );

// La funcion verinforSale  comprueba la informacion que ha remitido el vendedor y la que tiene el Blockchain(Bc)


function verinforSale(quantitysale,fee1,percguaran1,quantitysaleBc,fee1Bc,percguaran1Bc){
    
if(quantitysale!==quantitysaleBc){
    console.log("Different quantitysale");
} else {console.log("Equal quantitysale");
} 
if(fee1!==fee1Bc){
        console.log("Different fee1");
}else{console.log("Equal fee1");
}
if(percguaran1!==percguaran1Bc){
    console.log("different percguaran1");
}else{console.log("Equal perceguaran1 ");
}
if(quantitysale==quantitysaleBc && fee1==fee1Bc && percguaran1==percguaran1Bc ) {
        console.log ("Equal quantitysale , fee1  and percguaran1 verify---------- ");
        return true
}else {console.log("No Verify:::::::");
        return false
}
}   
var verifySale=verinforSale(50,4,3,60,2,6)

// La funcion verinforBuy  comprueba la informacion que ha remitido el comprador y la que tiene el Blockchain(Bc)

function verinforBuy(quantitybuy,fee2,percguaran2,quantitybuyBc,fee2Bc,percguaran2Bc){
    
    if(fee2!==fee2Bc){
        console.log("Different fee2");
    }else{console.log("Equal fee2");
    }
    if(percguaran2!==percguaran2Bc){
        console.log("different percguaran2");
    }else{console.log("Equal perceguaran2 ");
    }
    if(fee2==fee2Bc && percguaran2==percguaran2Bc ) {
            console.log ("Equal  fee2  and percguaran2 verify----------");
            return true
    }else {console.log("No Verify:::::::");
            return false
    }
    }   
    var verifyBuy=verinforBuy(60,2,3,60,2,3)
    