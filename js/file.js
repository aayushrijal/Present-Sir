 var shortName = 'productdatabase';
              var version = '1.0';
              var displayName = 'Product Database';
              var maxSize = 65536; // in bytes
              db = openDatabase(shortName, version, displayName, maxSize);

//void transaction(sqlTransactionCallback, transactionErrorCallback, transactionSuccessCallback);

//void readTransaction(sqlTransactionCallback, transactionErrorCallback, transactionSuccessCallback);
//IF NOT EXISTS
db.transaction(
         function (transaction) {
            transaction.executeSql('CREATE TABLE product(productid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, productname TEXT NOT NULL, price INTEGER, qoh INTEGER);', []);
	alert("database Created");	
         }
      ); 
db.transaction(
         function (transaction) {
  
		transaction.executeSql('INSERT INTO product(productid,productname,price,qoh) VALUES (1, "Arsenal",10,100)');
 		
			});
db.transaction(
function (transaction) {
  	
transaction.executeSql('select * from product',function(transaction, results){
     					 for (var j=0; j<results.rows.length; j++) {
      							  var row = results.rows.item(j);
        						alert(row["productid"]);
     							 }
});
});
	
$(function(){
var csvContent = "data:text/csv;charset=utf-8,";
csvContent+="aces,rab,todd,roben\naces,dfg,eret,dfgdfg";
var encodedUri = encodeURI(csvContent);
var downloadLink = document.createElement("a");  
downloadLink.href = encodedUri;
downloadLink.download = "final.csv";   

document.body.appendChild(downloadLink);
downloadLink.click();                   //for exporting the csv file
document.body.removeChild(downloadLink);
});
