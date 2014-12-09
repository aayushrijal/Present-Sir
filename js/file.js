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
	
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
}
function fileSystemFail(){
	alert("File System API failed");
	}
function dirReady(entry) {
		window.appRootDir = entry;
		console.log(JSON.stringify(window.appRootDir));
	}
function fileSystemSuccess(fileSystem) {
	var csvContent = "data:text/csv;charset=utf-8,";
	csvContent+="aces,rab,todd,roben\naces,dfg,eret,dfgdfg";
	var encodedUri = encodeURI(csvContent);
	var directoryEntry = fileSystem.root; // to get root path to directory
    	fileSystem.root.getDirectory(window.appRootDirName, {create : true,exclusive : false}, dirReady, fileSystemFail);
	/*var rootdir = fileSystem.root;
    		alert(rootdir);	
    	var fp = rootdir.fullPath;
    	fp = fp+"/attendanceRegister.csv";
    		alert(fp);*/
	ft=new FileTransfer();	
	ft.download(
    		encodedUri,
    		window.appRootDir.fullPath+"/ar.csv",
    		function(entry) {
        		alert("download complete: " + entry.fullPath);
    		},
    		function(error) {
        		alert("Download Failed");
    		}
);
}
  
