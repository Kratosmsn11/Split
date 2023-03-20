var data = ["Give us feedback survey.walmart.com G", "Thank you! ID#:7SH6TOVM7GV 100", "SONY PSN 50 20.00 W",  "Camera 20.00 W","CARD# 6058120035996463439", "Walmart", "831-751-0231 Mgr:ERKAN M", "1800 N MAIN", "SALINAS CA 93906", "ST# 02458 OP# 000114 TE# 67 TR# 04762", "SONY PSN 10 079936608434 10.00 0", "SUBTOTAL 50.00", "TOTAL 50.00", "CASH TEND 50.00", "CHANGE DUE 0.00", "# ITEMS SOLD 1", "TC# 8928 8021 9403 6929 1894", "Walmart+ Become a member", "Scan for free 30-day trial pib", "Low Prices You Can Trust. Every Day.", "02/19/23 unspla", "ng along"]
var data1 = ["CASH RECEIPT","Lorem ipsum dolor sit amet","123-45-67","Duis aute 5.45F","Irure 2.55F","Dolor 2.00", "TOTAL 10.00", "Tax 1.00","THANK YOU"]
var data2 = ["TOGO", "Arigato Sushi", "1740 N Main ST.",  "Salinas,CA 93906","(831) 443-0100", "Walk-In-TOGO", "JOSEPH (831) 258-6603", "INV # 202302210111600 02/21/2021","GUESTS:1 07:16PM","Terminal:1 CLERK: VANESSA","QT Description PRICE", "2 CALIFORNIA Roll 13.00", "SUBTOTAL 13.00","Tax: 1.21","TOTAL: 14.21", "CASH: 20.00","CHANGE: -5.79","Your ORDER #","1116"]
var data3 = ["Burger KING #14730", "4859 Gerrardstown Rd.", "Inwood, WV 25423",  "304-229-7992","ORDER 69", "Drive THRU", "DBL WHOPPER CHS 5.99", "No picles","Heavy mayo","BISC EGG CHS 2.59","LG COFFEE 1.79", "SUBTOTAL 10.37", "6.0% TAX","0.62","TOTAL 10.99", "CREDIT CARD 10.99","CHANGE 0.00","TOTAL CHARGE 10.99", "Visa","AcctNum: XXXXXXXXXX9028","Auth: 165997","RefNum: 010269","Merchant Id: 456163014990"]
var taxMatchList = ["tax"];
var totalMatchList = ["total","balance",];
var subtotalMatchList = ["subtotal"];

//make sure to export function
export function extractData(data){
    var receiptData = {};
    var items = [];
    var total;
    receiptData.items = items;
    var total = findValue(data,totalMatchList);
    var tax = findValue(data,taxMatchList);
    var subtotal = findValue(data, subtotalMatchList);
    if(subtotal > 0){
        total = subtotal;
    }
    var itemTotalPrice = 0.0;
    for (var x = 0; x < data.length; x++){
        var line = data[x];
        if(hasNumber(line)){
                var itemName;
                var price;
                var words = data[x].split(" ");
                for (var i = 0; i < words.length; i++){
                    let word = words[i];
                    //some receipts add letters to end of price
                    if(!isFloat(word)){
                        word.substring(1);
                        word = words[i].slice(0,-1);
                        word = word.replace(/[^0-9.]/g, '');
                    }
                    if (isFloat(word)){
                        //number is a float/price
                        price = parseFloat(word);
                        if(price <= 0){continue;}
                        itemName = line;
                        var length = line.length - words[i].length;
                        itemName = itemName.substring(itemName, length);
                        if(itemTotalPrice + price <= total + 0.3){
                            price = parseFloat(price.toFixed(2));
                            itemTotalPrice+=price;
                            var item = {
                                "name": itemName,
                                "price": price
                            }
                            receiptData.items.push(item);
                        }
                        else{
                            break;
                        }
                    }
                }
        }
    }
    //if receipt does not have a subtotal just take the sum of all the items
    if(subtotal==-1){
        subtotal = itemTotalPrice;
    }
    //finding the real total
    if(difference(total,itemTotalPrice)<0.1 && tax !=-1){
        total = total + tax;
    }

    total = itemTotalPrice;
    receiptData.subtotal = subtotal;
    receiptData.total = total.toFixed(2);
    receiptData.tax = tax.toFixed(2);
    console.log(receiptData);
    return receiptData;
}
//data is the receipt data, options is what you are looking for
//example: tax, total/balance, subtotal
function findValue(data,options){
  var value;
  var foundValue = false;
  for (var x = 0; x < data.length; x++){
      var line = data[x];
      var words = line.split(" ");
      for(var z = 0;z < words.length;z++){
          var word = words[z];
          if(foundValue){
            word = word.replace(/[^0-9.]/g, '');
            if(isFloat(word)){
              value = parseFloat(word);
              return value;
            }
          }
          if (matchesOption(word,options)){
              foundValue= true;
          }
      }
  }
  return -1;
}
function difference(v1,v2){
    var v1=Math.abs(v1);
    var v2=Math.abs(v2);
    return Math.abs(v1-v2);
}
//if equals one of the options return true, if none of the options match return false
function matchesOption(str,options){
    str = str.toLowerCase();
    //some receipts add colon after so need to remove it
    str = str.replace(":", "");
    for (var x = 0;x<options.length;x++){
        if(str == options[x]){
            return true;
        }
    }
    return false;
}
function isFloat(val){
    return (!isNaN(val) && val.toString().indexOf('.') != -1);
}
function hasNumber(myString) {
  return /\d/.test(myString);
}