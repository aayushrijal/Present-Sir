var db = openDatabase('studentDatabase','1.0','Attendance Register',3*1024*1024);
db.transaction(function(transaction){
		transaction.executeSql('CREATE TABLE IF NOT EXISTS tableOfClasses(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,cName VARCHAR(20) NOT NULL)');
});
db.transaction(function(transaction){
		transaction.executeSql('INSERT INTO tableOfClasses(id,cName) VALUES (1,"English")');
		transaction.executeSql('INSERT INTO tableOfClasses(id,cName) VALUES (2,"Nepali")');
		transaction.executeSql('select * from tableOfClasses',[],function(transaction, results){
		     					 for (var j=0; j<results.rows.length; j++) {
		      							  	var row = results.rows.item(j);
			        						$("#addGroup").prepend($(document.createElement("div")).html(row[cName]).addClass("addGroup"));
						 			}
								});
		});
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
   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
}

var csvContent = "data:text/csv;charset=utf-8,";
csvContent+="aces,rab,todd,roben\naces,dfg,eret,dfgdfg";
var encodedUri = encodeURI(csvContent);
/*var downloadLink = document.createElement("a");  
downloadLink.href = encodedUri;
downloadLink.download = "final.csv";   

document.body.appendChild(downloadLink);
downloadLink.click();                   //for exporting the csv file
document.body.removeChild(downloadLink);
function downloadFile(){  
       var fileTransfer = new FileTransfer();*/
function fileSystemSuccess(fileSystem) {
    var directoryEntry = fileSystem.root; // to get root path to directory
    directoryEntry.getDirectory("<folder_name>", {create: true, exclusive: false}, onDirectorySuccess, onDirectoryFail);
    var rootdir = fileSystem.root;
    var fp = rootdir.fullPath;
    fp = fp+"/aces.csv";
	fileTransfer.download(
    		encodedUri,
    		fp,
    		function(entry) {
        		console.log("download complete: " + entry.fullPath);
    		},
    		function(error) {
        		alert("Download Failed");
    		}
);
}
  // downloadFile();  











//});
