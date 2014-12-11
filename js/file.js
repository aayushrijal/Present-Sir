var todaysDate=new Date();
var studentId=" "; //handling left for 68102;
todaysDate=todaysDate.getMonth()+" "+todaysDate.getDate();
var db = openDatabase('studentDatabase','1.0','Attendance Register',3*1024*1024);
db.transaction(function(transaction){
		transaction.executeSql('CREATE TABLE IF NOT EXISTS classIndex(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nameOfClass TEXT NOT NULL,batch INTEGER NOT NULL)',[],initializeDatabase);
		});
//});
function initializeDatabase(){
db.transaction(function(transaction){
		});
};
(function sidebarClassesLoad(){
db.transaction(function(transaction){
transaction.executeSql('select * from classIndex',[],function(transaction, results){
		     					 for (var j=0; j<results.rows.length; j++) {
										var row = results.rows.item(j);
			        						$("#classList").prepend($(document.createElement("div")).html(row.nameOfClass).addClass("addGroup").attr("id","class"+row.id));
										$("#class"+row.id).click(function(){
										currentTable="class"+row.id;
										db.transaction(function(transaction){
											transaction.executeSql("SELECT batch FROM classIndex WHERE id=?",[row.id],function(transaction,results){
	batch=parseInt(results.rows.item(0).batch);
});
											
		
										
										});
if(( localStorage["#class"+row.id+"md"] == undefined)||(localStorage["#class"+row.id+"md"] !=todaysDate)){
alert("not MOdified");
localStorage["#class"+row.id+"md"] = todaysDate;
for(i=1;i<45;i++){
	(function(i){
	db.transaction(function(tx){
				tx.executeSql("INSERT INTO class"+row.id+"(studentId,date,attendance) VALUES(?,?,?)",[batch+i,todaysDate,0]);
		});
	})(i);		
};
}else{
alert("already MOdified");
}
										student=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
										currentTable=this.id;
										$("#classDisplay").html(this.innerHTML);
					});
										$("#pastRecord").append($(document.createElement("div")).html(row.nameOfClass));						 			
									}
								});
	});
})();

function todalNoOfDays(){
db.transaction(function(transaction){
		transaction.executeSql('SELECT COUNT(*) FROM ? WHERE studentId=?',[nameOfTable,"68001"],function(transaction,results){
		return results.row.items(0);	
		});
	});
} 
function presentDays(studentId){
db.transaction(function(transaction){
		transaction.executeSql('SELECT COUNT(*) FROM ? WHERE studentId=? AND attendance=?',[nameOfTable,studentId,attendance],function(transaction,results){
		return results.row.items(0);		
			});
		});
	}
function updateTable(nameOfTable){
db.transaction(function(transaction){
		transaction.executeSql('UPDATE '+nameOfTable+' SET attendance=1 WHERE studentId='+studentId+' AND date='+todaysDate);
	});
};

function selectFromTable(nameOfTable,whatToSelect)
{
db.transaction(function (transaction) {
	transaction.executeSql('select * from studentDatabase',[],function(transaction, results){
		     					 for (var j=0; j<results.rows.length; j++) {
		      							  	var row = results.rows.item(j);
			        						alert(row["productname"]);
						 			}
								});
		});
}

