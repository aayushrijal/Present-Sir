var todaysDate=new Date();
var studentId=" "; //handling left for 68102;
todaysDate=todaysDate.getMonth()+" "+todaysDate.getDate();
var db = openDatabase('studentDatabase','1.0','Attendance Register',3*1024*1024);
db.transaction(function(transaction){
		transaction.executeSql('CREATE TABLE IF NOT EXISTS classIndex(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nameOfClass TEXT NOT NULL,batch INTEGER NOT NULL,section INTEGER NOT NULL)',[],initializeDatabase);
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
										//insertTable();			
										$("#section-Rollno").show();
										for(i=1;i<45;i++){
											$("#a"+i).css("background-color","#FFF");
										}
										looproll=0;
										currentTable="class"+row.id;
										db.transaction(function(transaction){
											transaction.executeSql("SELECT batch,section FROM classIndex WHERE id=?",[row.id],function(transaction,results){
	batch=parseInt(results.rows.item(0).batch);
	section=parseInt(results.rows.item(0).section);
	for(i=1;i<45;i++){
	$("#a"+i).text(section+i-1);
	}
	roll=section;
	$("input[type=range]").attr({min:roll,max:roll+43});
	$("#rollNoDisplay").text(roll);
});
											
		
										
										});
if(( localStorage["#class"+row.id+"md"] == undefined)||(localStorage["#class"+row.id+"md"] !=todaysDate)){
							
db.transaction(function(transaction){
											transaction.executeSql("SELECT section FROM classIndex WHERE id=?",[row.id],function(transaction,results){
										section=parseInt(results.rows.item(0).section);
										localStorage["#class"+row.id+"md"] = todaysDate;
for(i=section;i<(section+44);i++){
	(function(i){
	db.transaction(function(tx){
				tx.executeSql("INSERT INTO class"+row.id+"(studentId,date,attendance) VALUES(?,?,?)",[batch+i,todaysDate,0]);
		});
	})(i);		
};
		});
	});

}else{
	db.transaction(function(transaction){
				transaction.executeSql("SELECT attendance FROM class"+row.id+" WHERE date=?",[todaysDate],function(transaction,results){
					var rows=results.rows;
					for(i=1;i<45;i++){
						if(results.rows.item(i-1).attendance==1){
							$("#a"+i).css("background-color","#4CAF50");
						}else{
							$("#a"+i).css("background-color","#ff4444");
						}
			
					}
		}); 
	});
}
										student=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
										currentTable=this.id;
										$("#classDisplay").html(this.innerHTML);
					});
										//$("#pastRecord").append($(document.createElement("div")).html(row.nameOfClass));						 			
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
			        						//alert(row["productname"]);
						 			}
								});
		});
}
//{
	/* function insertTable()
    {
	var PresentDay=new Array();
	for(k=section;k<(section+44);k++){
	(function(k){	
	db.transaction(function(transaction){
		transaction.executeSql('SELECT COUNT(*) FROM ? WHERE studentId=? AND attendance=?',[currentTable,k,attendance],function(transaction,results){
		presentDay.push(results.row.items(0));		
			});
		});
	})(k);
	};
       var theader = "<table id='table2'><thead></thead>";
        var tbody = "";

        for(var i = 0; i < 44; i++)
        {
            tbody += "<tr>";
            for(var j = 0; j < 2; j++)
            {
                tbody += "<td>";
                if(j==0){
		tbody += studentId[i];
		}else{
		tbody += presentDay[i];
		}
                tbody += "</td>"
            }
            tbody += "</tr><br />";
        }
        var tfooter = "</table>";
	console.log();
        //document.getElementById('wrapper').innerHTML = theader + tbody + tfooter;
    }*/

