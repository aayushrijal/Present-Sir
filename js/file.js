var db = openDatabase('studentDatabase','1.0','Attendance Register',3*1024*1024);
db.transaction(function(transaction){
		transaction.executeSql('CREATE TABLE IF NOT EXISTS classIndex(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nameOfClass TEXT NOT NULL)',[],initializeDatabase);
});
//});
function initializeDatabase(){
db.transaction(function(transaction){
		transaction.executeSql('INSERT INTO classIndex(id,nameOfClass) VALUES(1,"BCT")');
		transaction.executeSql('INSERT INTO classIndex(nameOfClass) VALUES("BEX")');
		transaction.executeSql('INSERT INTO classIndex(nameOfClass) VALUES("ARCH")');
		});
};
(function sidebarClassesLoad(){
db.transaction(function(transaction){
transaction.executeSql('select * from classIndex',[],function(transaction, results){
		     					 for (var j=0; j<results.rows.length; j++) {
										var row = results.rows.item(j);
			        						$("#classList").prepend($(document.createElement("div")).html(row.nameOfClass).addClass("addGroup"));
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
function createTable(nameOfTable){
	db.transaction(
         function (transaction) {
           	transaction.executeSql('CREATE TABLE IF NOT EXISTS attendanceRegister(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, studentId INTEGER NOT NULL,date TEXT NOT NULL,attendance INTEGER );', []);
		alert("database Created");	
         });
};
function insertIntoTable(nameOfTable){ 
db.transaction(function (transaction) {
		transaction.executeSql('INSERT INTO '+nameOfTable+'(studentId,class,date,attendance) VALUES (3, "Arsenal",10,100)');
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

function onDeviceReady(){
	window.requestFileSystem(LocalFileSystem.PERSISTENT,0,onFSSuccess,onError);
}
function init(){
	document.addEventListener("deviceready",onDeviceReady,true);
}
function onFSSuccess(fs){
	fileSystem=fs;
	$(".infoText").addEventListener("touchstart",doDirectoryListing);
  	$(".optionIcon").addEventListener("touchstart",doAppendFile); 	
}
function doDirectoryListing(e){
	var dirReader=fileSystem.root.createReader();
	dirReader.readEntries(gotFiles,onError);
}
function doAppendFile(e){
	fileSystem.root.getFile("test.txt",{create:true},appendFile,onError);
	}
function gotFiles(entries){
	var s="";
	for(var i=0,len=entries.length;i<len;i++){
		s+=entries[i].fullPath;
		if(entries[i].isFile){
			s+=" [F]";
		}
		else{
			s+=" [D]";
		}
		s+="<br/>";
	}
	alert(s);
}
function appendFile(f){
	f.createWriter(function(writera){
		writera.onwrite=function(){
			alert("Done writing to file");
			}
		writera.seek(writera.length);
		writera.write("Test at"+new Date().toString() + "\n");
	})
}	
function onError(e){
	alert("an error occurred");
}

/*function addNewClass(){
var temp=$("#collegeInput").val();
temp+=(" "+$("#batchId").val()+" "+$("#facultyId").val()+"'"+$("#sectionId").val()+"' "+$("#yearId").val()+'/'+$("#semesterId").val());
alert(temp);
};*/
  